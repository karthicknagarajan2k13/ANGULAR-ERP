(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('SalesOrdersviewController', SalesOrdersviewController);

    /** @ngInject */
    function SalesOrdersviewController($scope, $document, $state)
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