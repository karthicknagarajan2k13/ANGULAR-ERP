(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('ViewNoteController', ViewNoteController);

    /** @ngInject */
    function ViewNoteController($scope, $document, $state, Note)
    {
        
		
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
		
		vm.ssName = "s"
	    vm.note_data = Note.get({id:$state.params.obj.id});
        console.log(vm.note_data)

        vm.editNotePage = function(note){
             $state.go('app.crm.note-detail-edit', {obj:{note: note}});
        }
        vm.deleteNote = function(id){
            var response = Note.delete({id:id})
            $state.go('app.crm.notes');
        }
        vm.newNotePage = function(){
            $state.go('app.crm.note-detail-new'); 
        }
        vm.NotesPage = function(){
            $state.go('app.crm.notes'); 
        }
        
    }
})();