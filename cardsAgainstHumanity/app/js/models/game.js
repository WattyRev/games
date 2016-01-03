var Game = function(data) {
    data = JSON.parse(data);
    var self = this;
    $.each(data, function(key, val) {
        self[key] = val;
    });
    this.log = this.log.map(function(value) {
        var time = new Date(value.time*1000);
        var hours = time.getHours();
        var a = 'AM';
        if (hours > 12) {
            hours = hours - 12;
            a = 'PM';
        }
        var minutes = time.getMinutes();
        value.time = hours + ':' + minutes + a;
        return value;
    });
};

Game.prototype.amHost = function() {
    return localStorage.userId === this.host;
};
