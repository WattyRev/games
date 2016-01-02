var Game = function(data) {
    data = JSON.parse(data);
    var self = this;

    $.each(data, function(key, val) {
        self[key] = val;
    });
};

Game.prototype.amHost = function() {
    return localStorage.userId === this.host;
};
