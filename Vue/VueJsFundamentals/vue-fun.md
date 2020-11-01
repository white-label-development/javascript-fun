# Vue Fundamentals

[Helper repo](https://github.com/jmcooper/vuejs-fundamentals)

## 2 Getting Started

`new Vue()` = a new Vue instance.

`new Vue({render: h => h(App)})` // Vue wraps a router-view containing components

(installed nvm from github to manage node versions)

`nvm install 12.16.3` ok. `nvm use 12.16.3`

### Vue CLI

`npm install -g @vue/cli`

`vue create name-of-project`

VS Code extensions: ESlint, vue, Vetur, Beautify, jshint

Note: used `npm run lint --fix` to correct trailing spaces. neat!

`npm run serve` ... http://localhost:8080/

## 3  Components and using Templates Syntax

Components are Vue instances. Global Components vs Single-file components sfc.vue

`<img v-bind:src="parts.heads[index].src"/>` shortens to `<img :src="parts.heads[index].src"/>`

`<button v-onclick="selectNextHead()">...` shortens to `<button @click="selectNextHead()">`

`v-once` perf helper. set once and never changes

`v-if` removes from the DOM

`v-show` uses `display:none`

### neil notes

ex files need sass-loader `npm install sass-loader sass webpack --save-dev`

So begins with /public/index.html which is the top level html that contains the top level component `<div id="app"></div>`. This what the render function in main.js is binding to. I guess this leads us by convention to App.vue and it's html template. Has an import of the next level component (`import RobotBuilder from './build/RobotBuilder.vue';`) and it's template counterpart `<RobotBuilder/>`.

RobotBuilder.vue demonstrates some of the template syntax such as `v-if`, and

```javascript
<tr v-for="(robot, index) in cart" :key="index">
    <td>{{robot.head.title}}</td>
    <td class="cost">{{robot.cost}}</td>
</tr>
```

Angular style bindings / interpolation `{{selectedRobot.head.title}}`

and `<div :class="[saleBorderClass, 'top', 'part']">` which is an array of classes to add

saleBorderClass is a computed property, the other two are simple css classes that are always applied. Note: as hypens are not valid in JS object notation, instead use camelCase eg: borderBackground.

Functions directly in `<script>`

```javascript
function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}
```

and main exported object in `<script>` exposing properties and methods (and properties that contain methods, such as computed)

```javascript
export default {
  name: 'RobotBuilder',
  data() { return foo, bar, blah[] },
  mixins: [createdHookMixin],
  computed: { methodA(){}, ... },
  methods: { methodX(){}, ... },
```

Also, note use of `scoped` in styles. A parent can only set child element styling by explicitly adding the "deep element" syntax (which goes all the way down the chain)
`.content .robot-name {}` will not work but `.content >>> .robot-name {}` is ok. Alternative syntax is `/deep/`

### Component Lifecycle hooks

```javascript
export default {
  name: 'RobotBuilder',
  created(){ console.log('component created event fired');}
```

See Vue docs lifecycle diagram.

Mixins are a way to share functionality across multiple components. See file created-hook-mixin.js and it's import in RobotBuilder.vue (and in theory in other components). Works for computed properties and other stuff (not just a lifecyle hook thing)

## 4 Enabling Inter-component Communications

Create `PartsSelector.vue` as a components for rendering the robot parts, thereby removing a lot of very similar duplicated code.

### Passing data into a child component

`<PartSelector :parts="availableParts.heads" position="top" />` then in PartsSelector define the props using a string array `props: ['parts','position'],`. This allows `this.parts` to work. Note that position does not have a colon prefix. This is because position is not a binding, it's just an attribute of the PartSelector with a hardcoded value (as opposed to an expression that needs to be evaluated, like availableParts.x)

A better props definition includes validation. `props: ['parts', 'position'],` becomes

```javascript
props: {
    parts: { type: Array, required: true },
    position: {
      type: String,
      required: true,
      validator(value) {
        return ['left', 'right', 'top', 'bottom', 'center'].includes(value);
      },
    },
  },
```

### Passing data up into a parent component

Each view component has an emit function. `this.$emit('partSelected');`. The parent component binds to this.

```javascript
<PartSelector :parts="availableParts.heads" position="top"
  @partSelected="part => selectedRobot.head=part" />
```

The event handler here is simple enough to be done inline. Larger would require calling a method.

At this point, changing a robot part and clicking Add To Cart works, but if there is no changed part the value has not been set. A Component Lifecycle Hook is a good option here ...

```javascript
 created() {
    this.emitSelectedPart();
  },
```

but even better would be to use update, which is raised each time the data changes.
We still need created for the intial render though.

```javascript
updated() {
    this.emitSelectedPart();
  },
```

In the demo the preview is added to prove that the data (selectd part) is passed to the parent.

### injecting content into a component

Re-usable CollapsibleSection component. Note use of `<slot></slot>` which has the html of the parent component injected into it from the template.

## 5 Routing from Page to Page

`npm install vue-router --save`

add router/index.js which imports Router. We can then configure the routes.

import router from /.router and inject into new Vue()

in App.vue add `<router-view />` which is the Vue component that is the container for rendered route

use route name: `<router-link class="nav-link" :to="{ name: 'Home' }"> ...`

use path: `<router-link to="/build">`

can create styles that are applied to routes

```vue
<router-link class="nav-link" :to="{ name: 'Build' }" exact>Build</router-link>
...
.router-link-active {
  /* this is a special vue class (convention) */
  color: #fff;
}
```

or for custom names use `<router-link active-class="foo" ...`

From code:

Added `parts/PartInfo.vue` for this example. In PartSelector make a click event that routes

`<img @click="showPartInfo()" ...` where `methods:` contains

```javascript
showPartInfo() {
  this.$router.push('/parts');
},
```

This achieves a (useless) hardcoded version, but we want params in the route so we can display info on the part that was clicked:

update the url route: `{ path: '/parts/:partType/:id', name: 'Parts', component: PartInfo },` eg: /parts/heads/4

```javascript
showPartInfo() {
  const { id, type } = this.selectedPart;
  this.$router.push({ name: 'Parts', params: { id, partType: type } });
},
```

and PartsInfo.vue can pull routes params and use them to query parts (from /data/parts.js)

```javascript
const { partType, id } = this.$route.params;
return parts[partType].find((part) => part.id === +id);
```

An alt syntax to @click would be to wrap the img in a router-link.

Also, in PartInfo.vue

```javascript
const { partType, id } = this.$route.params;
// a downside of this is this component is now coupled to the router. Better to pass the partType and id as props.
```

so..`{ path: '/parts/:partType/:id', name: 'Parts', component: PartInfo, props: true, },`

and the old destructuring from the router, instead uses this

```javascript
props: ['partType', 'id'], // declare the props
...
const { partType, id } = this // can now get the props from this
```

### Nested Routes (parent/child)

In demo going to add /browse page which has /browse/Arms etc. The bottom half of the  page will change according to the sub-route of browse. uses another `<router-view />` and defines child routes in /route

```javascript{
  path: '/parts/browse',
  name: 'BrowseParts',
  component: BrowseParts,
  children: [
    { path: 'BrowseArms', name: 'arms', component: RobotArms },
    { path: 'BrowseBases', name: 'bases', component: RobotBases },
    { path: 'BrowseHeads', name: 'heads', component: RobotHeads },
    { path: 'BrowseTorsos', name: 'torsos', component: RobotTorsos },
  ],
},
```

add /parts/BrowseParts.vue and the sub-pages RobotArms.vue etc... see code

### Name Views (aka Sibling routes)

In demo going to add a sidebar. App.vue gets updated to have 2 router-views, and we use the router to define which does what:

```javascript
{
  path: '/',
  name: 'Home',
  components: {
    default: HomePage,
    sidebar: SidebarStandard,
  },
},
{
  path: '/build',
  name: 'Build',
  components: {
    default: RobotBuilder,
    sidebar: SidebarBuild,
  },
},
```

### HTML5 History Mode (removes url # signs stuff)

Just add `mode: 'history'` to Router config (above `routes:[]`).

Problem: bookmaked pages / pasted urls now don't work.

Solution: tell server to always load the main index.html whenever a url like /parts/heads/1 is requested. See Vue HTML5 History mode docs for details.

### Navigation Guards (prevent page from loading or user from leaving)

Stop /parts/heads/IAmInvalidAsNotAnId

Can add the guard to a component or a route.

```javascript
{
  path: '/parts/:partType/:id',
  name: 'Parts',
  component: PartInfo,
  props: true,
  beforeEnter(to, from, next) {
    const isValid = Number.isInteger(Number(to.params.id));
    next(isValid); // will prevent navigation if not valid
  },
},
```

Lets stop the user abandoning a half build robot with beforeRouteLeave on the component.
See RobotBuilder.vue `beforeRouteLeave`

## 6 Vuex

State management store - shared state tree

changes to data are done through mutations. sync.

actions are async which commit to the store on completion.

getters to get from the store, manipulate and return.

`npm install vuex@3.0.1 --save` in demo. add `/store` folder index.js

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // vue know we are using vuex

// create a store. changes to data must happen through mutations. never change the store directly.
export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addRobotToCart(state, robot) {
      state.cart.push(robot);
    },
  },
});
```

and update main.js vue instance with the

```javascript
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
```

The `Vuex.Store` gets populated from RobotBuilder AddToCart `this.$store.commit('addRobotToCart', Object.assign(...robot, { cost }));`

We can see the contents of the store in the (new) `cart/ShoppingCart.vue` computed cart:

```javascript
tr v-for="(robot, index) in cart" :key="index"
...

 cart() {
   return this.$store.state.cart; // get cart data from store and assign to cart
 }
```

..abandonded code along here. just refer to Demos\m05-ManagingStateWithVuex\2 - after

Vuex store actions ... use of axios to fetch data from api and pop store.

```javascript
actions: {
    getParts({ commit }) {
      axios.get('/api/parts')
        .then(result => commit('updateParts', result.data))
        .catch(console.error);
    },
    addRobotToCart({ commit, state }, robot) {
      const cart = [...state.cart, robot];
      return axios.post('/api/cart', cart)
        .then(() => commit('addRobotToCart', robot));
    },
  }
```

`vue.config.js` use of vue proxy to get around CORS issue of accessing api on :8081 when app is on :8080

with an async call need a v-if on the template to give data chance to load.

note use of modules to break up the store

```js
modules: {
    robots: robotsModule,
    users: usersModule,
  },

  ...
  return this.$store.state.robots.cart; // getter needs updating with the module name 'robots'
```

@6.9