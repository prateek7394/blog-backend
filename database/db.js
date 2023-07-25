import mongoose from "mongoose";

// For establishing connection with the database

 const Connection = async (URL) => {
    try{
        await mongoose.connect(URL, { useNewUrlParser: true});
        console.log('Database connected successfully!')
    }
    catch(error){
        console.log('Something went wrong!', error)
    }
}

export default Connection;