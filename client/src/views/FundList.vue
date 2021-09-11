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
		<!-- 分页 -->
		<el-row>
			<el-col :span="24">
				<div class="pagination">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="paginations.page_index"
						:page-sizes="paginations.page_sizes"
						:page-size="paginations.page_size"
						:layout="paginations.layout"
						:total="paginations.total"
					>
					</el-pagination>
				</div>
			</el-col>
		</el-row>
		<Dialog
			:dialog="dialogData"
			:formData="formData"
			@updataDialog="getProfile"
		></Dialog>
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
				title: "添加资金信息",
				options: "add",
			},
			formData: {
				type: "",
				describe: "",
				income: "",
				expend: "",
				cash: "",
				remark: "",
				id: "",
			},
			paginations: {
				page_index: 1, //当前所在页
				total: 0, // 总数
				page_size: 5, // 一页显示条数
				page_sizes: [5, 10, 15, 20], // 每页显示条数
				layout: "total, sizes, prev, pager, next, jumper", // 分页属性
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
		handleEdit(index, row) {
			// 编辑
			this.dialogData = {
				show: true,
				title: "编辑资金信息",
				options: "edit",
			};

			this.formData = {
				type: row.type,
				describe: row.describe,
				income: row.income,
				expend: row.expend,
				cash: row.cash,
				remark: row.remark,
				id: row._id,
			};
		},
		handleDelete(index, row) {
			this.$axios
				.delete(`/api/profiles/delete/${row._id}`)
				.then((res) => {
					// 删除成功
					this.$message.success("删除成功");
					this.getProfile();
				});
		},
		handleAdd() {
			// 新增
			this.dialogData = {
				show: true,
				title: "添加资金信息",
				options: "add",
			};
			this.formData = {
				type: "",
				describe: "",
				income: "",
				expend: "",
				cash: "",
				remark: "",
				id: "",
			};
		},
		handleSizeChange() {},
		handleCurrentChange() {},
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
.pagination {
	text-align: right;
	margin-top: 10px;
}
</style>