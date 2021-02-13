<template>
	<nav class="flex w-full h-16 items-center  justify-between px-3  bg-gray-900 text-white">
		<div class="logo">
			<router-link to="/"><h1 class="text-2xl md:text-4xl font-bold">Vilm</h1></router-link>
		</div>
		<div class="nav flex">
			<router-link to="/search">
				<input type="text" class="rounded-md p-2  ml-8 md:ml-0  focus:outline-none focus:ring-2  focus:ring-gray-700 focus:border-transparent" placeholder="search movie" style="background:#c4c4c430;">
			</router-link>
		</div>

	</nav>
</template>


<script>
	export default {
		name: "Navbar"
	};
</script>


<style scoped>

</style>
		