import express  from "express";
import cors  from 'cors'
import dotenv from 'dotenv'
import db from "./database/db.js";
import blogRoutes from './routes/routes.js'

const app = express();
app.use( cors())
app.use(express.json())
app.use('/blogs', blogRoutes)
dotenv.config({path:'./.env'})

try {
    await db.authenticate()
    console.log('Conexion Exitosa')
} catch (error) {
    console.log(`Error: ${error}`)
}
const port = process.env.PORT;


app.listen(port, ()=>{
    console.log(`Server UP running in http://localhost:${port}/`)
} )