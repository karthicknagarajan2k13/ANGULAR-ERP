(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('editKnowledgeBasesController', editKnowledgeBasesController);

    /** @ngInject */
    function editKnowledgeBasesController($mdToast,kbApi, $scope, $document, $state)
    {
		
		$scope.isOpen = false;
		  $scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		  };
        var vm = this;
        vm.product = {}
        
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
        var dataPromise = kbApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        });
        var dataPromise = kbApi.get_kb_categories({});
        dataPromise.then(function(result) { 
            $scope.get_kb_categories = result;
        });


        vm.knowledge_base = $state.params.obj

        
        vm.updateKnowledgeBase = function(){
           var dataPromise = kbApi.updateKnowledgeBase(vm.knowledge_base.knowledge_base.id,vm.knowledge_base);
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
                    if( typeof($scope.data.knowledge_base_id) !== "undefined"){
                        $state.go('app.knowledge-base.knowledge-base-view', {obj:{id: $scope.data.knowledge_base_id}}); 
                    }
                }
            }); 
        }
        vm.viewKnowledgeBasePage =function(id){
            $state.go('app.knowledge-base.knowledge-base-view', {obj:{id: id}}); 
        }
        vm.newKnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base-new'); 
        }
        vm.KnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base'); 
        }


        // Data
        vm.taToolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent', 'html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
        ];
        vm.categoriesSelectFilter = '';
        vm.ngFlowOptions = {
            // You can configure the ngFlow from here
            /*target                   : 'api/media/image',
             chunkSize                : 15 * 1024 * 1024,
             maxChunkRetries          : 1,
             simultaneousUploads      : 1,
             testChunks               : false,
             progressCallbacksInterval: 1000*/
        };
        vm.ngFlow = {
            // ng-flow will be injected into here through its directive
            flow: {}
        };
        vm.dropping = false;

        // Methods
        vm.gotoProducts = gotoProducts;
        vm.onCategoriesSelectorOpen = onCategoriesSelectorOpen;
        vm.onCategoriesSelectorClose = onCategoriesSelectorClose;
        vm.fileAdded = fileAdded;
        vm.upload = upload;
        vm.fileSuccess = fileSuccess;

        //////////

        init();

        /**
         * Initialize
         */
        function init()
        {
            // Select the correct product from the data.
            // This is an unnecessary step for a real world app
            // because normally, you would request the product
            // with its id and you would get only one product.
            // For demo purposes, we are grabbing the entire
            // json file which have more than one product details
            // and then hand picking the requested product from
            // it.
            var id = $state.params.id;

            for ( var i = 0; i < vm.product.length; i++ )
            {
                if ( vm.product[i].id === parseInt(id) )
                {
                    vm.product = vm.product[i];
                    break;
                }
            }
            // END - Select the correct product from the data
        }

        /**
         * Go to products page
         */
        function gotoProducts()
        {
            $state.go('app.warehouse-management.stock-locations-edit');
        }

        /**
         * On categories selector open
         */
        function onCategoriesSelectorOpen()
        {
            // The md-select directive eats keydown events for some quick select
            // logic. Since we have a search input here, we don't need that logic.
            $document.find('md-select-header input[type="search"]').on('keydown', function (e)
            {
                e.stopPropagation();
            });
        }

        /**
         * On categories selector close
         */
        function onCategoriesSelectorClose()
        {
            // Clear the filter
            vm.categoriesSelectFilter = '';

            // Unbind the input event
            $document.find('md-select-header input[type="search"]').unbind('keydown');
        }

        /**
         * File added callback
         * Triggers when files added to the uploader
         *
         * @param file
         */
        function fileAdded(file)
        {
            // Prepare the temp file data for media list
            var uploadingFile = {
                id  : file.uniqueIdentifier,
                file: file,
                type: 'uploading'
            };

            // Append it to the media list
            vm.product.images.unshift(uploadingFile);
        }

        /**
         * Upload
         * Automatically triggers when files added to the uploader
         */
        function upload()
        {
            // Set headers
            vm.ngFlow.flow.opts.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                //'X-XSRF-TOKEN'    : $cookies.get('XSRF-TOKEN')
            };

            vm.ngFlow.flow.upload();
        }
        function fileSuccess(file, message)
        {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }


    }
})();