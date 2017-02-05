(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('NewNoteController', NewNoteController);

    /** @ngInject */
    function NewNoteController(crmApi, $scope, $window, $document, $state, Notes, User, Contact_User)
    {
        var vm = this;
        vm.note = {}
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});
        vm.get_contacts = Contact_User.get_contacts({token:session.email});

        vm.saveNote = function(){
            var dataPromise = crmApi.createNote({note:vm.note});
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
        vm.noteDataClear = function(){
            vm.note = {}
        }
    }

})();