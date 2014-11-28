module.exports = function(grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/* \n * <%= pkg.name %> - v<%= pkg.version %> - ' + 
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' + 
			'<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' + 
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n */'
		},
		concat:{
			files:{
				"dist/angular.lazymachine.js":['src/**/*.js']
			}
		},
		jshint: {
			files: ['app/**/*.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				forin: true,
				browser: true,
				globals: {
					angular:true,
					exports: true,
					module: false,
					$: true
				},
			}
		},
		watch: {
		      files: ['src/**/*.js'],
    		  tasks: ['jshint', 'concat'],
    		  options:{
    		  	interrupt:true,
    		  	globals: {
					angular:true,
					exports: true,
					module: false,
					$: true
				}
    		  }
		},
		uglify: {
			options: {
				compress: {
					drop_console: true,
                    evaluate: false,
                    properties: false,
                    unused: false
				}
			},
			files:[{
				expand:true,
				src:'/dist*.js',
				dest:'/dist/min',
			}]
		},
        strip: {
			dist: {
				src: 'js/*.js'
			},
            options: {
                inline : true,
                nodes : ['console.log','console.warn','console.trace','window.console.log']
            }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Default task.
	grunt.registerTask('default', ['concat']);
    grunt.registerTask('dev-clean', ['concat','strip']);
};
