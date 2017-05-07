(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('editAccountController', editAccountController);

    /** @ngInject */
    function editAccountController(accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.account = $state.params.obj
        console.log("vm.account",vm.account)

        vm.ssName = "s"

        vm.updateAccount = function(){
           var dataPromise = accApi.updateAccount(vm.account.acc_account.id,vm.account);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.acc_account_id) !== "undefined"){
                        $state.go('app.accounting.accounting-view', {obj:{id: $scope.data.acc_account_id}}); 
                    }
                }
            }); 
        }
        vm.viewAccountPage =function(id){
            $state.go('app.accounting.accounting-view', {obj:{id: id}}); 
        }
        vm.newAccountPage = function(){
            $state.go('app.accounting.accounting-new'); 
        }
        vm.AccountsPage = function(){
            $state.go('app.accounting.accounting'); 
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