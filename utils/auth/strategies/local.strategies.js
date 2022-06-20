const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt')
const { findByEmail } = require('../../../services/user.service')

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
    }, async (email, password, done) => {
    try {
        const user = await findByEmail(email)

        if( !user ){
            done( new Error('Usuario o contraseña incorrectos. - Email'), false )
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if( !isMatch ){
            done( new Error('Usuario o contraseña incorrectos. - Password'), false )
        }
        let userLogin = user;
        userLogin = userLogin.toObject();
        delete userLogin.password
        done(null, userLogin)
    } catch (error) {
        done(error)
    }
});

module.exports = LocalStrategy;