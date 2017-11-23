(function ()
{
    'use strict';

    angular
        .module('app.popup-modals.modals', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider)
    {
        $stateProvider.state('app.warehouse-location', {
            url      : '/popup-modals/modals',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/popup-modals/modals/warehouse-location.html',
                    controller : 'modalsController as vm'
                }
            },
            bodyClass: 'warehouse-location'
        });
				
    }

})();