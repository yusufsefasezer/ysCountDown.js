(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.ysCountDown = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

  'use strict';

  //
  // Shared Methods
  //

  /**
   * Check if browser supports required methods.
   * @private
   * @return {Boolean} Returns true if all required methods are supported.
   */
  var supports = function () {
    return (
      'addEventListener' in window
    );
  };

  /**
  * Check `date` is a Date.
  * @private
  * @param {Object} date The date to check.
  * @returns {Boolean} Returns `true` if `date` is a Date, else `false`.
  */
  var isDate = function (date) {
    return date instanceof Date && !isNaN(date);
  };

  //
  // Plugin Constructor
  //

  /** 
   * Plugin Object
   * @param {Object} opts User settings
   * @constructor
   */
  var Plugin = function (fDate, cb) {

    //
    // Plugin Variables
    //

    var publicAPIs = {};
    var finalDate = null;
    var callback = null;
    var interval = null;
    var remaining = null;
    var finished = false;

    //
    // Plugin Methods
    //

    /**
     * Initialize Plugin.
     * @public
     * @param {Object} options User settings
     */
    publicAPIs.init = function (fDate, cb) {

      // Feature test
      if (!supports()) throw 'ysCountDown: This browser does not support the required JavaScript methods.'

      // Destroy any existing initializations
      publicAPIs.destroy();

      // Set finalDate
      finalDate = (typeof fDate === 'string') ? new Date(fDate) : fDate;

      // Check if a valid date
      if (!isDate(finalDate)) throw new TypeError('ysCountDown: Please enter a valid date.');

      // Check if a valid callback
      if (typeof cb !== 'function') throw new TypeError('ysCountDown: Please enter a callback function.');

      callback = cb;

      // Start the countdown
      start();

    };

    /**
     * Destroy the current initialization.
     * @public
     */
    publicAPIs.destroy = function () {

      // Reset variables
      finalDate = null;
      callback = null;
      stop();
      remaining = null;
      finished = false;

    };

    /**
     * Calculate the remaining time.
     * @private
     */
    var calculate = function () {

      // Get current date
      var now = new Date();

      // Calculate totalSecsLeft
      var totalSecsLeft = Math.ceil((finalDate.getTime() - now.getTime()) / 1000);

      // Check if the countdown has elapsed
      if (totalSecsLeft <= 0) {
        finished = true;
        stop();
      }

      // Calculate the remaining time
      remaining = {
        seconds: totalSecsLeft % 60,
        minutes: Math.floor(totalSecsLeft / 60) % 60,
        hours: Math.floor(totalSecsLeft / 60 / 60) % 24,
        days: Math.floor(totalSecsLeft / 60 / 60 / 24) % 7,
        daysToWeek: Math.floor(totalSecsLeft / 60 / 60 / 24) % 7,
        daysToMonth: Math.floor(totalSecsLeft / 60 / 60 / 24 % 30.4368),
        weeks: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7),
        weeksToMonth: Math.floor(totalSecsLeft / 60 / 60 / 24 / 7) % 4,
        months: Math.floor(totalSecsLeft / 60 / 60 / 24 / 30.4368),
        monthsToYear: Math.floor(totalSecsLeft / 60 / 60 / 24 / 30.4368) % 12,
        years: Math.abs(finalDate.getFullYear() - now.getFullYear()),
        totalDays: Math.floor(totalSecsLeft / 60 / 60 / 24),
        totalHours: Math.floor(totalSecsLeft / 60 / 60),
        totalMinutes: Math.floor(totalSecsLeft / 60),
        totalSeconds: totalSecsLeft
      }

      // Run callback
      callback(remaining, finished);

    };

    /**
     * Starts the auto calculate.
     * @private
     */
    var start = function () {

      // if an interval already exists, disregard call
      if (interval) return;

      // create an interval
      interval = setInterval(function () {
        calculate();
      }, 100);

    };

    /**
     * Stops the auto calculate.
     * @private
     */
    var stop = function () {

      // if no interval exists, disregard call
      if (!interval) return;

      // clear the interval
      clearInterval(interval);
      interval = null;

    };

    //
    // Initialize plugin
    //

    publicAPIs.init(fDate, cb);

    //
    // Return the public APIs
    //

    return publicAPIs;

  };

  //
  // Return the Plugin
  //

  return Plugin;

});