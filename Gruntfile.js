module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-eslint');

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        simplemocha : {

            options : {
                globals : ['expect'],
                timeout : 3000,
                ignoreLeaks : false,
                ui : 'bdd',
                reporter : 'tap'
            },

            all : { 
                src : ['test/*.js', 'test/**/*.js']
            }
        },

        jsdoc : {

            dist : {
                src: ['index.js', 'src/*.js', 'src/**/*.js', 'src/**/**/*.js'],
                options: {
                    destination: 'out/doc'
                }
            }
        },

        eslint: {

            options: {
                rules: require('./conf/eslint/rules.json'),
                configFile: 'conf/eslint/config.json'
            },

            target: ['*js', 'src/*.js', 'src/**/*.js', 'test/**/*.js']
        },

        
        
        githooks: {
            all: {
                // Will run the jshint and test:unit tasks at every commit 
                'pre-commit': ['simplemocha', 'jsdoc', 'eslint']
            }
        }
    });

    grunt.registerTask('default', ['simplemocha', 'jsdoc', 'eslint', 'githooks']);
};