<template>
  <div class="home overflow-hidden">
  	<Hero 
    :id="hero.id"
  	:background="'https://image.tmdb.org/t/p/w500'+hero.backdrop_path"
  	:title="hero.title"
  	:overview="hero.overview"
  	:year="hero.release_date"
  	:rate="hero.vote_average" />
    <TrendMvs />
    <TrendTvs />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
	import Hero from "@/components/Hero.vue"
  import TrendMvs from "../components/TrendMvs.vue"
  import TrendTvs from "../components/TrendTvs.vue"
  import Footer from "@/components/Footer.vue"
export default {
  name: 'Home',
  components:{
  	Hero,
    TrendMvs,
    TrendTvs,
    Footer
  },
  mounted(){
  	return this.$store.dispatch('loadHero')
  },
  computed:{
  	hero(){
  		return this.$store.state.hero
  	},

  }

}
</script>
