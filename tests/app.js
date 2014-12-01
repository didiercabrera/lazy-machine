angular.module('myApp',['LazyMachine']).controller('lazyController',['$scope','lzLoader',function ($scope,lzLoader) {
	$scope.priorityImages=[];
	$scope.batchImages=[];

	for (var i = 0; i < 10; i++) {
		$scope.priorityImages.push('img/img ('+i+').jpg');
	};

	for (var i = 10; i < 20; i++) {
		$scope.batchImages.push('img/img ('+i+').jpg');
	};



	$('.container').bind('scroll',function(el,ev){
		console.log($(this).scrollTop(),$(this).height())
		if($(this).scrollTop()>$(this).height()){
			lzLoader.loadBatch('batch_images');
		}
	});
	// lzLoader.priorityLoad('2');

}]);