app.service('gameService', ['sse', 'api', '$q', '$rootScope', function($sse, $api, $q, $root) {
    var service = {
        // Variables
            data: {},

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

    return service;
}]);
