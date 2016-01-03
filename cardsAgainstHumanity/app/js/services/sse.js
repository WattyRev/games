app.service('sse', ['$rootScope', function($root) {

    function listen(e) {
        console.log('I heard something');
        $root.$broadcast(e.type, e);
    }

    function init() {
        var functions = [
            function() {
                var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php');
                data.addEventListener('statusUpdate',listen);
            }
        ];
        functions.forEach(function(fn) {
            fn();
        });
    }
    init();

    return {
        openStream: function(id) {
            var data = new EventSource('http://games.wattydev.com/cardsAgainstHumanity/api/events.php?id=' + id);
            data.addEventListener('gameUpdate',listen);
        }
    };
}]);
