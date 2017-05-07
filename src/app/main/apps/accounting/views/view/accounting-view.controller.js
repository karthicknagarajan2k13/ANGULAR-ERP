(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('viewAccountController', viewAccountController);

    /** @ngInject */
    function viewAccountController(accApi, $scope, $document, $state)
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
        
        vm.ssName = "s"

        $scope.account_data = {}

        //Api Call
        var dataPromise = accApi.viewAccount($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.account_data = result;
        }); 

        vm.editAccountPage = function(account){
             $state.go('app.accounting.accounting-edit', {obj:{acc_account: account}});
        }
        vm.deleteAccount = function(id){
            var delete_ids = JSON.stringify([id])
            accApi.deleteAllAccount({ids: delete_ids})
            $state.go('app.accounting.accounting'); 
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