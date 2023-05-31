import mongoose from "mongoose";
import colors from 'colors';


const connect = async () => {

    try {
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected at ${conn.connection.host}`.bgYellow);
    } catch (error) {
        console.log(`couldn't connect to database`)
        console.log(error)
    }

}

export default connect;