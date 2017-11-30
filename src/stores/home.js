export default {
  state:{
  	list:[]
  },
  actions:{

  },
  mutations:{
  	init(state,list){
  		state.list=list;
  	},
  	add(state,item) {
  		state.list.unshift(item);
  	},
  	remove(state,id){
  		for(var i=0;i<state.list.length;i++){
  			if(state.list[i].id==id){
  				state.list.splice(i--,1);
  			}
  		}
  	},
  	update(state,item) {
  		let index=state.list.findIndex(i=>i.id==item.id);
  		if(index>-1){
  			state.list[index]=Object.assign(state.list[index],item);
  		}
  	}
  },
  getters: {
    list: state => state.list
  }
};