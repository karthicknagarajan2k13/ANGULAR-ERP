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
        $scope.table_data = []
        
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
        vm.print = function(){
            if (typeof($scope.cheque_register_data.cheque_register_id) !== "undefined"){
                $scope.table_data.push(["Code",$scope.cheque_register_data.cheque_register_id]);
            }
            if (typeof($scope.cheque_register_data.cheque_date) !== "undefined"){
                $scope.table_data.push(["Date",$scope.cheque_register_data.cheque_date]);
            }
            if (typeof($scope.cheque_register_data.payee) !== "undefined"){
                $scope.table_data.push(["Payee",$scope.cheque_register_data.payee]);
            }
            if (typeof($scope.cheque_register_data.debit) !== "undefined"){
                $scope.table_data.push(["Debit",$scope.cheque_register_data.debit]);
            }                          
            if (typeof($scope.cheque_register_data.credit) !== "undefined"){
                $scope.table_data.push(["Credit",$scope.cheque_register_data.credit]);
            }                         
            if (typeof($scope.cheque_register_data.notes) !== "undefined"){
                $scope.table_data.push(["Notes",$scope.cheque_register_data.notes]);
            }                            
            if (typeof($scope.cheque_register_data.status) !== "undefined"){
                $scope.table_data.push(["Status",$scope.cheque_register_data.status]);
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
            $scope.table_data = []          
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