app.service('gameService', ['sse', 'api', '$q', '$rootScope', function($sse, $api, $q, $root) {
    var service = {
        // Variables
            data: {},
            games: {},

        // Functions
            newGame: function() {
                var self = this;
                return $q(function(resolve, reject){
                    var id;
                    $api.createGame().then(function(response) {
                        id = response.data;
                        self.connect(id);
                        resolve(id);
                    });
                });
            },
            joinGame: function(id,username,userid) {
                var self = this;
                return $q(function(resolve, reject) {
                    $api.joinGame(id,username,userid).then(function(response) {
                        self.connect(id);
                        resolve();
                    });
                });
            },
            connect: function(id) {
                if (!this.data.id) {
                    $sse.openStream(id);
                }
            }
    };

    // Listeners
        $root.$on('gameUpdate', function(event, message) {
            service.data = new Game(message.data);
        });
        $root.$on('statusUpdate', function(event, message) {
            console.log('status', message);
            service.games = JSON.parse(message.data).games;
        });

    return service;
}]);
