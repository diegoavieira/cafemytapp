angular.module('cafeapp').controller('LoginController', function($scope, $location, cafevalues) {
	
	$scope.login = function() {
		socket.emit('login', $scope.user, function(ret) {
			if(ret.success) {
				cafevalues.userlogado = ret;
				$location.path('/fazer-cafe');
				$scope.$apply();
			} else {
				console.log("usuario nao cadastrado");
				$scope.naocadastrado = true;
				$scope.$apply();
			}
		});
	};
});