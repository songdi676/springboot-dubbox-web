(function () {
    'use strict';

    angular.module('app')
        .service('MachineService', MachineService);

    MachineService.$inject = ['$http', '$q','APP_CONST'];
    function MachineService($http, $q,APP_CONST) {

        this.machineList = function machineList() {
            var d = $q.defer();
            $http.get(APP_CONST.PROPERTY.API_URL + "/machine/monitor")
                .success(function (data) {
                    console.log(data);
                    d.resolve(data);
                })
                .error(function () {
                    d.reject();
                });
            return d.promise;
        }

    }
})();