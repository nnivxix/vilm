<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>
<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
  name: 'Home',
  components: {
    Navbar
  }
};

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
#app {
  font-family: 'Inter', sans-serif;
  background-color: #000000;
}

</style>
