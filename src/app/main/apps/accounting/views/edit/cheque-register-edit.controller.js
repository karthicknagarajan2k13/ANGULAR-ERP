(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('editChequeRegisterController', editChequeRegisterController);

    /** @ngInject */
    function editChequeRegisterController(crmApi, accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.cheque_register = $state.params.obj
        console.log("vm.cheque_register",vm.cheque_register)

        vm.ssName = "s"

        var dataPromise = crmApi.get_customers({});
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
        });

        vm.updateChequeRegister = function(){
           var dataPromise = accApi.updateChequeRegister(vm.cheque_register.cheque_register.id,vm.cheque_register);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.cheque_register_id) !== "undefined"){
                        $state.go('app.accounting.cheque-register-view', {obj:{id: $scope.data.cheque_register_id}}); 
                    }
                }
            }); 
        }
        vm.viewChequeRegisterPage =function(id){
            $state.go('app.accounting.cheque-register-view', {obj:{id: id}}); 
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