app.service('api', ['$http', 'sessionService', function($http, $session) {

    var base = 'http://games.wattydev.com/cardsAgainstHumanity';
    function _put(uri, payload, params) {
        return $http.put(base + uri + '.php', payload, {params:params});
    }

    return {
        update: function() {
            return _put('/update', $session.model, {});
        }
    };
}]);
