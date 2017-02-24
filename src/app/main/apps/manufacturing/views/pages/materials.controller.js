(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('MaterialController', MaterialController);

    /** @ngInject */
    function MaterialController($window, mfgApi, $scope, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = mfgApi.getMaterials({});
        dataPromise.then(function(result) { 
            $scope.materials_data = result;
            console.log("$scope.materials_data",$scope.materials_data)
        }); 

        var dataPromise = mfgApi.get_manufacturings({});
        dataPromise.then(function(result) { 
            $scope.get_manufacturings = result;
        }); 
        var dataPromise = mfgApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 


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
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };


        vm.newMaterialPage = function(){
            $state.go('app.manufacturing.materials-new'); 
        }
        vm.viewMaterialPage = function(id){
            $state.go('app.manufacturing.materials-view', {obj:{id: id}}); 
        }
        vm.deleteAllMaterial = function () {
            var delete_ids = [];
            angular.forEach($scope.materials_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = mfgApi.deleteAllMaterial({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = mfgApi.getMaterials({});
                    dataPromise.then(function(result) { 
                        $scope.materials_data = result;
                    }); 
                });
            }
        };
        vm.searchMaterialData = function(id){
            var dataPromise = mfgApi.getMaterials(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.materials_data = result; 
            }); 
        }
        vm.searchMaterialDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();