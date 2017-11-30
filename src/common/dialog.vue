<template>
	<div>
		<div class="dialog" v-bind:class="{ 'active': dialog.show }">
			<div class="dialog-content">
				<header class="dialog-header">
					<i class="close" @click="close"></i>
					<h1 class="dialog-title">update item</h1>
				</header>
				<div class="dialog-body form form-aligned">
				<template v-for="(val,key) in dialog.obj">
					<template v-if="key!=='id'">
						<div class="control-group">
							<input class="input-1" type="text" :value="val" v-model="dialog.obj[key]" :placeholder="key" />
						</div>
					</template>
				</template>
				</div>
				<footer class="dialog-footer">
					<button class="button button-primary" v-on:click="save">Save</button>
					<button class="button" v-on:click="close">Close</button>
				</footer>
			</div>
		</div>
		<div class="dialog-overlay"></div>
	</div>
</template>
<script>
	export default{
		computed:{
			dialog:function(){
				return this.$store.getters.dialog;
			}
		},
		methods: {
			close() {
				this.$store.commit('closeDialog');
			},
			save() {
				console.log(this.dialog.obj);
				this.$store.commit('update',this.dialog.obj);
				//todo:ajax submit
				this.close();
			}
		}
	}
</script>