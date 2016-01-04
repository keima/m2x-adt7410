module.exports = {
  // App Configuration
  interval: 60 * 1000, // 60sec.

  // M2X Configuration
  m2x_api_key: "YOUR_API_KEY",
  m2x_device_key: "YOUR_DEVICE_KEY",
  m2x_stream_name: "YOUR_STREAM_NAME",

  m2x_stream_triggers: [
    {
      name: "YOUR_STREAM_TRIGGER_NAME",
      callback: function (value, exec) {
        if (value == "true") {
          exec("irsend SEND_ONCE MITSUBISHI_LG33 KEY_POWER_ON");
          return "true";
        } else if (value == "false") {
          exec("irsend SEND_ONCE MITSUBISHI_LG33 KEY_POWER_OFF");
          return "false";
        }
        return "null";
      }
    }
  ],

  // I2C Configuration
  device: "/dev/i2c-1",
  address: 0x48
};