module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			source: {
				raiz: "source/",
				js: "<%= meta.source.raiz %>js/",
				examples: "<%= meta.source.raiz %>examples/"
			},
			tester: {
				raiz: "tester/",
				examples: "<%= meta.tester.raiz %>examples/",
				plugin: "<%= meta.tester.examples %>maskinput/",
				js: "<%= meta.tester.plugin %>js/"
			},
			production: {
				raiz: "production/",
			}
		},

		// Union project
		uglify: {
			options: {
				banner: '/**\n * <%= pkg.name %>\n * @version: <%= pkg.version %>\n * <%= pkg.description %>\n * @author: <%= pkg.author %>\n * Date criation: <%= grunt.template.today("dd/mm/yyyy") %>\n */\n'
			},
			build: {
				files: {
					'<%= meta.production.raiz %><%= pkg.name %>.js': ['<%= meta.source.js %>*.js']
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			test: {
				src: ['<%= meta.source.js %>*.js'],
				dest: '<%= meta.tester.plugin %><%= pkg.name %>.js',
			},
		},
		copy: {
			test: {
				files: [{
					expand: true,
					cwd: '<%= meta.source.examples %>',
					src: ['**'],
					dest: '<%= meta.tester.examples %>'
				}]
			}
		},
		watch: {
			test: {
				files: ['<%= meta.source.js %>**/*.js', '<%= meta.source.examples %>**/**'],
				tasks: ["clean:test","concat:test", "copy:test"],
				options: {
					spawn: false,
				},
			},
		},
		clean: {
			build: ["<%= meta.production.raiz %>"],
			test: ["<%= meta.tester.raiz %>"]
		},
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	//Comandos
	grunt.registerTask('test', ["clean:test","concat:test", "copy:test", "watch:test"]);
	grunt.registerTask('build', ["clean:build","uglify:build"]);

};