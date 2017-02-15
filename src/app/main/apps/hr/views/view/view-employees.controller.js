(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('hrviewController', hrviewController);

    /** @ngInject */
    function hrviewController(hrApi, $scope, $document, $state, Product)
    {

        var vm = this;
		
		vm.ssName = "s"
	    vm.orders = Product.data;

        var dataPromise = hrApi.viewEmployee($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.employee_data = result;
        }); 
        $scope.editEmployeePage = function(id){
             $state.go('app.hr.employees-edit', {obj:{id: id}});
        }
        $scope.deleteEmployee = function(id){
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllEmployee({ids: delete_ids})
            $state.go('app.hr.employees'); 
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