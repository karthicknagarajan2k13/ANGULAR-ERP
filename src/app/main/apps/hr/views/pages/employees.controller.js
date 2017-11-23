(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('EmployeesController', EmployeesController)
          .factory('storageService', ['$rootScope', function($rootScope) {
                return {
                    get: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    save: function(key, data) {
                        sessionStorage.setItem(key, data);
                    },
                    getModel: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    setModel: function(key, data) {
                        sessionStorage.setItem(key, data);
                    }
            };
        }]);


    /** @ngInject */
    function EmployeesController(storageService,$cookies,$timeout,$window, hrApi, $scope, $state)
    {
        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false
		var vm = this;

        // Data
        vm.search_data = {}
        if( storageService.get('key') === null || storageService.get('key')  === "new"){
                var dataPromise = hrApi.getEmployees({});
                dataPromise.then(function(result) { 
                    $scope.employees_data = result;
                    vm.dtInstance = {};
                    vm.dtOptions = {
                        dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                        columnDefs  : [
                            {
                                // Target the id column
                                targets: 0,
                                width  : '10px'
                            }
                        ],
                        initComplete: initComplete,
                        pagingType  : 'simple',
                        lengthMenu  : [10, 20, 30, 50, 100],
                        pageLength  : 20,
                        scrollY     : 'auto',
                        responsive  : true
                    };
                    $timeout(function(){
                        $scope.show_table2 = true
                    }, 2000);            
                }); 
            }else{
                storageService.save('key', "new");
                var data = $cookies.getObject('search');
                var dataPromise = hrApi.getEmployees(data);
                 dataPromise.then(function(result) { 
                      $scope.employees_data = result;

                      console.log("$scope.employees_data",$scope.employees_data)
                        vm.dtInstance = {};
                        vm.dtOptions = {
                        dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                        columnDefs  : [
                            {
                                // Target the id column
                                targets: 0,
                                width  : '10px'
                            }
                        ],
                        initComplete: initComplete,
                        pagingType  : 'simple',
                        lengthMenu  : [10, 20, 30, 50, 100],
                        pageLength  : 20,
                        scrollY     : 'auto',
                        responsive  : true
                    };
                    $timeout(function(){
                        $scope.show_table2 = true
                    }, 2000);         
                }); 
             }

        var dataPromise = hrApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        });
        
        vm.newEmployeePage = function(){
            $state.go('app.hr.employees-new'); 
        }
        vm.editEmployeePage = function(id){
             $state.go('app.hr.employees-edit', {obj:{id: id}});
        }
        vm.viewEmployeePage = function(id){
            $state.go('app.hr.employees-view', {obj:{id: id}}); 
        }
        vm.deleteAllEmployee = function () {
            var delete_ids = [];
            angular.forEach($scope.employees_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllEmployee({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = hrApi.getEmployees({});
                    dataPromise.then(function(result) { 
                        $scope.employees_data = result;
                    }); 
                });
            }
        };
        vm.deleteEmployee = function (id) {
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllEmployee({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchEmployeeData = function(id){
          
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();
        }


        
        vm.searchEmployeeDataClear = function(id){
            vm.search_data = {}
        }


        function initComplete(){
            $scope.show_table1 = true
        }
		
        vm.timeceditpage = function(id){
			 $state.go('app.hr.timeclock-edit', {id: id}); 
		}
	    vm.timecviewpage = function(id){
			 $state.go('app.hr.timeclock-view', {id: id}); 
		}
		
		vm.expeeditpage = function(id){
			 $state.go('app.hr.expenses-edit', {id: id}); 
		}
	    vm.expeviewpage = function(id){
			 $state.go('app.hr.expenses-view', {id: id}); 
		}
		
		vm.payrolleditpage = function(id){
			 $state.go('app.hr.payroll-edit', {id: id}); 
		}
	    vm.payrollviewpage = function(id){
			 $state.go('app.hr.payroll-view', {id: id}); 
		}
		
        //////////
    }
})();