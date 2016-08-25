
'use strict';

var authJWT = angular.module('authJWT', []);

authJWT.controller('AuthController', ['$scope','$auth', '$state', '$http', '$rootScope', function AuthController($scope, $auth, $state, $http, $rootScope) {

    $scope.loginError = false;
    $scope.loginErrorText;

    $scope.login = function() {

        var credentials = {
            email: $scope.email,
            password: $scope.password,
            provider: 'email'
        }

        $auth.login(credentials).then(function(response) {

            var token = JSON.stringify(response.data.token);

            localStorage.setItem('token', token);
            $rootScope.authenticated = true;
            $rootScope.token = response.data.token;

            $state.go('home');
            
        }, function(error) {
            $scope.loginError = true;
            $scope.loginErrorText = error.data.error;
        });
    }
}]);

authJWT.factory('Auth', ['$http', '$localStorage', 'urls', function ($http, $localStorage, urls) {
    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getClaimsFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var tokenClaims = getClaimsFromToken();

    return {
        signup: function (data, success, error) {
            $http.post(urls.BASE + '/api/login', data).success(success).error(error)
        },
        signin: function (data, success, error) {
            $http.post(urls.BASE + '/api/register', data).success(success).error(error)
        },
        logout: function (success) {
            tokenClaims = {};
            delete $localStorage.token;
            success();
        },
        getTokenClaims: function () {
            return tokenClaims;
        }
    };
}
]);

authJWT.factory('CONFIG',['$rootScope', function($rootScope) {

    return {
        API_BASE: $rootScope.rootUrl + '/api/'
    }

}]);

authJWT.factory('urls',['CONFIG', function(RESOURCES) {
    
    return {
        shows: CONFIG.API_BASE + "shows",
    };

}]);

authJWT.factory('API', ['$resource', '$http', 'urls', function ($resource, $http, urls) {

    return {
        Shows: $resource(urls.shows)
    };

}]);



