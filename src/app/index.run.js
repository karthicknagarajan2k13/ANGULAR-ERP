(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */
    function runBlock( Auth, $rootScope, $timeout, $state, editableThemes, $window)
    {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $state.go('app.pages_auth_login');
        });

        // 3rd Party Dependencies
        editableThemes.default.submitTpl = '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>';
        editableThemes.default.cancelTpl = '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams)
        {
            $rootScope.loadingProgress = true;
            var localStorage = $window.JSON.parse($window.localStorage.getItem('current_user'))
            if (toState.loginRequired && localStorage === null){
                $state.go('app.pages_auth_login');
            }
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();