(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('EditContactController', EditContactController);

    /** @ngInject */
    function EditContactController(crmApi, $scope, $window, $document, $state, Contact_form, User)
    {
        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
        vm.contact = Contact_form.edit_form({id:$state.params.obj.contact.id});
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});

        vm.updateContact = function(){
           var dataPromise = crmApi.updateContact(vm.contact.id,vm.contact);
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

        vm.viewContactPage = function(id){
            $state.go('app.crm.contact-detail-view', {obj:{id: id}}); 
        }
        vm.newContactPage = function(){
            console.log("===state")
            $state.go('app.crm.contact-detail-new'); 
        }
    }

})();
