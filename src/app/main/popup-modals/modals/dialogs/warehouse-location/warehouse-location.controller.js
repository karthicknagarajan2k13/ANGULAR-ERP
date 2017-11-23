(function ()
{
    'use strict';

    angular
        .module('app.popup-modals.modals')
        .controller('CustomThemeDialogController', CustomThemeDialogController);

    /** @ngInject */
    function CustomThemeDialogController(fuseTheming, $mdDialog, fuseGenerator, $cookies, $window)
    {
        // Data
        var vm = this;
        vm.palettes = fuseTheming.getRegisteredPalettes();
        vm.themes = fuseTheming.getRegisteredThemes();

        // Delete Unnecessary hue value
        delete vm.palettes.grey['1000'];

        // Methods
        vm.rgba = fuseGenerator.rgba;
        vm.setTheme = setTheme;
        vm.closeDialog = closeDialog;

        //////////
        function setTheme()
        {
            $cookies.putObject('customTheme', vm.theme);
            $cookies.put('selectedTheme', 'custom');
            $window.location.reload();
        }

        /**
         * Close dialog
         */
        function closeDialog()
        {
            $mdDialog.hide();
        }
    }
})();