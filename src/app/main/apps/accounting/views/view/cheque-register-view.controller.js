(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('viewChequeRegisterController', viewChequeRegisterController);

    /** @ngInject */
    function viewChequeRegisterController(accApi, $scope, $document, $state)
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

        $scope.cheque_register_data = {}

        //Api Call
        var dataPromise = accApi.viewChequeRegister($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.cheque_register_data = result;
        }); 

        vm.editChequeRegisterPage = function(cheque_register){
             $state.go('app.accounting.cheque-register-edit', {obj:{cheque_register: cheque_register}});
        }
        vm.deleteChequeRegister = function(id){
            var delete_ids = JSON.stringify([id])
            accApi.deleteAllChequeRegister({ids: delete_ids})
            $state.go('app.accounting.cheque-register'); 
        }
        vm.newChequeRegisterPage = function(){
            $state.go('app.accounting.cheque-register-new'); 
        }
        vm.ChequeRegistersPage = function(){
            $state.go('app.accounting.cheque-register'); 
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