module.exports = function(grunt) {
    grunt.initConfig({
        cssmin: {
            target: {
                files: {
                    'css/theme.min.css': ['css/theme.css']
                }
            }
        },
        watch: {
            css: {
                files: ['css/theme.css'],
                tasks: ['cssmin'],
                options: {
                    spawn: false,
                },
            },
        },
        concat: {
            libs: {
                src: ['libs/jquery.min.js', 'libs/jquery-migrate.min.js', 'libs/mediaelement-and-player.min.js'],
                dest: 'libs/build/vendor.min.js',
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/build/app.min.js': ['js/build/app.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['watch']);
};
