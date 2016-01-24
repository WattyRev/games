app.controller('playingCtrl', ['$scope', '$rootScope', 'gameService', '$state', function($scope, $root, $game, $state) {
    // Variables
        $scope.game = $game.data;
        $scope.vars = {
            viewing: null,
            selected: [],
            numToSelect: 1
        };

    // Functions
        $scope.sendMessage = function(message) {
            $game.sendMessage(message);
            $scope.chatMessage = '';
        };

        $scope.viewCard = function(id) {
            if ($scope.vars.viewing === id) {
                $scope.vars.viewing = null;
            } else {
                $scope.vars.viewing = id;
            }
        };

        $scope.selectViewedCard = function() {
            var viewedIndex;
            var viewed = $scope.me.hand.filter(function(card, index) {
                if (card.id === $scope.vars.viewing) {
                    viewedIndex = index;
                    return true;
                }
                return false;
            });
            $scope.vars.push(viewed[0]);
            $scope.me.hand.splice(viewedIndex, 1);
            $scope.vars.viewing = null;
        };

        $scope.cancelSelection = function(card) {
            var selectedIndex;
            var selected = $scope.vars.selected.filter(function(_card, index) {
                if (card.id === _card.id) {
                    selectedIndex = index;
                    return true;
                }
                return false;
            });
            $scope.me.hand.push(selected[0]);
            $scope.vars.selected.splice(selectedIndex, 1);
        };

        $scope.sendCards = function() {

        };

        function getData() {
            $scope.game = $game.data;
            if ($game) {
                $scope.me = $scope.game.findUserById(localStorage.userId);
            }
            $scope.$apply();
            console.log('update', $scope);
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
