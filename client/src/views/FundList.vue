<template>
	<div class="fund-list-container">
		<div>
			<el-form :inline="true" ref="add_data">
				<el-form-item class="btnRight">
					<el-button
						type="primary"
						size="small"
						icon="el-icon-plus"
						@click="handleAdd()"
						>添加</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<div class="table_container">
			<el-table
				:data="tableData"
				style="width: 100%"
				border
				max-height="450"
			>
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
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{
							scope.row.date
						}}</span>
					</template>
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
					<template slot-scope="scope">
						<span style="color: #00d053">{{
							scope.row.income
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="expend"
					label="支出"
					width="170"
				>
					<template slot-scope="scope">
						<span style="color: #f56767">{{
							scope.row.expend
						}}</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="cash"
					label="账户现金"
					width="170"
				>
					<template slot-scope="scope">
						<span style="color: #4db3ff">{{ scope.row.cash }}</span>
					</template>
				</el-table-column>
				<el-table-column
					align="center"
					prop="remark"
					label="备注"
					width="210"
				>
				</el-table-column>
				<el-table-column
					label="操作"
					prop="operation"
					align="center"
					fixed="right"
					width="320"
				>
					<template slot-scope="scope">
						<el-button
							type="warning"
							size="small"
							icon="el-icon-edit"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑
						</el-button>
						<el-button
							size="small"
							type="danger"
							icon="el-icon-delete"
							@click="handleDelete(scope.$index, scope.row)"
							>删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<Dialog :dialog="dialogData"></Dialog>
	</div>
</template>
<script>
import Dialog from "../components/Dialog.vue";
export default {
	name: "fundList",
	components: {
		Dialog,
	},
	data() {
		return {
			tableData: [],
			dialogData: {
				show: false,
			},
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
		handleEdit(index, row) {},
		handleDelete(index, row) {},
		handleAdd() {
			this.dialogData.show = true;
		},
	},
};
</script>
<style lang="less">
.fund-list-container {
	width: 100%;
	height: 100%;
	padding: 16px;
	box-sizing: border-box;
}
.btnRight {
	float: right;
}
</style>