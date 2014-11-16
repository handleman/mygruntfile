module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			//all vendor lib js files to one 
			js: {

				src: [

					'js/jquery-ui.min.js',
					'js/jquery-autocomplete.js',
					'js/jQuery.Tree.js',
					'js/jquery.jcarousel.min.js',
					'js/jquery.livequery.min.js',
					'js/jquery.placeholder.min.js',
					'js/jquery.hoverscroll.js',
					'js/jquery.fancybox-1.3.4.js',
					'js/jquery.cookie.js'
					
				],
				dest: 'js/vendor.js'

			},
			//all vendor css files to one 
			css: {
				src: [

					'css/reset.css',
					'css/style.css',
					'css/button.css',
					'css/calendar.css',
					'css/cusel.css',
					'css/jquery.fancybox-1.3.4.css',
					'css/jquery-autocomplete.css',
					'css/jQuery.Tree.css',
					'css/colpick.css' //<select> with countries flags

				],
				dest: 'css/vendor.css'

			},
		},
		uglify: {
			// minify all vendor files
			lib: {
				files: {
					'js-min/vendor.min.js': ['js/vendor.js']

				}
			},
			// minify all local developed module js files
			mod: {
				files: grunt.file.expandMapping(['js/_modules/*.js'], 'js-min/_modules/', {
					rename: function(destBase, destPath) {
						var filename = destPath.match(/.*\/(.*)$/)[1];
						return destBase + filename.replace('.js', '.min.js');
					}
				})
			}
		},
		cssmin: {
			//minify all vendor css files
			lib: {
				options: {
					noAdvanced: true
				},
				files: {
					'css-min/vendor.min.css': ['css/vendor.css']
				}
			},
			//minify only working css file
			main: {
				options: {
					noAdvanced: true
				},
				files: {
					'css-min/styles.min.css': ['css/styles.css']
				}
			}
		},
		watch: {
			// switching on live reload feature (required live reload plugin in your browser)
			options: {
				spawn: false,
				livereload: true,
				reload: true
			},
			// watch all project changed files an exeute commands on newer ones
			all: {
				files: ['html-cut/*.html','js/*.js','js/_modules/*.js', 'css/*.css','**/*.php'],
				tasks: ['newer:concat', 'newer:uglify', 'newer:cssmin'],
				options: {
					spawn: false,
					livereload: true
				}
			}
			//watch only css changed files
			css: {
				files: ['css/*.css', 'html-cut/*.html'],
				tasks: ['newer:concat:css', 'cssmin'],
				options: {
					spawn: false,
					reload: true,
					livereload: true,
				},
			},
			//watch only js changed files
			js: {
				files: ['js/*.js', 'js/_modules/*.js', 'Gruntfile.js'],
				tasks: ['concat:js', 'uglify'],
				options: {
					spawn: false,
					reload: true,
					livereload: true
				},
			},
			//watch only currently developed files without vendor resources
			dev: {
				files: ['js/_modules/*.js','*.php', 'Gruntfile.js', 'css/styles.css', 'html-cut/*.html'],
				tasks: ['uglify:mod', 'cssmin:main'],
				options: {
					spawn: false,
					reload: true,
					livereload: true
				},
			}
		},
		// clean cache command
		clean:["cache/*"]
	});


	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch:all']);

	grunt.registerTask('production', 'Run all my build tasks.', function(n) {
		grunt.task.run('concat', 'uglify', 'cssmin');
	});
	grunt.registerTask('css-all', 'Run for css.', function(n) {
		grunt.task.run('concat:css:all', 'cssmin');
	});
	grunt.registerTask('css-dev', 'Run for css.', function(n) {
		grunt.task.run('cssmin:main');
	});
	grunt.registerTask('js-all', 'run for js', function(n) {
		grunt.task.run('concat:js','uglify');
	});
	grunt.registerTask('js-dev', 'run for js', function(n) {
			grunt.task.run('uglify:mod');
	});
	grunt.registerTask('js-vendor', 'run for js', function(n) {
		grunt.task.run('concat:js','uglify:lib');
	});

};