import mongoose from 'mongoose';
const ConnectDataBase=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo DB Connnected")
    } catch (error) {
        console.log("Mongo Db Connect Error ")
    }
}
export default ConnectDataBase;