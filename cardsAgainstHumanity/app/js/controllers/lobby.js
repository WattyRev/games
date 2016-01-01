app.controller('lobbyCtrl', ['$scope', 'sse', '$state', function($scope, $sse, $state) {
    // Variables
        $scope.sessionId = $state.params.sessionId;

        $sse.openStream($scope.sessionId);
}]);
