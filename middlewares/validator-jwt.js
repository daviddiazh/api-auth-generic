const jwt = require('jsonwebtoken');
const { config } = require("../config");

const validatorJWTUser = ( req, res, next ) => {

    const token = req.header('x-token');

    console.log(token);

    if( !token ){
        return res.status(401).json({ ok: false, msg: 'No hay token en la petición' });
    }

    try {

        const {name, role, email,} = jwt.verify(
            token,
            config.jwtSecret
        )

        req.name=name
        req.role=role
        req.email=email

        res.status(200).json({ ok: true, msg: 'Token valido', name, role, email } );

    } catch (error) {

        console.log(error.message)
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
        
    }

}

module.exports = validatorJWTUser;