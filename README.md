# grunt-filechange

> change css files background version

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
In your project's Gruntfile, add a section named `filechange` to the data object passed into `grunt.initConfig()`.

```js
options.css:  Css to modify the version number change
src:  Monitor image file
dest:  generate MD5 image jsonfile
grunt.initConfig({
  filechange: {
		options: {
		  css:"output/css/min.base.css"
		},
		files: {
			'output/imgjson.json': ['v2/images']
		}
  },
})
```

### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

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

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  filechange: {
    options: {
      css:"**.css"
      punctuation: ' !!!',
    },
    files: {
      'output/imgjson.json': ['v2/images'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
