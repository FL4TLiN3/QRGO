module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 3001,
                    base: 'public/'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src/js',
                    name: 'main',
                    out: 'public/js/main.min.js'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/template/',
                    src: ['**/*.jade'],
                    dest: 'public/',
                    ext: '.html'
                }]
            }
        },
        watch: {
            requirejs: {
                files: ['src/js/**/*.js'],
                tasks: ['requirejs'],
                options: {
                    livereload: true
                }
            },
            jade: {
                files: ['src/template/**/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true
                }
            }
        }
    });

    for (var key in pkg.devDependencies) {
        if (/grunt-/.test(key)) {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('dev', ['connect', 'watch']);
};
