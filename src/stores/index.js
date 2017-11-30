import Vue from 'vue'
import Vuex from 'vuex'
import dialog from './dialog';
import home from './home';
import tip from './tip';

Vue.use(Vuex);//别漏了这句

export default new Vuex.Store({
  modules: {
    home,
    dialog,
    tip
  }
});