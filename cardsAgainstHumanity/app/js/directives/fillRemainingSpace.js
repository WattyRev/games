app.directive('fillRemainingSpace', function() {
    function link($scope, $elem, $attrs) {
        $elem = $($elem);
        var parentHeight = $elem.parents().height();
        var parentOffset = $elem.parents().offset().top;
        var elemOffset = $elem.offset().top;
        var difference = elemOffset - parentOffset;
        var height = parentHeight - difference;
        $elem.css('height', height + 'px');
    }

    return {
        restrict: 'A',
        link: link
    };
});
