//importar la conexion BD
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const authModel = db.define('users',{
    user: { type: DataTypes.STRING},
    name: { type: DataTypes.STRING},
    pass: { type: DataTypes.STRING},
})
export default authModel