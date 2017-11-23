(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('viewTimeclocksController', viewTimeclocksController);

    /** @ngInject */
    function viewTimeclocksController(hrApi, $scope, $document, $state)
    {

        var vm = this;
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
		


        //Api Call
        var dataPromise = hrApi.viewTimeclock($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.timeclock_data = result; 
        }); 

        vm.editTimeclockPage = function(timeclock){
             $state.go('app.hr.timeclock-edit', {obj:{timeclock: timeclock}});
        }
        vm.deleteTimeclock = function(id){
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllTimeclock({ids: delete_ids})
            $state.go('app.hr.timeclock'); 
        }
        vm.newTimeclockPage = function(){
            $state.go('app.hr.timeclock-new'); 
        }
        vm.TimeclocksPage = function(){
            $state.go('app.hr.timeclock'); 
        }
        
		vm.ssName = "s"
    }
})();