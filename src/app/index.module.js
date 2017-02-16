(function ()
{
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [

            // Common 3rd Party Dependencies
            'uiGmapgoogle-maps',
            'textAngular',
            'xeditable',
            'Devise',
            'ng-token-auth',

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Apps
			'app.crm',
			'app.order-management',
			'app.inventory-management',
			'app.hr',
			'app.warehouse-management',
			'app.manufacturing',
			'app.knowledge-base',
			
			//pages
			'app.pages'
        ]);
})();
