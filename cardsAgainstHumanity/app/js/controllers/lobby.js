app.controller('lobbyCtrl', ['$scope', 'gameService', '$state', function($scope, $game, $state) {
    // Variables
        $scope.sessionId = $state.params.sessionId;
}]);
