(function ()
{
    'use strict';

    angular
        .module('fuse')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig(AuthProvider, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider)
    {
        $locationProvider.html5Mode(true);
        
        AuthProvider.loginPath('https://erp-rails.herokuapp.com/users.json');
        AuthProvider.registerPath('https://erp-rails.herokuapp.com/auth_users.json');
        AuthProvider.sendResetPasswordInstructionsPath('https://erp-rails.herokuapp.com/auth_users/password.json');
        AuthProvider.resetPasswordPath('https://erp-rails.herokuapp.com/auth_users/password.json');
        AuthProvider.logoutPath('https://erp-rails.herokuapp.com/users/logout');

        AuthProvider.resetPasswordMethod('PUT');
        AuthProvider.sendResetPasswordInstructionsMethod('POST');
        AuthProvider.loginMethod('POST');
        AuthProvider.logoutMethod('GET');

        AuthProvider.resourceName('user');

        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;

        $urlRouterProvider.otherwise('/');


        /**
         * Layout Style Switcher
         *
         * This code is here for demonstration purposes.
         * If you don't need to switch between the layout
         * styles like in the demo, you can set one manually by
         * typing the template urls into the `State definitions`
         * area and remove this code
         */
        // Inject $cookies
        var $cookies;

        angular.injector(['ngCookies']).invoke([
            '$cookies', function (_$cookies)
            {
                $cookies = _$cookies;
            }
        ]);

        // Get active layout
        var layoutStyle = $cookies.get('layoutStyle') || 'verticalNavigationFullwidthToolbar2';

        var layouts = {
            
            verticalNavigationFullwidthToolbar2  : {
                main      : 'app/core/layouts/vertical-navigation-fullwidth-toolbar-2.html',
                toolbar   : 'app/toolbar/layouts/vertical-navigation-fullwidth-toolbar-2/toolbar.html',
                navigation: 'app/navigation/layouts/vertical-navigation-fullwidth-toolbar-2/navigation.html'
            }
        };
        // END - Layout Style Switcher

        // State definitions
        $stateProvider
            .state('app', {
                abstract: true,
                views   : {
                    'main@'         : {
                        templateUrl: layouts[layoutStyle].main,
                        controller : 'MainController as vm'
                    },
                    'toolbar@app'   : {
                        templateUrl: layouts[layoutStyle].toolbar,
                        controller : 'ToolbarController as vm'
                    },
                    'navigation@app': {
                        templateUrl: layouts[layoutStyle].navigation,
                        controller : 'NavigationController as vm'
                    }
                }
            });
    }

})();