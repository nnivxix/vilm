<template>
	<nav class="bg-yellow-500 p-5 sm:p-3 flex justify-between font-sans fixed w-full">
		<router-link to="/">
			<h1 class="font-bold text-5xl xs:text-2xl  text-gray-700">Vilm </h1>
		</router-link>	
		<div>
			<router-link to="/about">
				<input type="text" v-model="query" @keyup="getResult(query)" class="rounded-full py-2 px-5 mx-2 w-max xs:hidden sm:hidden" placeholder="search movie and tv series">
			</router-link>				
			<router-link to="/about">
				<input type="button" class="bg-white  rounded-full py-2 px-6 mx-2 xs:hidden sm:hidden" value="search" @click="getResult(query)">
			</router-link>
			<router-link to="/about">
			<svg class="w-7 text-gray-700 sm:hidden lg:hidden md:hidden xl:hidden 2xl:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
				<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clip-rule="evenodd" />
			</svg>
			</router-link>
		</div>
	</nav>
</template>
<script>

import {myMixins} from '../myMixins'
	export default{
		name:'navbar',
		mixins: [myMixins]
		
	}
</script>


<style scoped>

</style>
		