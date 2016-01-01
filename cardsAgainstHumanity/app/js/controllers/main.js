app.controller('mainCtrl', ['$scope', '$rootScope', '$state', function($scope, $root, $state) {
    //Variables
        $scope.state = $state;
        $root.userId = localStorage.userId || util.makeId;
        localStorage.userId = $root.userId;
}]);
