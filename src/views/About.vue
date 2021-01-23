<template>
	<div class="about">
		<div class="flex justify-center pt-6 xs:pt-16">
			<input type="text" v-model="query" @keyup="getResult(query)" class="border-4 border-gray-100 rounded-sm py-2 px-5 mt-5 self-center items-center sm:mx-auto  xs:max-w-xs sm:hidden lg:hidden md:hidden xl:hidden 2xl:hidden" placeholder="search movie and tv series">
		</div>
		<div class="flex flex-wrap md:w-4/5 p-8  ">
		<div  v-for="result in results" :key="result.id" class="flex flex-col mt-8 border-b-4 border-t-4 xs:w-full w-2/6 ">
			<div v-if="result.poster_path == null || undefined ">
				<img  :src="'https://image.tmdb.org/t/p/w500'+ '/nil.jpg'" :alt="result.original_title || result.name " class="sm:w-12 p-5 ">
				<p class="px-5 xs:text-6xl text-2xl whitespace-normal ">{{result.title || result.name}}</p>
			</div>
			<div v-else>
				<img  :src="'https://image.tmdb.org/t/p/w500'+ result.poster_path" :alt="result.original_title || result.name " class="sm:w-12 p-5 ">
				<p class="px-5 xs:text-6xl text-2xl whitespace-normal">{{result.title || result.name}}</p>
			</div>	
		</div>
		</div>
</div>
</template>
<script>
	import { bus } from '../main';
	import {myMixins} from '../myMixins'
	export default {
		name:'Result',
		mixins: [myMixins],
		data(){
			return{
				results :''
			}
		},
		created(){
			bus.$on('GET_RESULT', data =>{
				this.results = data
			})
		}
	}
</script>
