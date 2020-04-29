<template>
  <div>
		<!-- 主要的五个tab--联合到component中相对应每个tab切面内容（自定义组件中） -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="first"><Department></Department></el-tab-pane>
      <el-tab-pane label="职位管理" name="second"><Position></Position></el-tab-pane>
      <el-tab-pane label="职称管理" name="third"><JobLevel></JobLevel></el-tab-pane>
      <el-tab-pane label="奖惩管理" name="fourth"><Reward></Reward></el-tab-pane>
      <el-tab-pane label="权限组" name="five"><Pemission></Pemission></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Position from '../../component/sys/basic/Position'
import Department from '../../component/sys/basic/Department'
import Reward from '../../component/sys/basic/Reward'
import JobLevel from '../../component/sys/basic/JobLevel'
import Pemission from '../../component/sys/basic/Pemission'

export default {
  name: 'SysBasic',
  data () {
    return {
      activeName: 'second'
    }
  },
  components: {
    Department,
    Position,
    JobLevel,
    Reward,
    Pemission
		// 显示
  }
}
</script>

<style scoped>

</style>
