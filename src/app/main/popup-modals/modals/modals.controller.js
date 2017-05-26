(function ()
{
    'use strict';

    angular
        .module('app.popup-modals.modals')
        .controller('modalsController', modalsController);

    /** @ngInject */
    function modalsController(fuseTheming, $mdDialog, $document)
    {
        var vm = this;
		
		
        // Data
        vm.themes = fuseTheming.themes;

        // Methods
        vm.createTheme = createTheme;

        //////////

        function createTheme(ev)
        {
            $mdDialog.show({
                controller         : 'CustomThemeDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/popup-modals/modals/dialogs/warehouse-location/warehouse-location.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

    }
})();


