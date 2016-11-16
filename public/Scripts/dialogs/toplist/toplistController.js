/*global module */
'use strict';

function toplistController($mdDialog, config, countries, $q, $http) {
    var vm = this;
    vm.countries = countries;

    vm.cancel = function () {
        $mdDialog.cancel();
    };

    getToplist();

    function getToplist () {
        var address = config.serviceUrl + '/api/topList?countryCode=&number=5&startingPage=1';

        $http.post(address).then(
            function (success) {
                console.log(success);
            },
            function (error) {
                console.log('error', error);
            }
        );
    }

}

module.exports = ['$mdDialog', 'config', 'countries', '$q', '$http', toplistController];