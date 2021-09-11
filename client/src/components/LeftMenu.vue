<template>
	<el-row class="men_page">
		<el-col>
			<el-menu
				class="el-menu-vertical-demo"
				background-color="#324057"
				text-color="#fff"
				active-text-color="#409eff"
			>
				<router-link to="/home">
					<el-menu-item index="0">
						<i class="fa fa-margin fa-server"></i>
						<span slot="title">首页</span>
					</el-menu-item>
				</router-link>
				<template v-for="item in items">
					<el-submenu
						v-if="item.children"
						:index="item.path"
						:key="item.path"
					>
						<template slot="title">
							<i :class="'fa fa-margin ' + item.icon"></i>
							<span slot="title">{{ item.name }}</span>
						</template>
						<router-link
							v-for="(citem, cindex) in item.children"
							:to="citem.path"
							:key="cindex"
						>
							<el-menu-item :index="citem.path">
								<span slot="title">{{ citem.name }}</span>
							</el-menu-item>
						</router-link>
					</el-submenu>
				</template>
			</el-menu>
		</el-col>
	</el-row>
</template>
<script>
export default {
	name: "left-menu",
	data() {
		return {
			defaultImg: require("../assets/avatar.png"),
			items: [
				{
					icon: "fa-money",
					name: "资金管理",
					path: "found",
					children: [
						{
							path: "fundlist",
							name: "资金流水",
						},
					],
				},
				{
					icon: "fa-asterisk",
					name: "信息管理",
					path: "info",
					children: [
						{
							path: "inforshow",
							name: "个人信息",
						},
					],
				},
			],
		};
	},
	methods: {},
};
</script>


<style lang="less">
.men_page.el-row {
	z-index: 1;
	position: fixed;
	width: 180/15rem;
	height: calc(100% - 71px);
	.el-col {
		height: 100%;
		a {
			&:link {
				text-decoration: none;
			} /* 指正常的未被访问过的链接*/
			&:visited {
				text-decoration: none;
			} /*指已经访问过的链接*/
			&:hover {
				text-decoration: none;
			} /*指鼠标在链接*/
			&:active {
				text-decoration: none;
			} /* 指正在点的链接*/
		}
	}
	.el-menu {
		border-right: none;
		height: 100%;
		.el-menu-item,
		.el-submenu__title {
			.fa-margin {
				margin-right: 5px;
			}
		}
		.el-submenu {
			.el-menu-item {
				width: 180/15rem;
				min-width: 180/15rem;
				.fa-margin {
					margin-right: 5px;
				}
			}
		}
	}
}
</style>