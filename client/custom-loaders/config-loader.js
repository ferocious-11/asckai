'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
var path = require('path');

var beautify = require('js-beautify').js_beautify;
var fs = require("fs");
var md5 = require('js-md5');
var appJSString = "";

// Template for app.js
var appTemplate = (hashConditions) => {
    return (`
    import Core from "framework/core.js";
    import RootConfig from "apps/Root/RootConfig.js";
    import {registerArr} from "framework/plugins/router.js";

    function asyncRequire(currentHash){
        return new Promise((resolve, reject) => {
            const rootConfig = RootConfig.dynamicConfig || RootConfig.staticConfig;
            if(rootConfig && typeof rootConfig.then === "function") {
                rootConfig.then(function(fetchedConfig) {
                    registerArr(fetchedConfig);
                    resolve();
                }, function(err) {
                    console.error("Could not fetch config dynamically for Root");
                    reject(err);
                })
            }
        }).then(function() {
            switch (currentHash.split("/")[0]) {
                ${hashConditions}
            }
        });
    }
    Core.loadApp(asyncRequire);`);
};

var caseTemplate = (appConfig) => {
    return (`case "${appConfig.appName.charAt(0).toLowerCase() + appConfig.appName.slice(1)}":
    return new Promise((resolve, reject) => {
        require.ensure([], () => {
            var config = require("apps/${appConfig.appName}/${appConfig.appName}Config.js").default;
            var appConfig = config.dynamicConfig || config.staticConfig;
            if(appConfig && typeof appConfig.then === "function"){
                appConfig.then(function(fetchedConfig){
                    registerArr(fetchedConfig);
                    resolve();
                }, function(err){
                    console.error("Could not fetch config dynamically for ${appConfig.appName}");
                    reject();
                })
            } else {
                registerArr(appConfig.routeConfig);
                resolve();
            }
        },"${appConfig.appName}");
    });
    break;`);
};

var importTemplate = (module, appName) => {
    var importSet = new Set();

    if (module && module.moduleName) {
        if(!(/^modules\//.test(module.moduleName))) {
            module.moduleName = appName + '/' + module.moduleName;
        }
        importSet.add(module.moduleName);

        console.log('imported ' + module.moduleName);
        if(module.instanceConfig && module.instanceConfig.modules) {
            console.log(module.moduleName + ' has sub-modules.');
            module.instanceConfig.modules.forEach((subModule) => {
                importTemplate(subModule, appName).forEach((item) => {
                    importSet.add(item);
                });
            });

            if(Array.isArray(module.instanceConfig.import)) {
                module.instanceConfig.import.forEach((fileName) => {
                    console.log('  +imported ' + fileName);
                    importSet.add(fileName);
                });
            }
        }
    }

    return importSet;
};

var appConfigTemplate = (configs, appName) => {

    var importString = 'let moduleRef = {}; import Request from "plugins/request";', fileContent;

    var importSet = new Set();
    configs.forEach((config) => {
        importTemplate(config.module, appName).forEach((item) => {
            importSet.add(item);
        });
    });

    importSet.forEach((item) => {

        var pathToFile = "apps/" + item;
        var moduleName = item.replace(/\//g, '');

        if(/^modules\//.test(item)) {
            pathToFile = item;
        }

        var instanceRefName = '_' + md5(moduleName);
        importString += "import " + instanceRefName + " from " + '"' + pathToFile + '";';
        importString += `moduleRef["${item}"] = ${instanceRefName};`;
    });

    fileContent = beautify(`
        ${importString}
        import {parseConfig} from 'plugins/experimentParser';

        function assignInstances(config) {
            if(!config) return;
            if(Array.isArray(config)) {
                config.forEach((item) => {
                    assignInstances(item);
                });
                return;
            }
            if(config.moduleName) {
                if(! /^modules\\//.test(config.moduleName)) {
                    config.moduleName = '${appName}/'+config.moduleName;
                }
                config.instance = moduleRef[config.moduleName];
                assignInstances(config.instanceConfig.modules);

                let instanceConfig = config.instanceConfig;
                if(instanceConfig.import) {
                    instanceConfig.importRefs = {};
                    instanceConfig.import.forEach((filePath) => {
                        instanceConfig.importRefs[filePath] = 
                            moduleRef[filePath];
                    });
                }
            }
            return config;
        }

        export default {
            staticConfig: {
                routeConfig: ${JSON.stringify(configs)}
            },
            dynamicConfig: new Promise( (resolve, reject) => {
                Request.ajax({
                    url: 'config?userID=sellerID&apps={"${appName}":"${configVersions[appName]}"}'
                })
                .then(function(data){
                    var experiments = data.result.experiments;
                    var config = parseConfig(data.result.appConfig.${appName}.appConfig, experiments);
                    config.forEach((routeConfig) => {
                        assignInstances(routeConfig.module);
                    });
                    resolve(config);
                },function(err){
                    reject(err)
                });
            })
        };`
        , {indent_size: 4});
    fileContent = fileContent.replace(/"t2-/g, '').replace(/-t2"/g, '');

    return fileContent;
};

var configVersions = require('./app-versions.js');

// Create config files
var createConfigFiles = function (configs) {
    for (var app in configs) {
        if(!configs.hasOwnProperty(app)) continue;

        var rootConfig = {
            appName: app,
            hash: app
        };

        appJSString += caseTemplate(rootConfig);
        console.log(path.resolve("../apps/" + rootConfig.appName + '/' + rootConfig.appName + "Config.js"));
        fs.writeFileSync("../apps/" + rootConfig.appName + '/' + rootConfig.appName + "Config.js", appConfigTemplate(configs[app].appConfig, rootConfig.appName), 'utf8');
    }

    appJSString = appTemplate(appJSString);
    appJSString = beautify(appJSString, {indent_size: 4});
    fs.writeFileSync("./app.js", appJSString, 'utf8');
    appJSString = "";
};

// Create app.js with
((function (source) {
    fetch('http://localhost:3000/getConfig?apps='+JSON.stringify(configVersions)+'&device=desktop')
        .then(
            function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }
        )
        .then(function (configs) {
            createConfigFiles(configs.result.appConfig);
            callback(null, source);
        });
})());
