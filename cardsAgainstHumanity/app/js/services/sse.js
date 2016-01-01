app.service('sse', ['$rootScope', function($root) {
    // var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php');
    //
    // data.addEventListener('gameUpdate',function(e){
    //     $root.$broadcast('update', e);
    //     console.log('update', JSON.parse(e.data));
    // }, false);

    return {
        openStream: function(id) {
            var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php?id=' + id);

            data.addEventListener('gameUpdate',function(e){
                $root.$broadcast('update', e);
                console.log('update', JSON.parse(e.data));
            }, false);
        }
    };
}]);
