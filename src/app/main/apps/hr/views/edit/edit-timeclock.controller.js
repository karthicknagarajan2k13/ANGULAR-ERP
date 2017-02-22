(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('editTimeclocksController', editTimeclocksController);

    /** @ngInject */
    function editTimeclocksController(hrApi, $scope, $document, $state, Product)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;
		vm.timeclock = $state.params.obj
        console.log("vm.timeclock",vm.timeclock)

		vm.ssName = "s"
	    vm.orders = Product.data;
        
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        }); 

        vm.updateTimeclock = function(){
           var dataPromise = hrApi.updateTimeclock(vm.timeclock.timeclock.id,vm.timeclock);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.timeclock_id) !== "undefined"){
                        $state.go('app.hr.timeclock-view', {obj:{id: $scope.data.timeclock_id}}); 
                    }
                }
            }); 
        }

        vm.viewTimeclockPage =function(id){
            console.log("id",id)
            $state.go('app.hr.timeclock-view', {obj:{id: id}}); 
        }
        vm.newTimeclockPage = function(){
            $state.go('app.hr.timeclock-new'); 
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
                    // Normally you would update the media timeclock
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