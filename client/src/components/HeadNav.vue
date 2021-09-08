<template>
	<header class="head-nav">
		<el-row>
			<el-col :span="6" class="logo-container">
				<img src="../assets/logo.png" class="logo" alt="" />
				<span class="title">资金在线后台管理系统</span>
			</el-col>
			<el-col :span="6" class="user">
				<div class="userinfor">
					<img src="../assets/avatar.png" class="avatar" alt="" />
					<div class="welcome">
						<p class="name comename">欢迎</p>
						<p class="name avatarname">白云苍狗</p>
					</div>
					<span class="usernam">
						<!-- 下拉箭头 -->
					</span>
				</div>
			</el-col>
		</el-row>
	</header>
</template>
<script>
export default {
	name: "head-nav",
};
</script>


<style lang="less">
.head-nav {
	width: 100%;
	height: 60px;
	min-width: 600px;
	padding: 5px;
	background: #324057;
	color: #fff;
	border-bottom: 1px solid #1f2d3d;
	.logo-container {
		line-height: 60px;
		min-width: 400px;
		.logo {
			height: 50px;
			width: 50px;
			margin-right: 5px;
			vertical-align: middle;
			display: inline-block;
		}
		.title {
			vertical-align: middle;
			font-size: 24px;
			// font-weight: bold;
		}
	}
	.user {
		line-height: 60px;
		position: absolute;
		right: 16px;
		.userinfor {
			text-align: right;
		}
		.avatar {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			vertical-align: middle;
			display: inline-block;
		}
		.welcome {
			display: inline-block;
			width: auto;
			vertical-align: middle;
			padding: 0 5px;
		}
		.name {
			line-height: 20px;
			text-align: center;
			font-size: 14px;
		}
		.comename {
			font-size: 12px;
		}
		.avatarname {
			color: #408eff;
			font-weight: bolder;
		}
		.username {
			cursor: pointer;
			margin-right: 5px;
		}
	}
}
</style>