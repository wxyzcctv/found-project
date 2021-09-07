<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
	name: "login",
	components: {},
	created() {
		if (localStorage.getItem("userToken")) {
			// 解析token
			const decoded = jwt_decode(localStorage.getItem("userToken"));
			// 存储token到vuex中
			this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
			this.$store.dispatch("setUser", decoded);
		}
	},
	methods: {
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


<style>
html,
body,
#app {
	width: 100%;
	height: 100%;
}
</style>
