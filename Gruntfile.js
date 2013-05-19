module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 3001,
                    base: 'public/'
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
        compass: {
            dev: {
                options: {
                    sassDir: 'src/assets/style/',
                    cssDir: 'public/css/'
                }
            }
        },
        watch: {
            jade: {
                files: ['src/template/**/*.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true
                }
            },
            stylus: {
                files: ['src/assets/style/**/*.scss'],
                tasks: ['compass'],
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
