angular.module('cafeapp', ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider.when('/login', {
			templateUrl: 'views/partials/login.html',
			controller: 'LoginController'
		});

		$routeProvider.when('/cadastro', {
			templateUrl: 'views/partials/cadastro.html',
			controller: 'CadastroController'
		});

		$routeProvider.when('/fazer-cafe', {
			templateUrl: 'views/partials/fazer-cafe.html',
			controller: 'FazerCafeController'
		});

		$routeProvider.otherwise({redirectTo: '/login'});
});