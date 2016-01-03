app.service('api', ['$http', '$rootScope', function($http, $root) {

    var base = 'http://games.wattydev.com/cardsAgainstHumanity/api';
    function _put(uri, payload, params) {
        return $http.put(base + uri + '.php', payload, {params:params});
    }
    function _get(uri, params) {
        return $http.get(base + uri + '.php', {params:params});
    }

    return {
        update: function() {
            return _put('/update', $session.model, {});
        },
        createGame: function() {
            return _get('/newGame',
                {
                    host: $root.userId,
                    nickname: util.makeId()
                }
            );
        }
    };
}]);
