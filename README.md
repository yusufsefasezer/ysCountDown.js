# ysCountDown.js
A simple and easy-to-use countdown plugin.

## [Download](https://github.com/yusufsefasezer/ysCountDown.js/archive/master.zip) / [Demo](https://www.yusufsezer.com/projects/yscountdown-js/) / [yusufsezer.com](https://www.yusufsezer.com)

## Why should I use ysCountDown.js?
* No need any plug-in - does not need any plugin or library.
* Easy to use - Choose a date and start using it.
* Extensile - Extended time support.

## How to use

Compiled and production-ready code can be found in the `dist` directory. The `src` directory contains development code.

### 1. Include ysCountDown on your site

```html
<script src="path/to/yscountdown.js"></script>
```

### 2. Set end date
Choose a date that supports `JavaScript` in whatever format you like.

```javascript
var endDate = "2050/01/01";
```

### 3. Initialize ysCountDown
In the footer of your page, after the content, initialize ysCountDown. And that's it, you're done. Nice work!

```javascript
var myCountDown = new ysCountDown(endDate, function (remaining, finished) {

  if (finished) {
    
    // countdown finished

  } else {

    // do something

  }

});
```

**Example 1**

```javascript
var myCountDown = new ysCountDown("2050/01/01", function (remaining, finished) {

  if (finished) {
    
    document.body.innerHTML = "Expired";

  } else {

    document.body.innerHTML = remaining.hours + "h " + remaining.minutes + "m " + remaining.seconds + "s";

  }

});
```

**Example 2**

```javascript
var myCountDown = new ysCountDown(new Date("2050-01-01T12:05:55Z"), function (remaining, finished) {

  if (finished) {
    
    document.body.innerHTML = "Expired";

  } else {

    document.body.innerHTML = remaining.hours + "h " + remaining.minutes + "m " + remaining.seconds + "s";

  }

});
```

For more details visit [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

## ES6 Modules

ysCountDown does not have a default export, but does support CommonJS and can be used with native ES6 module imports.

```javascript
import('path/to/yscountdown.js')
  .then(function () {
    var myCountDown = new ysCountDown(endDate, function (remaining, finished) { });
  });
``` 

It uses a UMD pattern, and should also work in most major module bundlers and package managers.

## Working with the Source Files

If you would prefer, you can work with the development code in the `src` directory using the included [Gulp build system](http://gulpjs.com/). This compiles and minifies code.

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run one of the task runners to get going:
	* `gulp` manually compiles files.
	* `gulp watch` automatically compiles files.

## Parameters & Callback

You can pass final date and callbacks into ysCountDown through the `init()` function:

```javascript
var myCountDown = new ysCountDown(endDate, function (remaining, finished) { });
```

### Use ysCountDown events in your own scripts

You can also call ysCountDown events in your own scripts.

#### init()
Initialize ysCountDown. This is called automatically when you setup your `new ysCountDown` object, but can be used to reinitialize your instance.

```javascript
var myCountDown = new ysCountDown(endDate, myCallback);

myCountDown.init(myDate, myFunction);
```

#### destroy()
Destroy the current `ysCountDown.init()`. This is called automatically during the `init` function to remove any existing initializations.

```javascript
var myCountDown = new ysCountDown(endDate, function (remaining, finished) { });

myCountDown.destroy();
```

### Callback parameters
The callback function has two parameters.

The first parameter contains the following calculations related to the countdown.

| Parameters   |
|--------------|
| seconds      |
| minutes      |
| hours        |
| days         |
| daysToWeek   |
| daysToMonth  |
| weeks        |
| weeksToMonth |
| months       |
| monthsToYear |
| years        |
| totalDays    |
| totalHours   |
| totalMinutes |
| totalSeconds |

The second parameter indicates whether the countdown is over.

# License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details

Created by [Yusuf Sezer](https://www.yusufsezer.com)
