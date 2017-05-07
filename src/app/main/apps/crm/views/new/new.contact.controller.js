(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('NewContactController', NewContactController);

    /** @ngInject */
    function NewContactController(crmApi, $scope, $window, $document, $state, User)
    {
        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
        vm.contact = {}
        vm.contact.contact_attributes = {}
        console.log("$state.params.customer_id",$state.params.customer_id)
        vm.contact.contact_attributes.customer_id = $state.params.customer_id
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});
        console.log("vm.get_customers",vm.get_customers)
        vm.saveContact = function(){
            var dataPromise = crmApi.createContact({contact:vm.contact});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
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
