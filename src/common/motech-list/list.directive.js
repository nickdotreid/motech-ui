(function () {
    'use strict';

    angular.module('motech-common')
        .directive('motechList', list);

    /**
     * @memberOf motech-common
     * @ngdoc directive
     * @name  motechList
     *
     * @description 
     * Creates the frame around a list of objects which are rendered inside a transclude block. This directive exposes scope variables that can be used to set or get the state of the list.
     *
     * The list has transcluded blocks for header and footer elements, along with the main list portion.
     * 
     */

    list.$inject = [];
    function list(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: {
                'header': '?motechListHeader',
                'footer': '?motechListFooter'
            },
            templateUrl: '/common/motech-list/list.html',
            scope: {
                loading: '=',
                sortIndex: '=',
                sortDesc: '=',
                changeSort: '&'
            },
            controller: 'MotechListController',
            controllerAs: 'MotechListCtrl'
        };
    }
    
})();