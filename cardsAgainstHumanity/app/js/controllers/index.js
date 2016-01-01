app.controller('indexCtrl', ['$scope', '$rootScope', '$state', 'gameService', function($scope, $root, $state, $game) {
    console.log('index', $game);
    // Functions
        $scope.newGame = function() {
            var id = util.makeId();
            $game.newGame().then(function(response) {
                $state.go('lobby', {sessionId: response.data});
            });
        };

        $scope.joinGame = function(id) {
            $state.go('lobby', {sessionId: id});
        };

        $scope.invalidId = function() {
            return !($scope.joinId && $scope.joinId.length === 5);
        };
}]);
