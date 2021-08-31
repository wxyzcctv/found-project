<template>
	<div class="register">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">资金在线后台管理系统</span>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: "register",
	components: {},
};
</script>

<style lang="less">
.register {
	position: relative;
	width: 100%;
	height: 100%;
	background: url(../assets/login.png) no-repeat center center;
	background-size: 100% 100%;
}
.form_container {
	height: 210px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 25px;
	border-radius: 5px;
	text-align: center;
	.manage_tip {
		.title {
			font-family: "Microsoft YaHei";
			font-weight: bold;
			font-size: 26px;
			color: #fff;
		}
	}
}
</style>