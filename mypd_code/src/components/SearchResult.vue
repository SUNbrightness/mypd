<template>
	<div class="all-surround">
		<van-row>
			<van-col span="8">
				文件夹
			</van-col>
			<van-col span="8">
				标题
			</van-col>
			<van-col span="8">
				账号
			</van-col>
		</van-row>

		<van-row  v-for="(item,index) in searchResult" :key="'searchList'+index" :style="cellStyle(index)" @click="toUserForm(index,item)">
			<van-col span="8">
				{{ item.folder }}
			</van-col>
			<van-col span="8">
				{{ item.title }}
			</van-col>
			<van-col span="8">
				{{ item.username }}
			</van-col>
		</van-row>
	</div>
</template>

<script>
	import MyMixin from '@/components/MyMixin.vue';
	export default {
		name: 'SearchResult',
		components: {},
		mixins: [MyMixin],
		props: {
			searchValue: {
				type: String
			}
		},
		data() {
			return {
				thisIndex: 0
			}
		},
		computed: {
			searchResult: function() {
				let result = [];
				//这个result中的对象会包含 文件夹名、文件夹对应列表坐标、用户对应列表坐标、表单信息
				if (!this.searchValue) return result;
				for (let findex in this.wlist) {
					var folder = this.wlist[findex];
					for (let uindex in folder.list) {
						let isContant = false;
						var user = folder.list[uindex];
						if (user.username && user.username.indexOf(this.searchValue) != -1) {
							isContant = true;
						}
						if (user.title && user.title.indexOf(this.searchValue) != -1) {
							isContant = true;
						}
						if (isContant) {
							//注意这个clone他非常重要
							result.push(Object.assign(this.Mclone(user), {
								folder: folder.folder,
								findex: findex,
								uindex: uindex
							}));
						}
					}
				}

				return result;
			},
			cellStyle: function() {
				this.cellShow;
				return function(index) {
					return index == this.thisIndex ? {
						"background-color": "lightgray"
					} : {};
				};
			},
		},
		watch: {},

		created() {},

		mounted() {},

		destroyed() {},

		methods: {
			toUserForm(index, item) {
				this.thisIndex = index;
				//更新当前vux中的数据，触发userForm回显
				this.setThisFolder(item.findex);
				this.setThisForm(item.uindex)
				
				//抛出事件让phone组件选择下一步操作
				this.EventBus.$emit('toUserForm');
			}
		},

	};
</script>

<style>
	.all-surround {
		padding-left: 10px;
		padding-right: 10px;
	}

	.all-surround .van-row {
		border: 1px solid lightgray;
		line-height: 40px;
		text-align: center;
	}
</style>
