;(function(angular,undefined) {
	'use strict';

angular.module("LazyMachine",[])
.provider('lzLoader',[function (){
	function loader($rootScope,$evalAsync){
		return{
			'loadBatch':function (batch_name){
				$evalAsync(function(){
					alert('loadBatch');
					$rootScope.$broadcast('lz.load.batch',{
						'lzBatch':batch_name
					});	
					console.log('broadcasting');				
				});
			}
		};
	};	
	
	this.$get = ['$rootScope','$timeout',function ($rootScope,$evalAsync){
		return new loader($rootScope,$evalAsync);
	}];
}])
.directive('lzSrc',['$rootScope',function ($rootScope) {
	alert('directive created');
	return{
		restrict:'A',
		scope:{
			'lzSrc':'@',
			'lzPriority':'@',
			'lzBatch':'@'
		},
		link: function (scope,element,attrs) {
			alert('directive linked');
			$rootScope.$on('lz.load.batch',function (event,data){
				alert('directive on');
				if(data.lzBatch===scope.lzBatch){
					element[0].src=scope.lzSrc;
				}
			});		    	
		}
	};
}]);

}(angular));