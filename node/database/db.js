import { Sequelize } from 'sequelize';
import { 
    DB_DATABASE,
    DB_HOST,
    DB_PASS,
    DB_USER,
    DB_PORT
 } from '../config.js';
const db= new Sequelize(DB_DATABASE, DB_USER,DB_PASS,{
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT
})


export default db