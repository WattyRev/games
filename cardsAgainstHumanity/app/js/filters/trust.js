app.filter('trust', ['$sce',function($sce) {
  return function(value, type) {
    return $sce.trustAs(type || 'html', value);
};
}]);
