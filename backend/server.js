import express from 'express'
import dotenv from 'dotenv'
import connect from './config/database.js'
import Routes from './routes/routes.js'
import cors from 'cors'

//testing git connection
dotenv.config();
const app = express();

connect();

app.use(cors())
app.use(express.json());

app.use("/api/v1", Routes);

const PORT = process.env.PORT  || 8000;
app.listen(PORT, () => {
    console.log(`api running at port ${PORT}`.yellow);
});