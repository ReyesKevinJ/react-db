import express  from "express";
import cors  from 'cors'
import db from "./database/db.js";
import blogRoutes from './routes/routes.js'

const app = express();
const port = process.env.PORT;

app.use( cors())
app.use(express.json())
app.use('/blogs', blogRoutes)


app.listen(port, ()=>{
    console.log(`Server UP running in http://localhost:${port}/`)
} )