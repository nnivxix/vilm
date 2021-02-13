<template>
  <div class="home">
  	<Hero 
  	:background="'https://image.tmdb.org/t/p/w500'+hero.backdrop_path"
  	:title="hero.title"
  	:overview="hero.overview"
  	:year="hero.release_date.substr(0,4)"
  	:rate="hero.vote_average" />
  </div>
</template>

<script>
// @ is an alias to /src
	import Hero from "@/components/Hero.vue"


export default {
  name: 'Home',
  components:{
  	Hero
  },
  mounted(){
  	return this.$store.dispatch('loadHero')
  },
  computed:{
  	hero(){
  		return this.$store.state.hero
  	},
  	year(){
  		this.hero.release_date.substr(0,4)
  	}
  }

}
</script>
