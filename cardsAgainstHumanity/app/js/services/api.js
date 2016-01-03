app.service('api', ['$http', '$rootScope', function($http, $root) {

    var base = 'http://games.wattydev.com/cardsAgainstHumanity/api';
    function _put(uri, payload, params) {
        return $http.put(base + uri + '.php', payload, {params:params});
    }
    function _get(uri, params) {
        return $http.get(base + uri + '.php', {params:params});
    }
    function _post(uri, payload) {
        return $http.get(base + uri + '.php', payload);
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
        },
        joinGame: function(id,username,userid) {
            return _get('/joinGame',
                {
                    id: id,
                    username: username,
                    userid: userid
                }
            );
        },
        sendMessage: function(data) {
            return _post('/sendMessage',data);
        }
    };
}]);
