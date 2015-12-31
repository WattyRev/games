var app = angular.module('cardsAgainstHumanity', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('index', {
			url: '/',
			templateUrl: 'html/pages/index.html',
			controller: 'indexCtrl',
			data: {
				title: '',
			}
		})
		.state('lobby', {
			url: '/:sessionId/lobby',
			templateUrl: 'html/pages/lobby.html',
			controller: 'lobbyCtrl',
			data: {
				title: 'Lobby'
			}
		});
});
