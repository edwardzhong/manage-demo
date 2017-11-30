export default {
	state: {
		tip:{
			show:false,
			text:'',
			callback:function(){}
		}
	},
	mutations: {
		openTip(state,param){
			state.tip.show=true;
			state.tip.text=param.text;
			state.tip.callback=param.callback;
		},
		closeTip(state){
			state.tip.show=false;
		}
	},
	getters: {
		tip:state => state.tip
	}
}