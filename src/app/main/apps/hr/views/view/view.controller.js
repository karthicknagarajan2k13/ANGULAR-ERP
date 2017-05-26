(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('hrviewController', hrviewController);

    /** @ngInject */
    function hrviewController($document, $state)
    {

        
		
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;
		
		vm.ssName = "s"
    }
})();