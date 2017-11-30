import Vue from 'vue'
import Index from '../components/Index.vue'
import store from '../stores'
import '../less/main.less'

new Vue({
	el: '#main',
	store:store,
	components: { Index }
});
