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