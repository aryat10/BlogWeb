import mongoose from "mongoose";
 const connection = async(username,password) => {
  // This will establish a conection between the database
  const URL = `mongodb://${username}:${password}@blog-app-shard-00-00.a197g.mongodb.net:27017,blog-app-shard-00-01.a197g.mongodb.net:27017,blog-app-shard-00-02.a197g.mongodb.net:27017/?ssl=true&replicaSet=atlas-1372nt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-App`;
  try {
    await mongoose.connect(URL); // connection string which will return a promise 
    console.log("Database connected 🍀")
  } catch (error) {
    console.log("Error with the Database",error)
  }
};


export default connection
