(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('editLedgerEntryController', editLedgerEntryController);

    /** @ngInject */
    function editLedgerEntryController(omApi,crmApi,accApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.ledger_entry = $state.params.obj

        vm.ssName = "s"

        var dataPromise = crmApi.get_customers({});
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
        });
        var dataPromise = accApi.get_accounts({});
        dataPromise.then(function(result) { 
            $scope.get_accounts = result;
        });
        var dataPromise = omApi.get_invoices({});
        dataPromise.then(function(result) { 
            $scope.get_invoices = result;
        });

        vm.updateLedgerEntry = function(){
           var dataPromise = accApi.updateLedgerEntry(vm.ledger_entry.ledger_entry.id,vm.ledger_entry);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.ledger_entry_id) !== "undefined"){
                        $state.go('app.accounting.ledger-entries-view', {obj:{id: $scope.data.ledger_entry_id}}); 
                    }
                }
            }); 
        }
        vm.viewLedgerEntryPage =function(id){
            $state.go('app.accounting.ledger-entries-view', {obj:{id: id}}); 
        }
        vm.newLedgerEntryPage = function(){
            $state.go('app.accounting.ledger-entries-new'); 
        }
        vm.LedgerEntrysPage = function(){
            $state.go('app.accounting.ledger-entries'); 
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