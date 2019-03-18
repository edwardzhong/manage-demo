export default {
	state: {
		dialog: {
			show: false,
			obj: {}
		}
	},
	mutations: {
		openDialog(state, obj) {
			state.dialog.show = true;
			state.dialog.obj = Object.assign({}, obj);
		},
		closeDialog(state) {
			state.dialog.show = false;
		}
	},
	getters: {
		dialog: state => state.dialog,
	}
};