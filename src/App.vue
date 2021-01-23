<template>
  <div id="app" class="font-sans">
    <div id="nav">
      <navbar />
    </div>
    <router-view/>
  </div>
</template>
<script>
  import navbar from './components/NavBar.vue'
  export default{
    components:{
      navbar
    }
  }
</script>

<style>
</style>
