import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	api_key : '6d2a752d654f74f846c06dc403b1dee6',
  	hero:'',
    trendMv: '',
    trendTv:'',
  },
  mutations: {
  	getHero(state, hero){
  		state.hero = hero
  	},
    getTrendMv(state, trendMv){
      state.trendMv = trendMv
    },
    getTrendTv(state, trendTv){
      state.trendTv = trendTv
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
  			commit('getHero', hero)
  		})
  	},
    loadTrendMv({commit}){
      fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=6d2a752d654f74f846c06dc403b1dee6')
      .then(res => {
        return res.json()
      })
      .then(mv => {
        let trendMv = mv.results;
        console.log(trendMv)
        commit('getTrendMv', trendMv)
      })
    
  },
  loadTrendTv({commit}){
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=6d2a752d654f74f846c06dc403b1dee6')
    .then(res => {
      return res.json()
    })
    .then(tv => {
      let trendTv = tv.results;
      console.log(trendTv)
      commit('getTrendTv', trendTv)
    })
  }
},
  modules: {
  }
})
