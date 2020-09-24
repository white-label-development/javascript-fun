<template>
  <div>
    <h1>Browse Parts</h1>
    <ul class="menu">
      <li><router-link :to="{ name: 'heads'}">Heads</router-link></li>
      <li>Arms</li>
      <li>Torsos</li>
      <li>Bases</li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'BrowseParts',
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
  .menu {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
    font-size: 20px;
  }
  ul {
    list-style-type: none;
  }
  a {
    color: palevioletred;
  }
</style>
