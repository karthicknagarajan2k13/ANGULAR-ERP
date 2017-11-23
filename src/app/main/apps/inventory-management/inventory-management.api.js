(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .factory('imApi', apiService);

    /** @ngInject */
    function apiService($resource,$q,$http)
    {
        var api = {};

        // Base Url
        api.baseUrl = 'https://erp-rails-app.herokuapp.com/';

        api.createCategory = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"categories.json"}).then(function(result){
               return result.data;
           });
        };
        api.getCategories = function(data) {
           return $http({method:"GET", url: api.baseUrl+"categories.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllCategory = function(data) {
           return $http({method:"GET", url: api.baseUrl+"categories/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewCategory = function(id) {
           return $http({method:"GET", url: api.baseUrl+"categories/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editCategory = function(data) {
           return $http({method:"GET", url: api.baseUrl+"categories/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateCategory = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"categories/"+id+".json"}).then(function(result){
               return result.data;
           });
        };



        api.createItem = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"items.json"}).then(function(result){
               return result.data;
           });
        };
        api.getItems = function(data) {
           return $http({method:"GET", url: api.baseUrl+"items.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllItem = function(data) {
           return $http({method:"GET", url: api.baseUrl+"items/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewItem = function(id) {
           return $http({method:"GET", url: api.baseUrl+"items/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editItem = function(data) {
           return $http({method:"GET", url: api.baseUrl+"items/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };

        
        api.updateItem = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"items/"+id+".json"}).then(function(result){
               return result.data;
           });
        };


        api.createSupplier = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"suppliers.json"}).then(function(result){
               return result.data;
           });
        };
        api.getSuppliers = function(data) {
           return $http({method:"GET", url: api.baseUrl+"suppliers.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllSupplier = function(data) {
           return $http({method:"GET", url: api.baseUrl+"suppliers/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewSupplier = function(id) {
           return $http({method:"GET", url: api.baseUrl+"suppliers/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editSupplier = function(data) {
           return $http({method:"GET", url: api.baseUrl+"suppliers/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updateSupplier = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"suppliers/"+id+".json"}).then(function(result){
               return result.data;
           });
        };


        api.createPurchaseOrder = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"purchase_orders.json"}).then(function(result){
               return result.data;
           });
        };
        api.getPurchaseOrders = function(data) {
           return $http({method:"GET", url: api.baseUrl+"purchase_orders.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.deleteAllPurchaseOrder = function(data) {
           return $http({method:"GET", url: api.baseUrl+"purchase_orders/delete_all.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.viewPurchaseOrder = function(id) {
           return $http({method:"GET", url: api.baseUrl+"purchase_orders/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.editPurchaseOrder = function(data) {
           return $http({method:"GET", url: api.baseUrl+"purchase_orders/edit_form.json",params: data}).then(function(result){
               return result.data;
           });
        };
        api.updatePurchaseOrder = function(id,data) {
           return $http({data: data, method:"PUT", url: api.baseUrl+"purchase_orders/"+id+".json"}).then(function(result){
               return result.data;
           });
        };
        api.addItemPurchaseOrder = function(data) {
           return $http({data: data, method:"POST", url: api.baseUrl+"purchase_orders/add_item.json"}).then(function(result){
               return result.data;
           });
        };

        api.getUsers = function() {
           return $http({method:"GET", url: api.baseUrl+"users/get_users.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_categories = function() {
           return $http({method:"GET", url: api.baseUrl+"categories/get_categories.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_suppliers = function() {
           return $http({method:"GET", url: api.baseUrl+"suppliers/get_suppliers.json"}).then(function(result){
               return result.data;
           });
        };
        api.get_items = function() {
           return $http({method:"GET", url: api.baseUrl+"items/get_items.json"}).then(function(result){
               return result.data;
           });
        };

        //Surendiran
        api.get_inventory_item = function(data) {
           return $http({method:"POST", url: api.baseUrl+"get_inventory_item",params: data}).then(function(result){
               return result.data;
           });
        };
            
        api.get_item_source = function(data) {
            return $http({method:"POST",url: api.baseUrl+"get_item_source",params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };

        api.get_listing = function(data) {
            return $http({method:"POST", url: api.baseUrl+"get_listing",params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };
        api.get_item_category = function(data) {
            return $http({method:"POST", url: api.baseUrl+"get_item_category", params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };
        api.show_inventory_item = function(data) {
            return $http({method:"POST", url: api.baseUrl+"show_inventory_item", params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };
         api.show_inventory_item = function(data) {
            return $http({method:"POST", url: api.baseUrl+"show_inventory_item", params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };
        api.show_listing = function(data) {
            return $http({method:"POST", url: api.baseUrl+"show_listing", params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };
        api.show_item_source = function(data) {
            return $http({method:"POST", url: api.baseUrl+"show_item_source", params:data,
                         headers: {'Content-Type': 'application/json'}}).then(function(result){
                         return result.data;
            });
        };
        
        api.create_inventory_item = function(data) {
             console.log("---"+JSON.stringify(data));
           return $http({method:"POST",
                         url: api.baseUrl+"create_inventory_item",
                         params: data,
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(result){
                         return result.data;
            });
        };
        api.edit_inventory_item = function(data) {
          console.log("---"+JSON.stringify(data));
           return $http({method:"POST",
                         url: api.baseUrl+"edit_inventory_item",
                         params: data,
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(result){
                         return result.data;
            });
        };


        api.edit_listing = function(data) {
           return $http({method:"POST",
                         url: api.baseUrl+"edit_listing",
                         params: data,
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(result){
                         return result.data;
            });
        };

        api.edit_item_source = function(data) {
          console.log("----"+JSON.stringify(data));
           return $http({method:"POST",
                         url: api.baseUrl+"edit_item_source",
                         params: data,
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(result){
                         return result.data;
            });
        };
        
        api.create_listing = function(data) {
            return $http({method:"POST",
                         url: api.baseUrl+"create_listing",
                         params: data,
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(result){
                         return result.data;
            });
        };
        api.create_item_source = function(data) {
            return $http({method:"POST",
                         url: api.baseUrl+"create_item_source",
                         params: data,
                         headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(result){
                         return result.data;
            });
        };

        api.deleteInventoryItem = function(data) {
          console.log("<-----------"+JSON.stringify(data));
           return $http({method:"POST",
                         url: api.baseUrl+"delete_inventory_item",
                         params: data}).then(function(result){
                         return result.data;
            });
        };
        api.delete_listing = function(data) {
          console.log("<-----------"+JSON.stringify(data));
            return $http({method:"POST",
                         url: api.baseUrl+"delete_listing",
                         params: data}).then(function(result){
                         return result.data;
            });
        };
        api.delete_item_source = function(data) {
          console.log("<-----------"+JSON.stringify(data));
          console.log(data)
            return $http({method:"POST",
                         url: api.baseUrl+"delete_item_source",
                         params: data}).then(function(result){
                         return result.data;
            });
        };
        api.show_inventory_item = function(data) {
            return $http({method:"POST",
                         url: api.baseUrl+"show_inventory_item",
                         params: data}).then(function(result){
                         return result.data;
            });
        };
        api.show_listing = function(data) {
            return $http({method:"POST",
                         url: api.baseUrl+"show_listing",
                         params: data}).then(function(result){
                         return result.data;
            });
        };
        api.show_item_source = function(data) {
            return $http({method:"POST",
                         url: api.baseUrl+"show_item_source",
                         params: data}).then(function(result){
                         return result.data;
            });
        };
        api.getItemSourceData = function(data) {
          console.log("-----"+JSON.stringify(data));
            return $http({method:"POST",
                         url: api.baseUrl+"search_item_source",
                         params: data}).then(function(result){
                         return result.data;
            });
        };

        api.getSearchListingItems  = function(data) {
            console.log("-----"+JSON.stringify(data));
            return $http({method:"POST",
                         url: api.baseUrl+"search_listing",
                         params: data }).then(function(result){
                         return result.data;
            });
        };
        api.getSearchInventoryItems  = function(data) {
            console.log("-----"+JSON.stringify(data));
            return $http({method:"POST",
                         url: api.baseUrl+"search_inventory_item",
                         params: data }).then(function(result){
                         return result.data;
            });
        };



        
        return api;
    }

})();