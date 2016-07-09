(function(){
    'use strict';

    angular.module('motech-scheduler')
        .directive('collapser', function($compile) {
        return {
            restrict: 'C',
            scope: {
                collapser: '='
            },
            link: function (scope, element, attrs) {
                element.bind('click', function() {
                    var target = $(scope.collapser),
                        shown = target.hasClass('in');

                    if (shown) {
                        $(scope.collapser).collapse('toggle');
                        element.find('.fa-caret-down').removeClass("fa-caret-down").addClass("fa-caret-right");
                        target.find('.collapse').collapse('hide');
                        target.find('.fa-caret-down').removeClass("fa-caret-down").addClass("fa-caret-right");
                    } else {
                        element.find('.fa-caret-right').removeClass("fa-caret-right").addClass("fa-caret-down");
                        $(scope.collapser).collapse('toggle');
                    }
                });
            }
        };
    });

    angular.module('motech-scheduler')
        .directive("mtInvalid", function() {
        return {
            restrict: 'A',
            scope: {
                mtInvalid: '='
            },
            link: function (scope, element, attrs) {
                scope.$watch("$parent." + scope.mtInvalid, function (value) {
                    if (value === true) {
                        element.addClass("text-danger");
                    } else {
                        element.removeClass("text-danger");
                    }
                });
            }
        };
    });

    angular.module('motech-scheduler')
        .directive('schedulerFilter', ['$timeout', function (JobsService, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var elem = angular.element(element),
                    table = angular.element('#' + attrs.schedulerJqgridSearch),
                    eventType = elem.data('event-type'),
                    timeoutHnd,
                    filter = function (time) {
                        var field = elem.data('search-field'),
                            value = elem.data('search-value'),
                            type = elem.data('field-type') || 'string',
                            array = [],
                            values = {
                            'activity': 'ACTIVE,FINISHED,NOTSTARTED',
                            'status': 'OK,PAUSED,BLOCKED,ERROR'
                            },
                            prop;

                        if (type === 'array') {
                            if (elem.children().hasClass("fa-check-square-o")) {
                                elem.children().removeClass("fa-check-square-o").addClass("fa-square-o");
                            } else if (elem.children().hasClass("fa-square-o")) {
                                elem.children().removeClass("fa-square-o").addClass("fa-check-square-o");
                            }
                            angular.forEach(values[field].split(','), function (val) {
                                if (angular.element('#' + val).children().hasClass("fa-check-square-o")) {
                                    array.push(val);
                                }
                            });
                            JobsService.setParam(field, array.join(','));
                        } else {
                            JobsService.setParam(field, elem.val());
                        }
                        JobsService.fetchJobs();
                    };
                switch (eventType) {
                    case 'keyup':
                        elem.keyup(function () {
                            filter(500);
                        });
                        break;
                    case 'change':
                        elem.change(filter);
                        break;
                    default:
                        elem.click(filter);
                }
            }
        };
    }]);
}());
