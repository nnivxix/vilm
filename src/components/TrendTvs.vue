<template>
	<main class="text-white px-2 flex flex-col align-center flex-wrap w-screen mt-12">
		<h1 class="text-2xl font-bold ">Trending TVs</h1>
		<div class="flex flex-row flex-wrap"  >
			<Card v-for="  tv in trendTv" :key="tv.id"
			:id="'tv/'+ tv.id"
			:img="'https://image.tmdb.org/t/p/w500/' + tv.poster_path "
			:title="tv.original_name"
			:year="tv.first_air_date"
			></Card>
		</div>
	</main>
</template>


<script>
import Card from "@/components/Card.vue";

export default{
	name: 'TrendTvs',
	components:{
		Card
	},
	data(){
		return {

		}
	},
	mounted(){
		return this.$store.dispatch('loadTrendTv')
	},
	computed:{
		trendTv(){
			return this.$store.state.trendTv
		}
	}
};
</script>


<style scoped>

</style>
		