/*global module */
'use strict';

import template from './claimSpot.html';
import './claimSpot.scss';

function claimSpotService($mdDialog, config, $q, $http, userService, Upload) {
    return {
        showDialog: function (ev) {
            $mdDialog.show({
                controller: 'claimSpotController',
                controllerAs: 'vm',
                template: template,
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: true,
                focusOnOpen: false,
                clickOutsideToClose: true
            });
        },

        claim: function (file, message) {
            var deferredObject = $q.defer();

            if (!file) {
                $http.post(config.serviceUrl + '/api/Dot',
                    {
                        "token": userService.token,
                        "lat": userService.currentPosition.lat,
                        "lng": userService.currentPosition.lng,
                        "message": message
                    }).then(
                    function (success) {
                        deferredObject.resolve(success);
                    },
                    function (error) {
                        deferredObject.reject(error);
                    }
                );
            } else {
                Upload.upload({
                    url: config.serviceUrl + 'api/dotPhoto',
                    data: {
                        file: file,
                        token: userService.token,
                        lat: userService.currentPosition.lat,
                        lng: userService.currentPosition.lng,
                        message: message
                    }
                }).then(
                    function (success) {
                        deferredObject.resolve(success);
                    },
                    function (error) {
                        deferredObject.reject(error);
                    }
                );
            }

            return deferredObject.promise;
        }
    };
}

module.exports = ['$mdDialog', 'config', '$q', '$http', 'userService', 'Upload', claimSpotService];
