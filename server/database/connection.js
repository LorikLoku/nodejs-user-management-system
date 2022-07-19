//mundeson lidhjen e app me mongodb

const mongoose = require('mongoose');

const connectDB = async () => {
    try{
      // mongodb connection string
      const con = await mongoose.connect(process.env.MONGO_URI); //e merr MONGO_URI te config.env

      console.log(`MongoDB connected : ${con.connection.host}`); //shfaq ne console databazen me te cilen jemi lidhur
    }catch(err){
        console.log(err);                                        //kthen error ne rast deshtimi te lidhjes
        process.exit(1);                                         //nderpritet procesi
    }
}

module.exports = connectDB