<template>
	<div class="login">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">资金在线后台管理系统</span>
				<el-form
					:model="loginUser"
					:rules="rules"
					ref="loginForm"
					label-width="80px"
					class="loginForm"
				>
					<template>
						<el-form-item
							v-for="item in formList"
							:label="item.label"
							:prop="item.prop"
							:key="item.prop"
						>
							<el-input
								v-if="'input,password'.includes(item.type)"
								:type="item.type"
								v-model="loginUser[item.prop]"
								:placeholder="item.placeholder"
							></el-input>
						</el-form-item>
					</template>
					<el-form-item>
						<el-button
							type="primary"
							class="submit_btn"
							@click="submitForm('loginForm')"
							>登录
						</el-button>
					</el-form-item>
					<div class="tiparea">
						<p>
							没有账号，请先
							<router-link to="/register"> 注册 </router-link>
						</p>
					</div>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
	name: "login",
	components: {},
	data() {
		return {
			loginUser: {
				email: "",
				password: "",
			},
			formList: [
				{
					label: "邮箱",
					prop: "email",
					placeholder: "请输入邮箱",
					type: "input",
				},
				{
					label: "密码",
					prop: "password",
					placeholder: "请输入密码",
					type: "password",
				},
			],
			rules: {
				email: [
					{
						type: "email",
						required: true,
						message: "邮箱格式不正确",
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: "密码不能为空",
						trigger: "blur",
					},
					{
						min: 6,
						max: 30,
						message: "长度在 6 到 30 个字符之间",
						trigger: "blur",
					},
				],
			},
		};
	},
	methods: {
		submitForm() {
			this.$refs["loginForm"].validate((valid) => {
				if (valid) {
					this.$axios
						.post("/api/users/login", this.loginUser)
						.then((res) => {
							const { token } = res.data;
							// 存储到浏览器的localStorage
							localStorage.setItem("userToken", token);
							// 解析token
							const decoded = jwt_decode(token);
							// 存储token到vuex中
							this.$store.dispatch(
								"setAuthenticated",
								!this.isEmpty(decoded)
							);
							this.$store.dispatch("setUser", decoded);

							// 跳转到index路由中
							this.$router.push("/index");
						});
				}
			});
		},
		// 判断一个值是否为空值
		isEmpty(value) {
			return (
				value === undefined ||
				value === null ||
				(typeof value === "object" &&
					Object.keys(value).length === 0) ||
				(typeof value === "string" && value.trim().length === 0)
			);
		},
	},
};
</script>

<style lang="less">
.login {
	position: relative;
	width: 100%;
	height: 100%;
	background: url(../assets/login.png) no-repeat center center;
	background-size: 100% 100%;
}
.form_container {
	height: 420px;
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
		.loginForm {
			margin-top: 20px;
			background-color: #fff;
			padding: 20px 40px 20px 20px;
			border-radius: 5px;
			box-shadow: 0 5px 10px #cccc;

			.submit_btn {
				width: 100%;
			}
			.tiparea {
				text-align: right;
				font-size: 12px;
				color: #333;
				p a {
					color: #409eff;
				}
			}
		}
	}
}
</style>