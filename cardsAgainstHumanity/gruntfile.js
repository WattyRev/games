var js = [
    'app/js/bower_components/angular/angular.min.js',
    'app/js/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'app/js/bower_components/jquery/dist/jquery.min.js',
    'app/js/vendor/**.js',
    'app/js/util.js',
    'app/js/app.js',
    'app/js/filters/**.js',
    'app/js/models/**.js',
    'app/js/services/**.js',
    'app/js/controllers/**.js',
    'app/js/directives/**.js',
];
var jsProd = [
    'app/js/app.min.js',
];


module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['**/*.less'],
        tasks: ['clean', 'less:development'],
        options: {
          spawn: false,
        },
      },
    },

    connect: {
        server: {
            options: {
                port: 9000,
                base: 'app'
            }
        }
    },

    less: {
      development: {
        options: {
          paths: ["app"]
        },
        files: {
          "app/css/style.css": "app/less/style.less"
        }
      }
    },
    injector: {
        options: {
            ignorePath: 'app/',
            addRootSlash: false,
        },
        dev: {
          files: {
            'app/index.html': js,
          }
      },
        prod: {
          files: {
            'app/index.html': jsProd,
          }
        }
    },

    clean: {
        dev: {
            css: ["app/css/**.css"],
            js: ["app/js/app.min.js"]
        },
        prod: {
            dist: ["dist/**.png"]
        }
    },

    cssmin: {
        target: {
            files: [{
                expand: true,
                cwd: 'app/css',
                src: ['style.css'],
                dest: 'app/css',
            }]
        }
    },

    uglify: {
        options: {
          mangle: false,
          compress: {
            drop_console: true
          }
        },
        my_target: {
            files: {
                'app/js/app.min.js': js
            }
        }
    },

    copy: {
        main: {
            files: [
                {expand: true, cwd:'app/', src:['*'], dest: 'dist/', filter: 'isFile'},
                {expand: true, cwd:'app/', src:['css/*'], dest: 'dist/', filter: 'isFile'},
                {expand: true, cwd:'app/', src:['html/**'], dest: 'dist/'},
                {expand: true, cwd:'app/', src:['js/app.min.js'], dest: 'dist/', filter: 'isFile'},
                {expand: true, cwd:'app/', src:['resources/**'], dest: 'dist/'},
            ],
        },
    },
  });



  grunt.registerTask('run', [
     'clean:dev',
     'less',
     'injector:dev',
     'connect',
     'watch'
  ]);

  grunt.registerTask('runProd', [
      'clean',
      'less',
      'cssmin',
      'uglify',
      'injector:prod',
      'connect',
      'watch'
  ]);

  grunt.registerTask('build', [
      'clean',
      'less',
      'cssmin',
      'uglify',
      'injector:prod',
      'copy'
  ]);

};
