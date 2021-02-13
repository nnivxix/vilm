<template>
	<main class="h-auto flex flex-col justify-center pl-5 text-white"
	:style="{ backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.4)), url(' + background + ')' }">
		<p class="text-5xl font-bold ">{{title}}</p>
		<p class="hidden md:block text-3xl w-1/2 py-4 font-normal">{{overview}}</p>
		<div class="flex flex-row">
			<p class="text-2xl mr-4">{{ year }}</p>
			<p class="flex text-2xl ml-4">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg> {{rate}}</p>
		</div>
		
	</main>
</template>


<script>
	export default{
		name:"Hero",
		props:{
			title: String,
			background: String,
			year:String,
			rate: Number,
			overview:String},
		data(){
			return{
				backgroundColor: 'rgba(0,0,0,.8)'
			}
		},
		computed:{
			thisyear(){
				return this.year.substr(0,4)
			}
		}
	};
</script>


<style scoped>
	main{
/*		background: linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.8)) ;*/
		/*background-color:  linear-gradient(black 80%, black 70%) !important;*/
	/*	background-color: rgba(0,0,0,.8);*/
		background-repeat:no-repeat !important; 
		background-size:cover !important;
		min-height: 90vh !important;
		background-position: center;
	}
	main svg{
		width: 30px;
		height: auto;
		margin: 0 5px 0 10px;
	}
	main p{
		margin: 5px 0;
	}
</style>
		