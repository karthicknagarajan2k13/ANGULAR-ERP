(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('EditNoteController', EditNoteController);

    /** @ngInject */
    function EditNoteController(crmApi, $scope, $window, $document, $state, Note, User, Contact_User)
    {
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
                    console.log("response",$scope.data.message)
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
    }

})();