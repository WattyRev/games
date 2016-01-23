app.directive('card', function() {
    function link($scope, $elem, $attrs) {
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
