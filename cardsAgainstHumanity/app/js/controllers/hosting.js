app.controller('hostingCtrl', ['$scope', '$rootScope', 'gameService', '$state', 'api', function($scope, $root, $game, $state, $api) {
    // Variables
        $scope.game = $game.data;
        $scope.vars = {
            lastPooped: null
        };

    // Functions
        $scope.nextRound = function(id) {
            $api.nextRound($scope.game.id, id);
        };

        function getData() {
            $scope.game = $game.data;
            $scope.$apply();
            console.log('got data', $scope.game);
        }

        function init() {
            var functions = [
                function() {
                    $game.connect($state.params.sessionId);
                }
            ];
            functions.forEach(function(fn) {
                fn();
            });
        }
        init();

    // Listeners
        $root.$on('gameUpdate', getData);

}]);
