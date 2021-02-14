<template>
	<footer class="flex flex-col justify-center text-white px-3">
		<h1 class="text-1xl md:text-2xl"><span>Vilm</span> &#169; {{getYear}} </h1>
		<p class="text-sm md:text-1xl">power by <a class="underline" href="https://www.themoviedb.org/" target="_blank">Tmdb</a></p>
	</footer>
</template>


<script>
	export default{
		name: 'Footer',
		computed:{
			getYear(){
				return new Date().getFullYear();
			}
		}
	};
</script>


<style scoped>
	footer{
		min-height: 25vh;
	}
</style>
		