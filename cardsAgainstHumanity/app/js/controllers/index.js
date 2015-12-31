app.controller('indexCtrl', ['$scope', '$rootScope', '$state', function($scope, $root, $state) {

    // Functions
        $scope.newGame = function() {
            var id = util.makeId();
            $state.go('lobby', {sessionId: id});
        };

        $scope.joinGame = function(id) {
            $state.go('lobby', {sessionId: id});
        };

        $scope.invalidId = function() {
            return !($scope.joinId && $scope.joinId.length === 5);
        };
}]);
