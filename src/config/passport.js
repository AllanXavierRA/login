import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";

import { User } from "../dao/model/users.js";


export const localStrategy = new LocalStrategy({
    usernameField: 'email',

}, async(email, password, done) => {

    const user = await User.findOne({email: email});
    if(!user){
        return done(null, false, {message: 'Usuario no encontrado'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user)
        }else{
            return done(null, false, {message: 'Password incorrecto'})
        }
    }

});


export const serializeUser = (user, done) => {
    done(null, user.id)
};

export const deserializeUser = (id, done) => {
    User.find(id, (err, user) => {
        done(err, user)
    });
};


export default passport;
