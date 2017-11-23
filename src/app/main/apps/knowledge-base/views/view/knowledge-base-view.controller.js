(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('viewKnowledgeBasesController', viewKnowledgeBasesController);

    /** @ngInject */
    function viewKnowledgeBasesController(kbApi, $scope, $document, $state)
    {
        var vm = this;
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
        
        vm.ssName = "s"

        //Api Call
        var dataPromise = kbApi.viewKnowledgeBase($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.knowledge_base_data = result; 
        }); 

        vm.editKnowledgeBasePage = function(knowledge_base){
             $state.go('app.knowledge-base.knowledge-base-edit', {obj:{knowledge_base: knowledge_base}});
        }
        vm.deleteKnowledgeBase = function(id){
            var delete_ids = JSON.stringify([id])
            kbApi.deleteAllKnowledgeBase({ids: delete_ids})
            $state.go('app.knowledge-base.knowledge-base'); 
        }
        vm.newKnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base-new'); 
        }
        vm.KnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base'); 
        }
    }
})();