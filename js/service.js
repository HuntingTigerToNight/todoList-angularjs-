(function(angular){
  'use strict';
  angular
  .module('todoApp.service',[])
  .service('TodoService',['$window',TodoService]);
  function TodoService($window){
    // var todoList = [
		// 	{ id: 1, name: '抽烟', isCompleted: false },
		// 	{ id: 2, name: '喝酒', isCompleted: true },
		// 	{ id: 3, name: '烫头发', isCompleted: false }
		// ];
    var localStorage=$window.localStorage;
    var todoList;
    var that=this;
    //获取数据
    this.getData=function(){
      todoList=JSON.parse(localStorage.getItem('todo'))||[];
      return todoList;
    }
    //保存数据
    this.saveData=function(){
      localStorage.setItem('todo',JSON.stringify(todoList));
    }


    //添加数据
    this.add=function(taskName){
      var ID;
			//如果输入框的值为空
			if(taskName.trim()===''){
				return;
			}
			//获取输入框中的值放到todoList数组中
			if(todoList.length===0){
				ID=1;
			}else{
				ID=todoList[todoList.length-1]['id']+1;
			}
			todoList.push({id:ID,name:taskName,isCompleted:false});
      this.saveData();
		}

    //删除数据
    this.remove=function(id){
			for(var i=0;i<todoList.length;i++){
				if(todoList[i].id===id){
					todoList.splice(i,1);
					break;
				}
			}
      that.saveData();
		}

    //切换任务选中状态(单个多个)
    this.checkAll=function(isCheckedAll){
			for(var i=0;i<todoList.length;i++){
				todoList[i].isCompleted=isCheckedAll;
			}
      that.saveData();
		}

    // 清除已完成任务
    this.delCompleted=function(){
			var tempArr=[];
			for(var i=0;i<todoList.length;i++){
				if(!todoList[i].isCompleted){
					tempArr.push(todoList[i]);
				}
			}
			todoList.length=0;
			[].push.apply(todoList,tempArr);
      that.saveData();
		}

    // 控制清除任务按钮的展示和隐藏
    this.isShow=function(){
			for(var i=0;i<todoList.length;i++){
				if(todoList[i].isCompleted){
					return true;
				}
			}
			return false;
		}

    // 显示未完成任务数
    this.getCount=function(){
			var count=0;
			for(var i=0;i<todoList.length;i++){
				if(!todoList[i].isCompleted){
					count++;
				}
			}
			return count;
		}
  }
})(angular)