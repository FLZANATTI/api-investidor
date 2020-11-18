const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://user_investir:gyhkpk21@sysmonstertech-dev.mixvg.mongodb.net/database-investidor?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
