import authModel from "../models/authModel.js";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import {promisify} from 'util'
import dotenv from 'dotenv'
dotenv.config({path:'./.env'})

//procedimiento para el registro
export const register = async(req, res) =>{
    try {
        const name = req.body.name
        const user = req.body.user
        const pass = req.body.pass
        const passHash = await bcryptjs.hash(pass, 8)
        await authModel.create({
            user: user,
            name: name,
            pass: passHash,
        })
        res.json({
            "message": "¡REGISTRO CREADO!"
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res)=> {
    try {
        let{user , pass}= req.body
        if (!user||!pass) {
            res.render('login', {
                alert: true,
                alertTitle: 'Advertencia',
                alertMessage: 'Ingrese su usuario y su contraseña',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            const person = await authModel.findOne({
                where:{
                    user:user
                }});
                if (!person) {
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Advertencia',
                        alertMessage: 'Ingrese su usuario y su contraseña',
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }else{
                    if(bcryptjs.compareSync(pass,person.pass)){
                        const id = person.id
                        const token = jwt.sign({id:id}, process.env.JWT_SECRET)

                        const cookiesOptions = {
                            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
                            httpOnly: true
                        }
                        res.cookie('jwt', token, cookiesOptions)
                        res.render('login', {
                            alert: true,
                            alertTitle: 'Conexion Exitosa',
                            alertMessage: 'Login correcto',
                            alertIcon: 'succes',
                            showConfirmButton: false,
                            timer: 1000,
                            ruta: ''
                        })
                    }else{
                        res.render('login', {
                            alert: true,
                            alertTitle: 'Advertencia',
                            alertMessage: 'Contraseña Incorrecata',
                            alertIcon: 'info',
                            showConfirmButton: false,
                            timer: false,
                            ruta: 'login'
                        })
                    }
                }

        }

    } catch (error) {
        console.log(error)
    }
}

export const isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)
            const results =await authModel.findAll({
                where:{
                    id:decodificada.id
                }
            })
                if (!results) {
                    return next()
                }
                req.user = results[0]
                return next()
            } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/login')
    }
}

export const logout = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/')
}