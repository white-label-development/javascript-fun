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

Note: used `npm run lint -- --fix` to correct trailing spaces. neat!

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

```vue
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

```
<PartSelector :parts="availableParts.heads" position="top"
  @partSelected="part => selectedRobot.head=part" />
```
The event handler here is simple enough to be done inline. Larger would require calling a method.

At this point, changing a robot part and clicking Add To Cart works, but if there is no changed part the value has not been set. A Component Lifecycle Hook is a good option here ... see `created()` hook.

In the demo the preview is added to prove that the data (selectd part) is passed to the parent.

