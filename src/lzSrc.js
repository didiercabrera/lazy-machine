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
}])