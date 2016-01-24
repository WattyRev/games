app.controller('playingCtrl', ['$scope', '$rootScope', 'gameService', '$state', function($scope, $root, $game, $state) {
    // Variables
        $scope.game = $game.data;
        $scope.vars = {
            viewing: null,
            selected: [],
            numToSelect: 1,
            sent: false,
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
                if (card.text === $scope.vars.viewing) {
                    viewedIndex = index;
                    return true;
                }
                return false;
            });
            $scope.vars.selected.push(viewed[0]);
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
            $api.sendCards($scope.game.id, localStorage.userId, $scope.vars.selected);
            $scope.vars.selected = [];
            $scope.vars.sent = true;
        };

        function getData() {
            if ($game && (!$scope.game || $game.data.round !== $scope.game.round)) {
                $scope.game = $game.data;
                $scope.me = $scope.game.findUserById(localStorage.userId);
                $scope.vars.sent = false;
                if ($scope.game.currentBlack.indexOf('(Pick 2)')) {
                    $scope.vars.numToSelect = 2;
                } else {
                    $scope.vars.numToSelect = 1;
                }
            }
            $scope.$apply();
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
