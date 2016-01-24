app.directive('card', function() {
    function link($scope, $elem, $attrs) {
        $scope.$watch('card', function() {
            console.log('updated', $scope.card);
            if (!$scope.card) {
                return;
            }
            $scope.text = $scope.card.text.replace(' - ', '<span class="blank"></span>');
            console.log('text', $scope.text);
        }, true);
    }

    return {
        restrict: 'E',
        link: link,
        templateUrl: '/html/directives/card.html',
        scope: {
            card: '=card'
        }
    };
});
