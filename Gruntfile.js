module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        mocha_istanbul: {

            coverage: {
            
                src: ['test/**/*.js'],
                options: {
            
                    coverageFolder: 'coverage',
                    reporter: 'list'
                }
            }
        },

        jsdoc : {

            dist : {
            
                src: ['index.js', 'src/*.js', 'src/**/*.js', 'src/**/**/*.js'],
                options: {
            
                    destination: 'docs'
                }
            }
        },

        eslint: {

            options: {
            
                rulesPaths: 'conf/eslint/rules',
                configFile: 'conf/eslint/config.json'
            },

            target: ['*js', 'src/*.js', 'src/**/*.js', 'test/**/*.js']
        },
        
        githooks: {
            
            all: {
                // Will run the jshint and test:unit tasks at every commit 
                'pre-commit': ['mochacov', 'eslint', 'jsdoc']
            }
        }

    });

    grunt.registerTask('default', ['eslint', 'mocha_istanbul', 'jsdoc', 'githooks']);
    grunt.registerTask('test', ['simplemocha', 'eslint']);
    grunt.registerTask('doc', ['jsdoc']);
};