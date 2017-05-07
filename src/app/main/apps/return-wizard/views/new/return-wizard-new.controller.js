(function ()
{
    'use strict';

    angular
        .module('app.return-wizard')
        .controller('newReturnWizardController', newReturnWizardController);

    /** @ngInject */
    function newReturnWizardController(omApi,crmApi,rwApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.return_wizard = {}
        vm.ssName = "s"

        var dataPromise = crmApi.get_customers({});
        dataPromise.then(function(result) { 
            $scope.get_customers = result;
        });
        var dataPromise = omApi.get_invoices({});
        dataPromise.then(function(result) { 
            $scope.get_invoices = result;
        });

        vm.saveReturnWizard = function(){
            var dataPromise = rwApi.createReturnWizard({return_wizard:vm.return_wizard});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.return_wizard_id) !== "undefined"){
                        $state.go('app.return-wizard.return-wizard-view', {obj:{id: $scope.data.return_wizard_id}}); 
                    }
                }
            }); 
        }
        vm.return_wizardDataClear = function(){
            vm.return_wizard = {}
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