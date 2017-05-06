(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('viewLedgerEntryController', viewLedgerEntryController);

    /** @ngInject */
    function viewLedgerEntryController(accApi, $scope, $document, $state)
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

        $scope.ledger_entry_data = {}

        //Api Call
        var dataPromise = accApi.viewLedgerEntry($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.ledger_entry_data = result;
            console.log("$scope.ledger_entry_data",$scope.ledger_entry_data)
        }); 

        vm.editLedgerEntryPage = function(ledger_entry){
             $state.go('app.accounting.ledger-entries-edit', {obj:{ledger_entry: ledger_entry}});
        }
        vm.deleteLedgerEntry = function(id){
            var delete_ids = JSON.stringify([id])
            accApi.deleteAllLedgerEntry({ids: delete_ids})
            $state.go('app.accounting.ledger-entries'); 
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