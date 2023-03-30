const mongoose = require("mongoose");
  const connection=mongoose.connect(process.env.DB,{useNewUrlParser: false}).
  then(() => console.log("DB is Connected....")).
  catch(err => console.log(err))

module.exports=connection;