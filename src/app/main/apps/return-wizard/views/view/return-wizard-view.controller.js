(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .controller('viewReturnWizardController', viewReturnWizardController);

    /** @ngInject */
    function viewReturnWizardController(rwApi, $scope, $document, $state)
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

        $scope.return_wizard_data = {}

        //Api Call
        var dataPromise = rwApi.viewReturnWizard($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.return_wizard_data = result;
            console.log("$scope.return_wizard_data",$scope.return_wizard_data)
        }); 

        vm.editReturnWizardPage = function(return_wizard){
             $state.go('app.return-wizard.return-wizard-edit', {obj:{return_wizard: return_wizard}});
        }
        vm.deleteReturnWizard = function(id){
            var delete_ids = JSON.stringify([id])
            rwApi.deleteAllReturnWizard({ids: delete_ids})
            $state.go('app.return-wizard.return-wizard'); 
        }
        vm.newReturnWizardPage = function(){
            $state.go('app.return-wizard.return-wizard-new'); 
        }
        vm.ReturnWizardsPage = function(){
            $state.go('app.return-wizard.return-wizard'); 
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