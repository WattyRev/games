app.controller('indexCtrl', ['$scope', '$rootScope', '$state', 'gameService', function($scope, $root, $state, $game) {

    // Variables
        $scope.games = $game.games;
        $scope.startingGame = false;

    // Functions
        $scope.newGame = function() {
            if ($scope.startingGame) {
                var id = util.makeId();
                $game.newGame($scope.gameName).then(function(id) {
                    $state.go('lobby', {sessionId: id});
                });
            } else {
                $scope.startingGame = true;
            }
        };

        $scope.joinGame = function(id) {
            if ($scope.joiningGame) {
                $game.joinGame(
                    id,
                    $scope.userName,
                    localStorage.userId
                ).then(function() {
                    $state.go('lobby', {sessionId: id});
                });
            } else {
                $scope.joiningGame = id;
            }
        };

        $scope.invalidId = function() {
            return !($scope.joinId && $scope.joinId.length === 5);
        };

    // Listeners
        $root.$on('statusUpdate', function() {
            $scope.games = $game.games;
            $scope.$apply();
        });
}]);
