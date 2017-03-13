(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('ManageSalesEventController', ManageSalesEventController);

    /** @ngInject */
    function ManageSalesEventController(account_id, fuseTheming, mdDialog, $document, $window, omApi, $scope, $state)
    {

        var vm = this;
        console.log("account",account_id)

        var dataPromise = omApi.viewAccount(account_id);
        dataPromise.then(function(result) { 
            vm.account = result;
            angular.forEach(vm.account.sale_events_attributes, function (sale_event) {
                sale_event.start_date =new Date(sale_event.start_date);
                sale_event.end_date = new Date(sale_event.end_date);
                sale_event.is_delete =false
            });
        }); 

        vm.themes = fuseTheming.themes;
        
        var dataPromise = omApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 

        vm.updateOptionAccount = function(){
           var dataPromise = omApi.updateAccount(vm.account.id,vm.account);
            dataPromise.then(function(result) { 
                $scope.data = result;
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.account_id) !== "undefined"){
                        mdDialog.hide();
                    }
                }
            }); 
        }
        vm.closeDialog = function(){
           mdDialog.hide();
        }
        vm.add_category_event = function(category){
            var category = angular.fromJson(category)
            vm.account.sale_events_attributes.push({
                category: category.name,
                category_id: category.category_id,
                start_date: vm.category.start_date,
                end_date :vm.category.end_date,
                discount_percent :vm.category.discount_percent,
                is_delete: false,
            })
        }
        vm.delete_category_event = function(category_event){
            category_event.is_delete = true
        }
    }
})();