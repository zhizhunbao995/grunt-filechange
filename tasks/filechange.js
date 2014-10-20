/*
 * grunt-filechange
 * https://github.com/i/plugin
 *
 * Copyright (c) 2014 xuanliwei
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var crypto = require('crypto');//MD5
  var path = require('path');//path
  var fs=require('fs');//wenjian xitong
  var fileList=[];
  var formatters = {
    json: function(hashes) {
      return JSON.stringify(hashes);
    }
  };
  function isEmptyObject(obj){
  	for(var i in obj){
  		return false;	
  	}
  	return true;
  }
  function walk(path,hashes){  
    var dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
        if(fs.statSync(path + '/' + item).isDirectory()){
            walk(path + '/' + item,hashes);
        }else{
            hashes[path + '/' + item] = creatMd5(path + '/' + item);
            // var stat = fs.statSync(path + '/' + item);
            // console.log(stat.get,(new Date(stat.mtime)).getTime())
        }
    });
  }
  function creatMd5(filename){
    var source = grunt.file.read(filename, {
          encoding: null
        });
    var hash = crypto.
              createHash('md5').
              update(source).
              digest('hex').
              slice(0, 32);
              var key = filename;
              // if (basedir) {
              //   key = path.relative(basedir, filename);
              // }
        return hash;
  }
  function regCreat( val ){
    if( val == "css" ){
      return function(s){
        //return new RegExp("("+s+")\\?ver\=[\\d]+","g");
        return new RegExp(s+"(\\?([a-z0-9_-]|=)+)?","g");
      }
    }else if(val == "javascript" || val == "js"){
      return function(s){
        return new RegExp(s+"(\\?([a-z0-9_-]|=)+)?","g");
      }
    }
  }
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask('filechange', 'image add md5 and change css files background version', function() {
    // Merge task-specific and/or target-specific options with these defaults.
	var hashes = {};
    var options = this.options({
      format: 'json',
      banner: 'jsonlist',
      length: 32
    });
  var cssbgList=[];
    options.formatter = options.formatter || formatters[options.format];
    var regFile = "css";
    for (var k in options) {
      if(k == "js"){
        regFile = "js"
      }
    };
    options.file = options[regFile] || formatters[regFile];
    var basedir = null;
    if (options.basedir) {
      basedir = path.resolve(options.basedir);
    }
    // Iterate over all specified file groups.
    var self = this; 
	  this.files.forEach(function(file) {
		var warnings = false;
    var dif={};//different
		var listenFile = grunt.file.read(options.file);
    var s = file.orig.src[0].replace(/\/\*$/g,"");

		file.src.forEach(function(filename) {
    	if (grunt.file.exists(filename)) {
        if (!grunt.file.isDir(filename)) {
            hashes[filename] = creatMd5(filename);
        }else{
          walk(filename,hashes);
        }
      } else {
        grunt.log.warn('Source file "' + filename + '" not found.');
        warnings = true;
      }
    });
    if(!grunt.file.exists(file.dest)){
          grunt.file.write(file.dest, "{}")
    }
    var jsonObj = JSON.parse(grunt.file.read(file.dest));
		if(grunt.file.exists(file.dest)){
			for(var i in hashes){
				if(jsonObj[i] != hashes[i]){
					dif[i] = hashes[i];
				}
			}
			// css = css.replace(/\/{0,1}([a-zA-Z\d\_\-]+\.(png|gif|jpg|jpeg))\?ver\=[\d]+/g,function(a,b){ 
			// 	return b+"?ver="+(+new Date);
			// })
      //修改过的图片
			for(var j in dif){
				var r = regCreat(regFile)(j);
				listenFile = listenFile.replace(r,function(a,b){ 
          cssbgList.push(a);
          var date = new Date();
          var s = date.getFullYear()+""+(date.getMonth() + 1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()
          return a.replace(b,"")+"?_"+s;
        })
        // css = css.replace(r,function(a,b){
        //   var date = new Date();
        //   var s = date.getFullYear()+""+(date.getMonth() + 1)+""+date.getDate()+""+date.getHours()+""+date.getMinutes()
        //   return a.replace(b,"")+"?_"+s;
        // })
			}
      console.log("modify "+ options.file ,cssbgList,cssbgList.length)//修改过css中的图片
			if(!isEmptyObject(dif)){// 没有改变的图片
				grunt.file.write(options.file, listenFile);
				console.log("File  ",options.file,"created")
			}
		}
		if(file.dest && hashes && !isEmptyObject(dif)) {
	        // Write the destination file.
	        grunt.file.write(file.dest, options.formatter.call(self, hashes, options.banner));
          console.log("File  ",file.dest,"created")
	      } else {
	        grunt.verbose.writeln('Not writing output file.');
	      }
	});
  });
};
