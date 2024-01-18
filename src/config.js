const mongoose = require("mongoose");

module.exports = function () {
  const connect = mongoose.connect("mongodb://localhost:27017/ekaya");

  connect
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch(() => {
      console.log("Database cannot be connected");
    });
};
