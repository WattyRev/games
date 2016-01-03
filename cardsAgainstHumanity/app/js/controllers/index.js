app.controller('indexCtrl', ['$scope', '$rootScope', '$state', 'gameService', function($scope, $root, $state, $game) {

    // Variables
        $scope.games = $game.games;

    // Functions
        $scope.newGame = function() {
            var id = util.makeId();
            $game.newGame().then(function(id) {
                $state.go('lobby', {sessionId: id});
            });
        };

        $scope.joinGame = function(id) {
            $game.joinGame(id,{
                name: 'user-' + util.makeId,
                id: localStorage.userId
            }).then(function() {
                $state.go('lobby', {sessionId: id});
            });
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
