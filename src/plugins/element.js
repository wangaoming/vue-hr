import Vue from 'vue'

// 导入element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,Form,FormItem,Input,Checkbox,
     //导入弹框提示组件
     Message,
     Container,Header,Aside,Main,
     Dropdown,DropdownMenu,DropdownItem,MessageBox,
     Menu,Submenu,MenuItem,
     Breadcrumb,BreadcrumbItem,
     Tabs,TabPane,
     Table,TableColumn,Dialog,Tag,Select,Icon,Option,Tree, Switch,CollapseItem,
     Radio,RadioGroup,DatePicker,Upload,Row,Col,Collapse,Popover,Card,Steps,
     Tooltip,Pagination,Badge,Loading,Image
     } from 'element-ui'

     Vue.use(Switch);
     Vue.use(CollapseItem);
     Vue.use(Radio);
     Vue.use(RadioGroup);
     Vue.use(DatePicker);
     Vue.use(Upload);
     Vue.use(Row);
     Vue.use(Col);
     Vue.use(Option);
     Vue.use(Submenu);
     Vue.use(MenuItem);
     Vue.use(Header);
     Vue.use(DropdownMenu);
     Vue.use(DropdownItem);
     Vue.use(Aside);
     Vue.use(Main);
     Vue.use(Checkbox);
     Vue.use(FormItem);
     Vue.use(Collapse);
     Vue.use(Popover);
     Vue.use(Menu);
     Vue.use(Tabs);
     Vue.use(TabPane);
     Vue.use(Breadcrumb);
     Vue.use(BreadcrumbItem);
     Vue.use(Dropdown);
     Vue.use(Steps);
     Vue.use(Tooltip);
     Vue.use(Tree);
     Vue.use(Pagination);
     Vue.use(Badge);
     Vue.use(Loading);
     Vue.use(Button);
     Vue.use(Input);
     Vue.use(Table);
     Vue.use(TableColumn);
     Vue.use(Dialog);
     Vue.use(Card);
     Vue.use(Container);
     Vue.use(Icon);
     Vue.use(Select);
     Vue.use(Form);
     Vue.use(Tag);
	 Vue.use(Image)
// 把Messag挂载到Vue的原型对象上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm