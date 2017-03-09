(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('viewTimeclocksController', viewTimeclocksController);

    /** @ngInject */
    function viewTimeclocksController(hrApi, $scope, $document, $state, Product)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;

        //Api Call
        var dataPromise = hrApi.viewTimeclock($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.timeclock_data = result; 
            console.log("$scope.timeclock_data",$scope.timeclock_data)
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
	    vm.orders = Product.data;

       
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