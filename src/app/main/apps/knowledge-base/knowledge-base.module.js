(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base',[
                // 3rd Party Dependencies
                'datatables',
                'flow',
                'nvd3',
                'textAngular',
                'uiGmapgoogle-maps',
                'xeditable'
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.knowledge-base', {
                abstract: true,
                url     : '/knowledge-base'
            })
			
			.state('app.knowledge-base.kb-categories', {
                url      : '/kb-categories',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/pages/kb-categories.html',
                        controller : 'KbCategoriesController as vm'
                    }
                },
                bodyClass: 'knowledge-base'
            })
			 
			.state('app.knowledge-base.knowledge-base', {
                url      : '/knowledge-base',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/pages/knowledge-base.html',
                        controller : 'KnowledgeBasesController as vm'
                    }
                },
                bodyClass: 'knowledge-base'
            })
			
			.state('app.knowledge-base.kb-categories-edit', {
                url      : '/kb-categories-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/edit/kb-categories-edit.html',
                        controller : 'editKbCategoriesController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })

            .state('app.knowledge-base.kb-categories-new', {
                url      : '/kb-categories-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/new/kb-categories-new.html',
                        controller : 'newKbCategoriesController as vm'
                    }
                },
                bodyClass: 'kb'
            })

			.state('app.knowledge-base.knowledge-base-edit', {
                url      : '/knowledge-base-edit',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/edit/knowledge-base-edit.html',
                        controller : 'editKnowledgeBasesController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })

            .state('app.knowledge-base.knowledge-base-new', {
                url      : '/knowledge-base-new',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/new/knowledge-base-new.html',
                        controller : 'newKnowledgeBasesController as vm'
                    }
                },
                params: {
                 kb_category_id: null
                },
                bodyClass: 'kb'
            })

			.state('app.knowledge-base.kb-categories-view', {
                url      : '/kb-categories-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/view/kb-categories-view.html',
                        controller : 'viewKbCategoriesController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })
			
			.state('app.knowledge-base.knowledge-base-view', {
                url      : '/knowledge-base-view',
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/apps/knowledge-base/views/view/knowledge-base-view.html',
                        controller : 'viewKnowledgeBasesController as vm'
                    }
                },
                params: {
                 obj: null
                },
                bodyClass: 'kb'
            })
			 
        // Navigation
		
        msNavigationServiceProvider.saveItem('apps.knowledge-base', {
            title : 'Knowledge Base',
            icon  : 'icon-question-mark-circle',
            weight: 2
        });
		
		msNavigationServiceProvider.saveItem('apps.knowledge-base.kb-categories', {
            title: 'KB Categories',
            state: 'app.knowledge-base.kb-categories'
        });
		
		msNavigationServiceProvider.saveItem('apps.knowledge-base.knowledge-base', {
            title: 'Knowledge Base',
            state: 'app.knowledge-base.knowledge-base'
        }); 
		
		
    }
})();