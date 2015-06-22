"use strict";

var M2X = require("m2x"),
  I2C = require("i2c"),
  Promise = require("promise"),
  Async = require('async'),
  config = require("./config.js");

var m2xClient = new M2X(config.m2x_api_key),
  censor = new I2C(config.address, {device: config.device});

var consolelog = function (message) {
  if (process.env.NODE_DEBUG) {
    console.log(message);
  }
};
var consoleerror = function (message) {
  console.error(message);
};

// see: http://yamaryu0508.hatenablog.com/entry/2014/12/05/080000

/**
 * センサーの温度を取得します
 * @param {TemperatureCallback} cb - コールバック
 */
var readTemperature = function (cb) {
  censor.readBytes(0x00, 2, function (err, data) {
    if (err != null) {
      consoleerror(err);
    }

    // flip endian(0x1234 -> 0x3412) and cut off lower 3bit
    var temp = (data[0] << 8 | data[1]) >> 3;
    if (temp >= 4096) {
      temp -= 8192;
    }

    var value = temp * 0.0625; // todo: magic number

    consolelog("Temp: " + value + " ℃");
    cb(value);
  });

  /**
   * 温度取得後にコールバックされる関数
   * @callback TemperatureCallback
   * @param {number} value
   */
};

/**
 *
 * @param {object} client - m2xclient
 * @param {string} deviceKey
 * @param {string} streamName
 * @param {number} value
 * @returns {Promise} Promise - 成否のPromise
 */
var sendM2X = function (client, deviceKey, streamName, value) {
  return new Promise(function (resolve, reject) {
    var at = new Date().toISOString();
    client.devices.postValues(deviceKey, streamName, [{value: value, timestamp: at}], function (result) {
      consolelog(result);

      if (result.isError()) {
        consoleerror(result.error());
        reject(result.error());
      } else {
        resolve(result.json);
      }
    });
  });
};

Async.forever(function (cb) {
  Async.series([
    function (cb) {
      readTemperature(function (value) {
        return sendM2X(m2xClient, config.m2x_device_key, config.m2x_stream_name, value);
      });
      setTimeout(cb, config.interval);
    }
  ], cb);
}, function (err) {
  consoleerror(err);
});