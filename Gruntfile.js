module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    mkdir: {
      all: {
        options: {
          create: ['build', 'dist']
        }
      }
    },
    uglify: {
      build: {
        src: 'dist/ninesplit-map.js',
        dest: 'dist/ninesplit-map.min.js'
      }
    },
    browserify: {
      build: {
        src: 'src/main.js',
        dest: 'dist/ninesplit-map.js'
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          'build/mapify.css': 'src/mapify.scss'
        }
      }
    },
    datesuffix: {
      distrename: {
        file: 'dist/ninesplit-map.min.js',
        date_format: 'yyyyMMddhhmmss'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks("grunt-date-suffix");

  grunt.registerTask('css-in-js', function() {
    var fs = require('fs');
    var cssContent = fs.readFileSync(__dirname + '/build/mapify.css').toString();
    var tpl = fs.readFileSync(__dirname + '/src/wrap-style.tpl.js').toString();
    var wrapped = tpl.replace('<%= contents %>', cssContent.trim());
    fs.writeFileSync(__dirname + '/build/mapify.css.js', wrapped);
  });
  // Default task(s).
  grunt.registerTask('default', [
    'mkdir',
    'sass',
    'css-in-js',
    'browserify',
    'uglify',
    'datesuffix'
  ]);

};
