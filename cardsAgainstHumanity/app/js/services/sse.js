app.service('sse', ['$rootScope', function($root) {

    function listen(e) {
        $root.$broadcast(e.type, e);
    }

    return {
        openStream: function(id) {
            var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php?id=' + id);

            data.addEventListener('gameUpdate',listen);
        }
    };
}]);
