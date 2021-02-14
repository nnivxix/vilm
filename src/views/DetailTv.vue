<template>
	<div>
		<iframe class="w-full px-3 " :src="'https://www.youtube.com/embed/'+ video" frameborder="0" allowfullscreen></iframe>
		<div class="flex w-full px-3 flex-col md:flex-row md:mt-7 mt-4 ">
			<img class="w-1/3 md:w-80 rounded-md md:rounded-lg" :src="'https://image.tmdb.org/t/p/w500/'+detail.poster_path" alt="">
			<div class="md:ml-7 ml-0 " >
				<h1 class="text-2xl md:text-5xl font-bold pt-4 pb-2">{{detail.name}}</h1>
				<p class="text-md md:text-2xl">{{detail.overview}}</p>
				  <div  class="flex flex-row flex-wrap my-4">
				  	<div v-for="(genre, index) in detail.genres" :key="index">
					<button class=" p-2 md:p-2 hover:text-gray-800 rounded-md md:rounded-xl border  ml-2 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50">{{genre.name}}</button>
				  </div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>


<script>
import Footer from '@/components/Footer.vue';
	export default{
		name: 'DetailTv',
		components:{
			Footer
		},
		data(){
			return{
				id: this.$route.params.id,
				detail:'',
				video:''
			}
		},
		methods:{
			getVideo(){
				fetch('')
			},
			getDetail(){
				fetch(`https://api.themoviedb.org/3/tv/${this.id}?api_key=6d2a752d654f74f846c06dc403b1dee6&language=en-US&append_to_response=videos`)
				.then(res => res.json())
				.then(tv => {
					this.detail = tv
					this.video = tv.videos.results[0].key
					console.log(this.video)
					console.log(tv)
				})
			}
	},
	mounted(){
		this.getDetail()
	}
	};

</script>


<style scoped>
iframe{
	min-height: 40vh;
}
@media (min-width: 768px){
	iframe{
		min-height: 60vh;
	}
}
</style>
