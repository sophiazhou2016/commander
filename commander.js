#!/usr/bin/env node
var fs = require('fs'),
    path = process.cwd();
const version = require('./package').version;

// console.log('path:', path);

var run = function(obj) {
    if(obj[0] === '-v') {
        console.log('version is ' + version);
    }else if (obj[1] === '-h') {
        console.log('help');
    }else {
        fs.readdir(path, function (err, files) {
            if(err) {
                console.log(err);
            }else {
                for(var i = 0; i < files.length; i ++) {
                    console.log('循环：', i, files[i]);
                }
            }
        });
    }
};
console.log(process.argv);
run(process.argv.slice(2));