<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }" exact>
              <img class="logo" src="./assets/build-a-bot-logo.png"/>
              Build-a-Bot
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Build' }" exact>Build</router-link>
          </li>
        </ul>
      </nav>
    </header>

    <div class="container">
      <aside class="aside">
        <router-view name="sidebar" />
      </aside>
      <main>
        <!-- <RobotBuilder /> -->
        <router-view /> <!-- with no name specified gets name of 'default' -->
      </main>
    </div>

  </div>
</template>

<script>
// import HomePage from './home/HomePage.vue';
// import RobotBuilder from './build/RobotBuilder.vue';

export default {
  name: 'app',
  // components: {
  //   RobotBuilder,
  // },
};
</script>

<style>
 body {
   background: linear-gradient(to bottom, #555, #999);
   background-attachment: fixed;
 }
</style>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  /* margin: 0 auto; */
  padding: 30px;
  background-color: white;
  /* width: 1024px; */
  width: 964px;
  min-height: 300px;
}
header {
  background-color: #999;
  /* width: 1084px; */
  width: 1184px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.nav-link {
  text-decoration: none;
  color: inherit;
}
.router-link-active {
  /* this is a special vue class (convention) */
  color: #fff;
}
.container {
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}
.aside {
  padding: 30px;
  background-color: #aaa;
  width: 100px;
  min-height: 300px;
}
</style>
