app.service('sse', ['$rootScope', function($root) {
    var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php');

    data.addEventListener('update',function(e){
        $root.broadcast('update', e);
        console.log('update', e);
    }, false);
}]);
