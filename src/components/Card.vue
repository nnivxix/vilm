<template>
	<main class=" pb-2 bg-gray-900 m-1 p-2 ">
		<img :src="img" alt="">
		<slot>
			<router-link :to="'detail/'+ id"><p class="text-xs md:text-md font-bold text-white">{{title}}</p></router-link>
		</slot>
		<p class="text-xs md:2xl text-white">{{year}}</p>
	</main>
</template>


<script>
export default{
	name: "Card",
	props:['img','title','year','id']
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
		