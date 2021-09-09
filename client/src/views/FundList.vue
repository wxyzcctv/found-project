<template>
	<div class="fund-list-container">
		<el-table :data="tableData" style="width: 100%" border max-height="450">
			<el-table-column
				align="center"
				type="index"
				label="序号"
				width="70"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="date"
				label="创建时间"
				width="250"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="type"
				label="收支类型"
				width="150"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="describe"
				label="收支描述"
				width="180"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="income"
				label="收入"
				width="170"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="expend"
				label="之处"
				width="170"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="cash"
				label="账户现金"
				width="170"
			>
			</el-table-column>
			<el-table-column
				align="center"
				prop="remark"
				label="备注"
				width="220"
			>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
	name: "fundList",
	data() {
		return {
			tableData: [],
		};
	},
	created() {
		this.getProfile();
	},
	methods: {
		getProfile() {
			// 获取表格数据
			this.$axios
				.get("/api/profiles")
				.then((res) => {
					this.tableData = res.data;
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>
<style lang="less">
</style>