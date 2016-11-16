/*global module */
'use strict';

function uniqueUsernameDirective($q, config, $timeout, $http) {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, ctrl) {
            var config = scope.$eval(attr.uniqueUsername);
            var delay = config.delay;

            function doAsyncValidation(modelValue) {
                var deferredObject = $q.defer();

                $http.get(config.serviceUrl + 'api/username/' + modelValue)
                    .then(function (response) {
                        if (response.data === true) {
                            deferredObject.resolve();
                        }
                        else {
                            deferredObject.reject();
                        }
                    },
                    function () {
                        deferredObject.reject();
                    });

                return deferredObject.promise;
            }

            var pendingValidation;

            ctrl.$asyncValidators.unique = function (modelValue) {
                if (pendingValidation) {
                    $timeout.cancel(pendingValidation);
                }

                pendingValidation = $timeout(function () {
                    pendingValidation = null;
                    return doAsyncValidation(modelValue);
                }, delay);

                return pendingValidation;
            };

        }
    };
}

module.exports = ['$q', 'config', '$timeout', '$http', uniqueUsernameDirective];