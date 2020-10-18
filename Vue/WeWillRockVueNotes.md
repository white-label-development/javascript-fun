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

 ```javascript
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

`cd hellow-world`

`npm run serve`

Also of immediate use: `vue --help`, `npm run lint`, `npm run build`, `npm run serve`

## First steps

Bind: `<a v-bind="" ..` shortcut `<a :bind="" ...`

Event: `<button v-on:eventName="method-name" ..` shortcut `<button @click="myMethod" ...`
