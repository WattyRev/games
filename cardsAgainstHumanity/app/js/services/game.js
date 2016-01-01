app.service('gameService', ['sse', 'api', function($sse, $api) {
    return {
        // Variables
            data: {},

        // Functions
            newGame: function() {
                return $api.createGame();
            },
            getRole: function() {

            }
    };
}]);
