import mongoose from 'mongoose';

const connectionDB = async () => {
    return await mongoose
    .connect(process.env.DB_URL_Online)
    .then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Database connection error:", err);
    });
};

export default connectionDB;
