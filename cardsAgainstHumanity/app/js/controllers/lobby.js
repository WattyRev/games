app.controller('lobbyCtrl', ['$scope', '$state', 'gameService', '$rootScope', function($scope, $state, $game, $root) {
    // Variables
        $scope.game = $game.data;

    // Functions
        $scope.sendMessage = function(message) {
            $game.sendMessage(message);
            $scope.chatMessage = '';
        };
        $scope.startGame = function() {
            var id = $scope.game.id;
            $game.startGame(id);
            $state.go('hosting', {sessionId: id});
        };
        function getData() {
            $scope.game = $game.data;
            $scope.$apply();
            if ($scope.game.started && $scope.game.host !== localStorage.userId) {
                $state.go('playing', {sessionId: $scope.game.id});
            }
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
