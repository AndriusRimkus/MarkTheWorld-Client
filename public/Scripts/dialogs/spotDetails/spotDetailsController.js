/*global module */
'use strict';

function spotDetailsController($mdDialog, config, $http, mapService, filterMapEventService) {
    var vm = this;

    vm.cancel = function () {
        $mdDialog.cancel();
    };

    vm.userMap = function (username) {
        mapService.mapFilter.filter = username;
        mapService.updateMap();
        filterMapEventService.emit(true);
        vm.cancel();
    };

    $http.get(config.serviceUrl + '/api/square/' + vm.id).then(
        function (success) {
            vm.spotDetails = success.data;
        },
        function (error) {
            console.log('error', error);
        }
    );
}

module.exports = ['$mdDialog', 'config', '$http', 'mapService', 'filterMapEventService', spotDetailsController];