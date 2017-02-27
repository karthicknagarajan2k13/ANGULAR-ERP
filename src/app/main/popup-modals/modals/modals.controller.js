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
		vm.test = test;
		vm.market = market;
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
		
		function test(ev)
        {
            $mdDialog.show({
                controller         : 'CustomThemeDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/popup-modals/modals/dialogs/warehouse-location/manage-sales-event.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }
		
		function market(ev)
        {
            $mdDialog.show({
                controller         : 'CustomThemeDialogController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/popup-modals/modals/dialogs/warehouse-location/marketpalce-option.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true
            });
        }

    }
})();


