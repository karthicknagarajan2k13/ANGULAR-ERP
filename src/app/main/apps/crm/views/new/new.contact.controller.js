(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('NewContactController', NewContactController);

    /** @ngInject */
    function NewContactController($mdToast,crmApi, $scope, $window, $document, $state, User)
    {
        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };

		var vm = this;
        vm.contact = {}
        vm.contact.contact_attributes = {}
        vm.contact.contact_attributes.customer_id = $state.params.customer_id
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});
        vm.saveContact = function(){
            var dataPromise = crmApi.createContact({contact:vm.contact});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.contact_id) !== "undefined"){
                        $state.go('app.crm.contact-detail-view', {obj:{id: $scope.data.contact_id}}); 
                    }
                }
            }); 
        }
        vm.contactDataClear = function(){
            vm.contact = {}
        }
        vm.newContactPage = function(){
            console.log("===state")
            $state.go('app.crm.contact-detail-new'); 
        }
        vm.ContactsPage = function(){
            $state.go('app.crm.contacts'); 
        }
        
    }

})();
