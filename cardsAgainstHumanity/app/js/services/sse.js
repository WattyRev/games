app.service('sse', ['$rootScope', function($root) {
    console.log('sse');
    var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php');

    data.addEventListener('gameUpdate',function(e){
        $root.$broadcast('update', e);
        console.log('update', JSON.parse(e.data));
    }, false);
}]);
