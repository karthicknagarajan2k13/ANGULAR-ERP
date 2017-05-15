(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('newChequeRegisterController', newChequeRegisterController);

    /** @ngInject */
    function newChequeRegisterController(crmApi, accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.cheque_register = {}
        vm.ssName = "s"
        $scope.table_data = []

        var dataPromise = crmApi.get_customers({});
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
        });

        vm.saveChequeRegister = function(){
            var dataPromise = accApi.createChequeRegister({cheque_register:vm.cheque_register});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.cheque_register_id) !== "undefined"){
                        console.log("vm.cheque_register",vm.cheque_register)
                        if (typeof($scope.data.cheque_register_id) !== "undefined"){
                            $scope.table_data.push(["Code",$scope.data.cheque_register_id]);
                        }
                        if (typeof(vm.cheque_register.cheque_date) !== "undefined"){
                            $scope.table_data.push(["Date",vm.cheque_register.cheque_date]);
                        }
                        if (typeof(vm.cheque_register.payee) !== "undefined"){
                            $scope.table_data.push(["Payee",vm.cheque_register.payee]);
                        }
                        if (typeof(vm.cheque_register.debit) !== "undefined"){
                            $scope.table_data.push(["Debit",vm.cheque_register.debit]);
                        }                          
                        if (typeof(vm.cheque_register.credit) !== "undefined"){
                            $scope.table_data.push(["Credit",vm.cheque_register.credit]);
                        }                         
                        if (typeof(vm.cheque_register.notes) !== "undefined"){
                            $scope.table_data.push(["Notes",vm.cheque_register.notes]);
                        }                            
                        if (typeof(vm.cheque_register.status) !== "undefined"){
                            $scope.table_data.push(["Status",vm.cheque_register.status]);
                        }                         
                        var docDefinition = {
                          content: [
                            {
                              table: {
                                headerColumns: 1,
                                widths: [ '50%', '50%'],
                                body: $scope.table_data
                              }
                            }
                          ]
                        };            
                        pdfMake.createPdf(docDefinition).open();
                        $state.go('app.accounting.cheque-register-view', {obj:{id: $scope.data.cheque_register_id}}); 
                    }
                }
            }); 
        }
        vm.cheque_registerDataClear = function(){
            vm.cheque_register = {}
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