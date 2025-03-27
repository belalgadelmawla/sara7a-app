import mongoose from "mongoose";


const coonectionDB = async () => {
    try {
            await mongoose.connect(process.env.DB_URI, {
                serverSelectionTimeoutMS: 50000,
             // tls: true,
            // tlsAllowInvalidCertificates: true,
        });
        console.log("database connected successfully");
    } catch (error) {
        console.log("Error connecting", error);
    }
}
export default coonectionDB;

