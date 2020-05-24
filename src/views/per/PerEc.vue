<template>
	<!-- 员工惩罚管理 -->
  <div>
    <div>
      <el-input size="small" class="input_type" placeholder="输入姓名..."
        prefix-icon="el-icon-plus" @keydown.enter.native="addPosition" v-model="pos.name">
      </el-input>
			  <el-input size="small" class="input_type" placeholder="输入惩罚..."
			  prefix-icon="el-icon-plus" @keydown.enter.native="addPosition" v-model="pos.punishmentclasses">
			</el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">
        添加
      </el-button>
    </div>
    <div class="updo">
		    <el-upload
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="onSuccess"
          :on-error="onError"
          :disabled="importBtnDisabled"
          style="display: inline-flex; margin-right: 8px"
          action="/per/reward/import">
          <el-button :disabled="importBtnDisabled" type="success" :icon="importBtnIcon" size="small">
            {{importBtnText}}
          </el-button>
        </el-upload>
        <el-button type="success" icon="el-icon-download" size="small" @click="exportData">
          导出数据
        </el-button>
      </div>
    
    <div>
      <el-table :data="positions" stripe border type="small" style="width: 70%" v-loading="loading" element-loading-text="正在加载..."
			 @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="56"> </el-table-column>
        <el-table-column prop="id" label="编号" width="56"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="gender" label="性别" width="200"> </el-table-column>
        <el-table-column prop="punishmentdate" label="惩罚日期" width="200"> </el-table-column>
        <el-table-column prop="punishmentclasses" label="惩罚类别" width="200"> </el-table-column>
        <el-table-column prop="times" label="次数" width="200"> </el-table-column>
        <el-table-column prop="punishmentpay" label="工资奖罚" width="200"> </el-table-column>
        <el-table-column prop="proposer" label="提案人" width="200"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
			<!-- 分页条 -->
			<div class="pageable">
        <el-pagination background :total="pageInfo.total" :page-sizes="[5, 10, 20, 50, 100]"
                       :page-size="5"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       layout="sizes, prev, pager, next, jumper, ->, total, slot">
        </el-pagination>
      </div>
      <el-button type="danger" size="small" style="margin-top: 8px" @click="deleteMany"
                 :disabled="multipleSelection.length === 0">
        批量删除
      </el-button>
    </div>

    <el-dialog title="修改惩罚信息" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-tag>惩罚名称</el-tag>
        <el-input class="update_input" size="small" v-model="updatePos.name"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small" >取 消</el-button>
        <el-button type="primary" @click="doUpdate" size="small" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PerEc',
  data () {
    return {
      // 添加输入框的数据
      pos: {
        name: '',
				punishmentclasses:''
      },
      // 表格显示的数据
      positions: [],
      // 更新按钮的数据
      updatePos: {
        name: ''
      },
      // 对话框显示与否的标志位
      dialogVisible: false,
      // 批量删除的数据记录
      multipleSelection: [],
			// 加载
			loading: true,
			// 分页条
			pageInfo: {
        total: 0,
        page: 1,
        size: 5
      },
			importBtnText: '导入数据',
      importBtnIcon: 'el-icon-upload2',
      importBtnDisabled: false
    }
  },
  methods: {
		onSuccess(response, file, fileList) {
      this.importBtnText = '导入数据'
      this.importBtnIcon = 'el-icon-upload2'
      this.importBtnDisabled = false
      this.initPositions()
    },
    onError(err, file, fileList) {
      this.importBtnText = '导入数据'
      this.importBtnIcon = 'el-icon-upload2'
      this.importBtnDisabled = false
    },
    beforeUpload () {
      this.importBtnText = '正在导入'
      this.importBtnIcon = 'el-icon-loading'
      this.importBtnDisabled = true
    },
    exportData () {
      window.open('/per/reward/export', '_parent')
    },
    handleSizeChange (currestSize) {
      this.pageInfo.size = currestSize
      this.initPositions()
    },
    handleCurrentChange (currentPage) {
      this.pageInfo.page = currentPage
      this.initPositions()
    },
    // 表格数据初始化处理
    async initPositions () {
			 this.loading = true
      const data = await this.getRequest('/per/reward/?page=' + this.pageInfo.page
        + '&size=' + this.pageInfo.size)
				 this.loading = false
      if (data) {
        this.positions = data.obj.list
				this.pageInfo.total = data.obj.total
      }
    },
    // 添加新记录的事件处理
    async addPosition () {
      if (this.pos.name) {
        const resp = await this.postRequest('/per/reward/', this.pos)
        if (resp) {
          this.initPositions()
          this.pos.name = ''
					this.pos.punishmentclasses=''
        }
      } else {
        this.$message.error('姓名不能为空')
      }
    },
    // 显示修改对话框
    showEditDialog (index, data) {
      // this.updatePos = data // 浅拷贝会改变表格的记录
      Object.assign(this.updatePos, data)  // 使用深拷贝
      this.dialogVisible = true
    },
    // 弹框确认修改的事件处理
    async doUpdate() {
      const resp = await this.putRequest('/per/reward/', this.updatePos)
      if (resp) {
        this.initPositions()
        this.updatePos.name = ''
        this.dialogVisible = false
      }
    },
    // 表格记录的删除按钮的事件处理
    handleDelete (index, data) {
      this.$confirm('此操作将永久删除' + data.name + '惩罚, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/per/reward/' + data.id).then(resp => {
          this.initPositions()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 记录多选的处理
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    // 批量删除
    deleteMany() {
      this.$confirm('此操作将永久删除' + this.multipleSelection.length + '条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 生成删除记录 id的查询字符串
        let ids = "?"
        this.multipleSelection.forEach(item => {
          ids += "ids=" + item.id + '&'
        })
        this.deleteRequest('/per/reward/' + ids).then(resp => {
          this.initPositions()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  },
  // 在页面元素挂载后加载数据
  mounted () {
    this.initPositions()
  }
}
</script>

<style scoped>
  .input_type {
    width: 300px;
    margin-right: 8px;
    margin-bottom: 16px;
  }
  .update_input {
    width: 200px;
    margin-left: 8px;
  }
	.pageable {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }
	.updo{
		height: 60px;
	  margin-top: -50px;
		margin-left: 800px;
		
	}
	
</style>
 