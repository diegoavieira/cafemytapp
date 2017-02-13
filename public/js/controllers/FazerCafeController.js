angular.module('cafeapp').controller('FazerCafeController', function($scope, cafevalues) {
	var idUser = cafevalues.userlogado.data.id;
	var nameUser = cafevalues.userlogado.data.name;
	
	$scope.user = nameUser;
	
	$scope.fazercafe = function() {
		socket.emit('cafe', {ingred: $scope.ingred, user: idUser}, function(ret) {
			if(ret.success) {
				console.log('cafe ok', nameUser);
				$scope.anime = ret.data.qtdAgua + 'px';
				$scope.$apply();
			} else {
				console.log('nada de café');
			}
		});
	}

	$scope.novocafe = function() {
		$scope.ingred = "";
		$scope.anime = "";
	}
});