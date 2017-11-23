(function ()
{
    'use strict';

    angular
        .module('app.popup-modals', [
            'app.popup-modals.modals'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // // Navigation
        // msNavigationServiceProvider.saveItem('popup-modals', {
        //     title : 'Popup Modals',
        //     group : true,
        //     weight: 3
        // });

        // msNavigationServiceProvider.saveItem('popup-modals.modals', {
        //     title: 'Warehouse Location Popup',
        //     icon : 'icon-arrange-send-backward',
        //     state: 'app.warehouse-location'
        // });
		
	}
})();