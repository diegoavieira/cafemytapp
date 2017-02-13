angular.module('cafeapp').controller('CadastroController', function($scope, $location) {
	
	$scope.cadastrar = function() {
		socket.emit('cadastrar', $scope.user, function(ret){
			if(ret.success) {
				console.log("Usuario criado");
				$location.path('/login');
				$scope.$apply();
			} else {
				console.log("eroooo", ret);
			}
		});
	};

});