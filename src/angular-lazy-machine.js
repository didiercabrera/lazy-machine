/**
 * LazyMachine
 * @description Lazy loading assets,by batches or priority.
 * @version v0.0.1
 * @link https://www.github.com/didiercabrera/lazy-machine
 */

;(function(angular,undefined) {
	'use strict';

angular.module("LazyMachine",[])
.provider('lzLoader',[function (){
	function loader($rootScope,$location,$timeout,lzData){
		var methods={
			'loadBatch':function (batch_name){
				$timeout(function(){
					$rootScope.$emit('lz.load',{
						'loadType':'batch',
						'lzBatch':batch_name
					});	
				});
			},
			'priorityLoad':function (level){
				$timeout(function(){			
					$rootScope.$emit('lz.load',{
						'loadType':'priority',						
						'lzPriority':level
					});
				});
			}
		}

		$rootScope.$on('$locationChangeSuccess',function(){
			methods.priorityLoad(10);
		});

		return methods;
	};	
	
	this.$get = ['$rootScope','$location','$timeout','lzData',function ($rootScope,$location,$timeout,lzData){
		return new loader($rootScope,$location,$timeout,lzData);
	}];
}])
.factory('lzData',['$rootScope','$http','$q',function ($rootScope,$http,$q){
	return{
		src_queue:[],//TODO add next batches and defered srcs
		priority_load:[],//TODO all priority loads,re-triggered in order
		nextBatch:function(){
			return 'Noop'
		}
	};
}])
.directive('lzSrc',['$rootScope',function ($rootScope) {
	return{
		restrict:'A',
		priority:99,
		scope:{
			'lzSrc':'@',
			'lzPriority':'@',
			'lzBatch':'@'
		},
		link: function (scope,element,attrs) {
			$rootScope.$on('lz.load',function (event,data){
				switch(data.loadType){
					case 'batch':
						if(data.lzBatch===scope.lzBatch){
							element[0].src=scope.lzSrc;
						}						
						break;
					case 'priority':
						if(data.lzPriority==scope.lzPriority){
							element[0].src=scope.lzSrc;
						}					
						break;
					default:
						break;
				}

			});	
		}
	};
}]);

}(angular));