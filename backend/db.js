const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://bch-database:creativegold@cluster0.atkeqsa.mongodb.net/items?retryWrites=true&w=majority'
mongoose.set('strictQuery', false);
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err)
      console.log(err);
    else {
      console.log("connected succsessfully");
      const fetched_data = await mongoose.connection.db.collection("notebooks");
      fetched_data.find({}).toArray(async function (err, data) {
        const notebookCategory = await mongoose.connection.db.collection("notebook_category");
        notebookCategory.find({}).toArray(function (err, catData) {
          if (err)
            console.log(err);
          else {
            global.notebooks = data;
            global.noteCateg = catData;
          }
        })
      })
    }
  });
}

module.exports = mongoDB;

