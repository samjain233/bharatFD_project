import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/sambharat`,
        );
        console.log(
            `MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        console.log("MONGODB connection error ", error);
    }
};

export default connectDB;
