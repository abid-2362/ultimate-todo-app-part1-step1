import * as mongoose from 'mongoose';
class DBConnection {
  public connect() {
    mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true})
    .then(connection => {
      console.log('MongoDB connected');
    })
    .catch(err => {
      console.log('db connection error', err);
    });
  }
}

export default DBConnection;