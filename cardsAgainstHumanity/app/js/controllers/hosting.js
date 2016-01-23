app.controller('hostingCtrl', ['$scope', '$rootScope', 'gameService', '$state', function($scope, $root, $game, $state) {
    // Variables
        $scope.game = $game.data;
        $scope.vars = {
            lastPooped: null
        };

    // Functions
        $scope.setCzar = function(id) {
            console.log('set czar', id);
        };

        function getData() {
            $scope.game = $game.data;
            $scope.$apply();
            console.log('hosting', $scope.game);
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
