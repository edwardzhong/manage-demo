<template>
	<div class="dialog-wrap" v-bind:class="{ 'active': tip.show }">
		<div class="info-dialog">
			<div class="dialog-text">
			<i class="close" @click="close"></i>
			<p>{{tip.text}}</p>
			</div>
			<div class="dialog-footer">
				<a href="javascript:;" class="confirm" @click="confirm">确定</a>
				<a href="javascript:;" class="cancel" @click="close">取消</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		computed:{
			tip:function(){
				return this.$store.getters.tip;
			}
		},
		methods: {
			close() {
				this.$store.commit('closeTip');
			},
			confirm() {
				this.tip.callback(this.close);
			}
		}
	}
</script>