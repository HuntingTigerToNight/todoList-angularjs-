
(function(angualar){
  'use strict';
  angular
  .module('todoApp.controller',[])
  .controller('TodoController',['$scope','$location','TodoService',TodoController]);
  function TodoController($scope,$location,TodoService){
    var vm=$scope;
		// 1 展示任务列表
    vm.todoList=TodoService.getData();

		// 2 添加任务
		vm.taskName="";
		vm.add=function(){
      TodoService.add(vm.taskName);
      vm.taskName="";
    }

		// 3 点击删除任务
		vm.remove=TodoService.remove;

		// 4 修改任务
		vm.editingID = -1;
		vm.edit=function(id){
				vm.editingID=id;
		}
		vm.save=function(){
			vm.editingID= -1;
      TodoService.saveData();
		}

		// 5 切换任务选中状态(单个或批量)
		vm.isCheckedAll=false;
		vm.checkAll=function(){
      TodoService.checkAll(vm.isCheckedAll);
    }

		// 6 清除已完成任务
		vm.delCompleted=TodoService.delCompleted;
		// 控制清除任务按钮的展示和隐藏
		vm.isShow=TodoService.isShow;

		// 7 显示未完成任务数
		vm.getCount=TodoService.getCount;

		// 8 显示不同状态的任务
		// vm.status=undefined;
		// vm.selectAll=function(){
		// 	vm.status=undefined;
		// }
		// vm.selectActive=function(){
		// 	vm.status=false;
		// }
		// vm.selectCompleted=function(){
		// 	vm.status=true;
		// }

		// 9 根据URL变化显示相应任务
		vm.location = $location;
		console.log(vm.location.url());
		vm.$watch('location.url()',function(newValue,oldValue){
			switch(newValue){
				case '/#%2Factive':vm.status=false; break;
				case '/#%2Fcompleted':vm.status=true; break;
				default:vm.status=undefined; break;
			}
		})
  }
})(angular)