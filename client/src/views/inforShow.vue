<template>
	<div class="inforshow">
		<el-row type="flex" class="row-bg" justify="center">
			<el-col :span="8">
				<div class="user">
					<img
						:src="user.avatar"
						ref="imgAvatar"
						@error="imgerrorfun"
						alt=""
						class="avatar"
					/>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="userinfo">
					<div class="user-item">
						<i class="fa fa-user"></i>
						<span>{{ user.name }}</span>
					</div>
					<div class="user-item">
						<i class="fa fa-cog"></i>
						<span>
							{{
								user.identity === "manager"
									? "管理员"
									: "普通员工"
							}}
						</span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default {
	name: "inforshow",
	data() {
		return {
			defaultImg: require("../assets/avatar.png"),
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		imgerrorfun() {
			let img = this.$refs.imgAvatar;
			img.src = this.defaultImg;
			img.onerror = null; //控制不要一直跳动;
		},
	},
};
</script>


<style lang="less">
.inforshow {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	.row-bg {
		width: 100%;
		height: 100%;
	}

	.user {
		text-align: center;
		position: relative;
		top: 30%;
	}
	.user img {
		width: 150px;
		border-radius: 50%;
	}
	.user span {
		display: block;
		text-align: center;
		margin-top: 20px;
		font-size: 20px;
		font-weight: bold;
	}
	.userinfo {
		height: 100%;
		background-color: #eee;
	}
	.user-item {
		position: relative;
		top: 30%;
		padding: 26px;
		font-size: 28px;
		color: #333;
	}
}
</style>