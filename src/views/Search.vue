<template>
  <div class=" px-2 flex flex-col align-center flex-wrap  mt-12">
  	<h1 class="text-xl font-bold md:text-3xl mb-6">The Result : {{this.query}}</h1>
  	<div class="flex flex-row flex-wrap">
  		<Card v-for="  mv in Mvresults" :key="mv.id"
			:img="'https://image.tmdb.org/t/p/w500/' + mv.poster_path"
			:year="mv.release_date "
			>	
			<router-link :to="{ name: 'Movie Detail', params: { id: mv.id } }"><p class="text-xs md:text-md font-bold text-white">{{mv.title || mv.original_title}}</p></router-link>
		</Card>
		<Card v-for="  tv in Tvresults" :key="tv.id"
			:img="'https://image.tmdb.org/t/p/w500/' + tv.poster_path"
			:year="tv.first_air_date "
			>	
			<router-link :to="{ name: 'Tv Detail', params: { id: tv.id } }"><p class="text-xs md:text-md font-bold text-white">{{tv.name || tv.original_name}}</p></router-link>
		</Card>
  	</div>
  		  	
			<Footer />
  </div>
</template>

<script>
	import Card from '../components/Card.vue'
	import Footer from "@/components/Footer.vue"

	export default {
		name:'Search',
		props:['query'],
		components: {
			Card,
			Footer
		},
		data(){
			return{
				Mvresults:'',
				Tvresults:''
			}
		},
		methods:{
			getMv(query){
				fetch('https://api.themoviedb.org/3/search/movie?api_key=6d2a752d654f74f846c06dc403b1dee6&language=en-US&query='+ query)
				.then( res => res.json())
				.then( data => {
					this.Mvresults = data.results
					console.log(this.results)
				}).catch(er => {
				console.error(er)
			})
			},
			getTv(query){
				fetch('https://api.themoviedb.org/3/search/tv?api_key=6d2a752d654f74f846c06dc403b1dee6&language=en-US&query='+ query)
				.then( res => res.json())
				.then( data => {
					this.Tvresults = data.results
					console.log(this.results)
				}).catch(er => {
				console.error(er)
			})
			}
		},
		async created(){
			await this.getMv(this.query)
			await this.getTv(this.query)
		},
		watch:{
			query(newQuery){
				this.getMv(newQuery)
				this.getTv(newQuery)
			}
		}
	};
</script>
