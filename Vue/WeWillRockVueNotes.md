# We Will Rock Vue (Vue Findamentals), John Papa

@john_papa

[https://app.pluralsight.com/course-player?clipId=9c51f64c-1634-4727-880b-8b46eb8126bf]

## Resources

+ [https://aka.ms/psv-code](VS Code)
+ [https://jpapa.me/vuedevtools](Vue dev Tools)
+ [https://aka.ms/psv-vueext](Vue Extension)
+ [https://jpapa.me/heroes-vue](heroes demo - this)
+ [https://jpapa.me/vuegs](vue getting started course)

## Intro

Add a script src (to get view), a script tag (new View). Set a data value. <-- single html page, eg:

 ```js
<div id="app">
  <input type="text" v-model="hero.firstName" />
  <p>Hello {{ name }}</p>
</div>

<script>
  new Vue({
    el: '#app',
    data() {
      return { name: 'John'}; //the data function returns an object
    },
    methods: {
      myMethod() { /* do something */ }
    },
  });
</script>
 ```

## Vue CLI

Better to use the Vue CLI as it sets up a best-practise project structure.

Use LTS node. Needs installing.

`vue create hello-world`

`cd hello-world`

`npm run serve`

Also of immediate use: `vue --help`, `npm run lint`, `npm run build`, `npm run serve`

## First steps

interpolation: `{{ hero.firstname }}`

2-way-Bind: `v-model="hero.firstname"`

Bind: `<a v-bind:href="" ..` shortcut `<a :href="" ...`

Event: `<button v-on:eventName="method-name" ..` shortcut `<button @click="myMethod" ...`

Key modifiers: `@keyup.esc="clearHeroPower" : class="{ invalid: !hero.Power }"` where invalid is class name

```html
<li v-for="hero in heroes"
  :key="hero.id" @click="selectedHero=hero" :class="{ hightlight: selectedHero === hero }">
  {{ hero.name }}
</li>
```

`v-if="selectedHero"` modifies DOM. `v-show="selectedHero"` = display:none

## The data function

vue reacts to data changes. Must be defined at the start.

Computed Properties fire when any dependency changes. Cached based on its reactive dependencies. only re-evaluates when any of it's reactive dependencies have changed.

```js
computed: {
  fulName() {
    return `${this.hero.firstName} ${this.hero.lastName}`; //when either changes, fullName is updated.
  }
}
```

## Life Cycle Hooks

created (invoked when the component is created). Used to fetch data. Templated and virtual DOM are not yet mounyed nor rendered.

```js
created() {
  this.getHeroes().then(heroes => { this.heroes = heroes; });
},
```

## Components

Trees of small components. Components in Components.

eg: heroes.vue has child `components: { ListHeader, HeroList, HeroDetail }` and we want to pass a hero into the child

```html
<HeroDetail v-if="selectedHero" :hero="selectedHero" @save="saveHero" /> <!-- heroes.vue> -->

<!-- hero-detail.vue defined a property which can be set -->
export default {
  props: {
    hero: {type: Object, default: () => {}},
  },
},
```

To pass back up to parent we emit an event (just like click - but that's done for us)

```js
methods: {
  saveHero() {
    this.$emit("save", this.theHero);
  }
}
```

## Axios github.com/axios/axios

`npm install axios`

```js
import * as axios from 'axios'

async created() {
  const response = await axios.get('api/heroes'); // returns a promise.
  this.heroes = response.data;
},
```

## Routing

Eager (delivered up-front) and Lazy loading (on request)

Navigation API, Route parameters, HTML 5 history mode

`vue add router` adds import router for us in main.js

In router.js set mode: history and routes

```js
{ path: '/', redirect '/heroes'}, // default
{ path: '/heroes', name: 'heroes', component: Heroes }, // this is eager loading
{ path: '*', component: NotFound }

...
<router-link to="/heroes">Go Heroes</router-link>

...
<router-view> <!-- container for the rendered route view -->
```

lazy loading uses the import syntax to dynamic load. Webpack will name it villains.bundles.js (if you don't put this in it gets a random name)

```js
{path: '/villains', name='villains', component: () => import(/* webpackChunkName: "villains" */ './views/villains.vue')}
```

## Vuex

not covered.