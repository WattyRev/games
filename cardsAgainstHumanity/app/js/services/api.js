app.service('api', ['$http', '$rootScope', function($http, $root) {

    var base = 'http://games.wattydev.com/cardsAgainstHumanity/api';
    function _put(uri, payload, params) {
        return $http.put(base + uri + '.php', payload, {params:params});
    }
    function _get(uri, params) {
        return $http.get(base + uri + '.php', {params:params});
    }
    function _post(uri, payload) {
        return $http.post(base + uri + '.php', payload);
    }

    return {
        update: function() {
            return _put('/update', $session.model, {});
        },
        createGame: function(name) {
            return _get('/newGame',
                {
                    host: $root.userId,
                    nickname: name || util.makeId()
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
        },
        startGame: function(id) {
            return _post('/startGame',{id:id});
        },
        nextRound: function(gameId, czarId) {
            var data = {
                gameId: gameId
            };
            if (czarId) {
                data.czarId = czarId;
            }
            return _post('/nextRound', data);
        },
        sendCards: function(gameId, userId, cards) {
            var data = {
                gameId: gameId,
                userId: userId,
                cards: []
            };
            if (cards[0].text) {
                cards.forEach(function(card) {
                    data.cards.push(card.text);
                });
            } else {
                data.cards = cards;
            }
            return _post('/sendCards', data);
        }
    };
}]);
