<template>
	<div class="register">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">资金在线后台管理系统</span>
				<el-form
					:model="registerUser"
					:rules="rules"
					ref="registerForm"
					label-width="80px"
					class="registerForm"
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
								v-model="registerUser[item.prop]"
								:placeholder="item.placeholder"
							></el-input>
							<el-select
								v-if="item.type === 'select'"
								v-model="registerUser[item.prop]"
								:placeholder="item.placeholder"
							>
								<el-option
									v-for="each in identityList"
									:key="each.value"
									:label="each.label"
									:value="each.value"
								>
								</el-option>
							</el-select>
						</el-form-item>
					</template>
					<el-form-item>
						<el-button
							type="primary"
							class="submit_btn"
							@click="submitForm('registerForm')"
							>注册</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: "register",
	components: {},
	data() {
		var validatePass2 = (rule, value, callback) => {
			if (value !== this.registerUser.password) {
				callback(new Error("两次输入密码不一致!"));
			} else {
				callback();
			}
		};
		return {
			registerUser: {
				name: "",
				email: "",
				password: "",
				password2: "",
				identity: "",
			},
			formList: [
				{
					label: "用户名",
					prop: "name",
					placeholder: "请输入用户名",
					type: "input",
				},
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
				{
					label: "确认密码",
					prop: "password2",
					placeholder: "请确认密码",
					type: "password",
				},
				{
					label: "选择身份",
					prop: "identity",
					placeholder: "请输入姓名",
					type: "select",
				},
			],
			identityList: [
				{
					value: "manager",
					label: "管理员",
				},
				{
					value: "employee",
					label: "员工",
				},
			],
			rules: {
				name: [
					{
						required: true,
						message: "用户名不能为空",
						trigger: "blur",
					},
					{
						min: 2,
						max: 30,
						message: "长度在 2 到 30 个字符",
						trigger: "blur",
					},
				],
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
				password2: [
					{
						required: true,
						message: "确认密码不能为空",
						trigger: "blur",
					},
					{
						min: 6,
						max: 30,
						message: "长度在 6 到 30 个字符之间",
						trigger: "blur",
					},
					{ validator: validatePass2, trigger: "blur" },
				],
			},
		};
	},
	methods: {
		submitForm() {
			this.$refs["registerForm"].validate((valid) => {
				if (valid) {
					this.$axios
						.post("/api/users/register", this.registerUser)
						.then((res) => {
							this.$message.success("账号注册成功");
						});
					this.$router.push("/login");
				}
			});
		},
	},
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
		.registerForm {
			margin-top: 20px;
			background-color: #fff;
			padding: 20px 40px 20px 20px;
			border-radius: 5px;
			box-shadow: 0 5px 10px #cccc;
		}
		.submit_btn {
			width: 100%;
		}
	}
}
</style>