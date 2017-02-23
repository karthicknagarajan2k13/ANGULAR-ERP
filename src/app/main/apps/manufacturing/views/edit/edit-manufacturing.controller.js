(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('editManufacturingController', editManufacturingController);

    /** @ngInject */
    function editManufacturingController(mfgApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.manufacturing = $state.params.obj
        vm.manufacturing.manufacturing.start_date = new Date(vm.manufacturing.manufacturing.start_date);
        vm.manufacturing.manufacturing.expected_completion_date = new Date(vm.manufacturing.manufacturing.expected_completion_date);


        console.log("vm.manufacturing",vm.manufacturing)

        var dataPromise = mfgApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 
        var dataPromise = mfgApi.get_SalesOrders({});
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
        }); 
        
		vm.ssName = "s"
        vm.qa_check_data = {}

        vm.updateManufacturing = function(){
            vm.manufacturing.manufacturing.qa_check_list = JSON.stringify(vm.manufacturing.manufacturing.qa_check_list);
           var dataPromise = mfgApi.updateManufacturing(vm.manufacturing.manufacturing.id,vm.manufacturing);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.manufacturing_id) !== "undefined"){
                        $state.go('app.manufacturing.manufacturing-view', {obj:{id: $scope.data.manufacturing_id}}); 
                    }
                }
            }); 
        }
        vm.viewManufacturingPage =function(id){
            $state.go('app.manufacturing.manufacturing-view', {obj:{id: id}}); 
        }
        vm.newManufacturingPage = function(){
            $state.go('app.manufacturing.manufacturing-new'); 
        }
        vm.qa_check_delete = function(qa_check){
            var index = vm.manufacturing.manufacturing.qa_check_list.indexOf(qa_check);
            vm.manufacturing.manufacturing.qa_check_list.splice(index, 1);  
        }
        vm.qa_check_add = function(){
            if(vm.qa_check_data.name){
                vm.manufacturing.manufacturing.qa_check_list.push(vm.qa_check_data)
                vm.qa_check_data = {}
            }
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