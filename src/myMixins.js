import { bus } from './main'
export const myMixins = {
	data(){
		return {
			query:'',
			results: ''
		}
	},
		methods:{
			getResult(query){
				fetch('https://api.themoviedb.org/3/search/multi?api_key=6d2a752d654f74f846c06dc403b1dee6&language=en-US&query='+ query)
				.then( res => res.json())
				.then( data => {
					this.results = data.results
					bus.$emit('GET_RESULT', data.results)
			//console.log(data.results)
			})
				.catch(er => {
					console.log(er)
		})
	}
		}
}