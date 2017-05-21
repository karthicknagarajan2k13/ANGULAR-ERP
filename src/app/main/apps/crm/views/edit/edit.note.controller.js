(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('EditNoteController', EditNoteController);

    /** @ngInject */
    function EditNoteController($mdToast, crmApi, $scope, $window, $document, $state, Note, User, Contact_User)
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
        vm.note = $state.params.obj
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});
        vm.get_contacts = Contact_User.get_contacts({token:session.email});


        vm.updateNote = function(){
           var dataPromise = crmApi.updateNote(vm.note.note.id,vm.note);
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
                    if( typeof($scope.data.note_id) !== "undefined"){
                        $state.go('app.crm.note-detail-view', {obj:{id: $scope.data.note_id}}); 
                    }
                }
            }); 
        }
        vm.viewNotePage = function(id){
            $state.go('app.crm.note-detail-view', {obj:{id: id}}); 
        }
        vm.newNotePage = function(){
            $state.go('app.crm.note-detail-new'); 
        }
        vm.NotesPage = function(){
            $state.go('app.crm.notes'); 
        }
    }

})();