import mongoose = require('mongoose');
const db: string | any = process.env.db
const Connect = async () => {
  try {

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Successfully connected to the DataBase');

  }
  catch {
    console.log('got an error while connecting to the database');

  }
}
export default Connect;
