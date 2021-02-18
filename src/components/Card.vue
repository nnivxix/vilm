<template>
	<main class=" rounded rounded-lg pb-2 bg-gray-900 m-1  overflow-hidden">
		<div v-if="img == null">
			<img src="https://i.ibb.co/Kh4Kxg1/no-image.jpg" :alt="title || name">
		</div>
		<div v-else>
		<img :src="img " :alt="title || name">
		</div>

		<slot>
			<router-link :to="'detail/'+ id"><p class="text-xs md:text-xl font-bold text-white px-3 py-2">{{title}}</p></router-link>
		</slot>
		<p class="text-xs px-3 md:2xl text-white">{{getYear}}</p>
	</main>
</template>


<script>
export default{
	name: "Card",
	props:['img','title','year','id'],
	computed:{
		getYear(){
			return this.year.substr(0,4)
		}
	}
};
</script>


<style scoped>
main{
	width: 30%;
	height: auto;
}
@media (min-width: 768px){
	main{
		width: 15%;
		height: auto;
		}
}
</style>
		