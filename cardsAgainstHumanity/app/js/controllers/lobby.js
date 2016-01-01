app.controller('lobbyCtrl', ['$scope', '$rootScope', '$state', function($scope, $root, $state) {
    // Variables
        $scope.sessionId = $state.params.sessionId;
}]);
