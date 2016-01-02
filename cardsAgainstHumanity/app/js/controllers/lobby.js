app.controller('lobbyCtrl', ['$scope', '$state', 'gameService', '$rootScope', function($scope, $state, $game, $root) {
    // Variables
        $scope.game = $game.data;

    // Functions
        function getData() {
            $scope.game = $game.data;
            $scope.$apply();
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
