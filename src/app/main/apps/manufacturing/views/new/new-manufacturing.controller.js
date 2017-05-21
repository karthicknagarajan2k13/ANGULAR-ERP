(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('newManufacturingController', newManufacturingController);

    /** @ngInject */
    function newManufacturingController($mdToast,mfgApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.manufacturing = {}
		vm.ssName = "s"

        var dataPromise = mfgApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 
        var dataPromise = mfgApi.get_SalesOrders({});
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
        });

        vm.qa_check_list =[]
        vm.qa_check_data = {}

        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };
        vm.saveManufacturing = function(){
            vm.manufacturing.qa_check_list = JSON.stringify(vm.qa_check_list);
            console.log("manufacturing",vm.manufacturing)
            var dataPromise = mfgApi.createManufacturing({manufacturing:vm.manufacturing});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.manufacturing_id) !== "undefined"){
                        $state.go('app.manufacturing.manufacturing-view', {obj:{id: $scope.data.manufacturing_id}}); 
                    }
                }
            }); 
        }
        vm.manufacturingDataClear = function(){
            vm.manufacturing = {}
        }
        vm.newManufacturingPage = function(){
            $state.go('app.manufacturing.manufacturing-new'); 
        }
        vm.qa_check_delete = function(qa_check){
            var index = vm.qa_check_list.indexOf(qa_check);
            vm.qa_check_list.splice(index, 1);  
        }
        vm.qa_check_add = function(){
            if(vm.qa_check_data.name){
                vm.qa_check_list.push(vm.qa_check_data)
                vm.qa_check_data = {}
            }
        }
        vm.ManufacturingsPage = function(){
            $state.go('app.manufacturing.manufacturing'); 
        }
        
        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)  {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }
		
    }
})();