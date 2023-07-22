const mongoose = require('mongoose')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    mongoose
      .connect(process.env.MONGODB_URI + process.env.DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }) 
      .then(() => {
        console.log('Connected to MongoDB')
        dbConnection = mongoose.connection
        return cb();
      })
      .catch((err) => {
        console.error(err)
        return cb(err)
      });
  },
  getDb: () => dbConnection
};