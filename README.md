# grunt-filechange

> 改变你的文件版本号

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filechange --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filechange');
```

## The "filechange" task
### Overview
在你的 Gruntfile 文件里, 增加 `filechange`  执行 `grunt.initConfig()`.

```js
css:  css文件里边有图片地址 (Css to modify the version number change)
src: image文件夹 (Monitor image file)
dest:  生成一个 MD5 图片 json 文件 (generate MD5 image jsonfile)
grunt.initConfig({
  filechange: {
		options: {
		  css:"output/css/min.base.css" /*页面中的css*/
		},
		files: {
			'output/imgjson.json': ['v2/images'] /*修改过的图片文件夹 和生成一个md5表*/
		}
  },
})
```
### Options
#### options.separator
options.css:文件名
files[json文件]:[图片文件夹]
#### Default Options
```js
grunt.initConfig({
  filechange: {
    options: {
		css:"output/css/min.base.css"
	},
    files: {
      'output/imgjson.json': ['v2/images'],
    },
  },
})
```
## Release History
NPM:https://www.npmjs.org/package/grunt-filechange
=======
grunt-filechange
================

