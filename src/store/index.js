import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	api_key : '6d2a752d654f74f846c06dc403b1dee6',
  	hero:'',
  },
  mutations: {
  	getHero(state, hero){
  		state.hero = hero
  	}
  },
  actions: {
  	loadHero({commit}){
  		fetch('https://api.themoviedb.org/3/trending/all/day?api_key=6d2a752d654f74f846c06dc403b1dee6')
  		.then(res => {
  			return res.json()
  		})
  		.then( resData => {
  			let dataHero = resData.results;
  			let hero = dataHero[0];
  			console.log(hero)
  			commit('getHero', hero)
  		})
  	}
  },
  modules: {
  }
})
