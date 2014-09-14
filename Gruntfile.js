module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            develop: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.css.map"
                },
                files: {
                    "test/frontsize.css" : "compile.less"
                }
            },
            production: {
                options: {
                    compress          : true,
                    cleancss          : true,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.min.css.map"
                },
                files: {
                    "test/frontsize.min.css" : "compile.less"
                }
            },
            test: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.test.css.map"
                },
                files: {
                    "test/frontsize.test.css" : "test.less"
                }
            },
            testAutoprefixer: {
                options: {
                    compress          : false,
                    cleancss          : false,
                    strictUnits       : true,
                    dumpLineNumbers   : "comments",
                    sourceMap         : true,
                    sourceMapFilename : "test/frontsize.autoprefixer.css.map",
                    modifyVars: {
                        "use-css-prefix": false
                    }
                },
                files: {
                    "test/frontsize.test.autoprefixer.css" : "test_autoprefixer.less"
                }
            }
        },

        autoprefixer: {
            options: {
                // browsers: ["> 1%", "Firefox > 3.6", "last 10 versions", "ie 8", "ie 7", "Firefox ESR", "Opera > 10.1"],
                diff: true
            },
            test: {
                src: "test/frontsize.test.autoprefixer.css",
                dest: "test/frontsize.autoprefixer.css"
            }
        },

        watch: {
            options: {
                atBegin : true,
                event: ["added", "changed"],
            },
            development : {
                files: [
                    "*.less",
                    "**/*.less"
                ],
                tasks: [
                    "less:development",
                    "csso:production"
                ]
            }
        },

        csslint: {
            options: {
                csslintrc : ".csslintrc"
            },
            test: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["test/frontsize.test.css"]
            },
            testMin: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["test/frontsize.test.min.css"]
            },
            testPrefixed: {
                options: {
                    csslintrc : ".csslintrc"
                },
                src: ["test/frontsize.prefixed.css"]
            }
        },

        clean: {
            assets: {
                src: [
                    "../img/theme"
                ]
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand  : true,
                        flatten : true,
                        src     : ["themes/default/img/*"],
                        dest    : "../img/theme/",
                        filter  : "isFile"
                    }
                ]
            }
        }

    });

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("production", [
        "test",
        "testAutoprefixer",
        "test_min",
        "production"
    ]);

    grunt.registerTask("develop", [
        "less:develop",
        "test"
    ]);

    grunt.registerTask("assets", [
        "clean:assets",
        "copy:assets"
    ]);

    grunt.registerTask("test", [
        "less:test",
        "csslint:test"
    ]);

    grunt.registerTask("testAutoprefixer", [
        "less:testAutoprefixer",
        "autoprefixer",
        "csslint:test"
    ]);

    grunt.registerTask("test_min", [
        "less:test",
        "csslint:testMin"
    ]);
};
