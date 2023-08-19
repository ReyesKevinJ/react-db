import express  from "express";
import cors  from 'cors'
import db from "./database/db.js";
import blogRoutes from './routes/routes.js'
import { PORT } from "./config.js";
const app = express();

app.use( cors())
app.use(express.json())
app.use('/blogs', blogRoutes)


app.listen(PORT, ()=>{
    console.log(`Server UP running in http://localhost:${PORT}/`)
} )
