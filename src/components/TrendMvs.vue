<template>
	<main class="text-white px-2 flex flex-col align-center flex-wrap  mt-12">
		<h1 class="text-2xl font-bold ">Trending Movies</h1>
		<div class="flex flex-row flex-wrap"  >
			<Card v-for="  mv in trendMv" :key="mv.id"
			:id="'mv'+ mv.id"
			:img="'https://image.tmdb.org/t/p/w500/' + mv.poster_path"
			:title="mv.title"
			:year="mv.release_date"
			></Card>
		</div>
	</main>
</template>


<script>
import Card from "@/components/Card.vue";

export default{
	name: 'TrendMvs',
	components:{
		Card
	},
	data(){
		return {

		}
	},
	mounted(){
		return this.$store.dispatch('loadTrendMv')
	},
	computed:{
		trendMv(){
			return this.$store.state.trendMv
		}
	}
};
</script>


<style scoped>

</style>
		