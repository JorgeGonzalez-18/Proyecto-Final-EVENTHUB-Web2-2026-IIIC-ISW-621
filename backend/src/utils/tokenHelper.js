const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//genera un token jwt de acceso por un corto tiempo
//validaciones rapidas con id y rol del user

const generateAccesToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user._role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "15m",
        },
    );
};
//refresca el token por 7 dias  para renovar sesion de user sin pedir contasena de nuevo
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        },
    );
};


const verifyAccesToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET)
};


const generateRandomToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex"); //token en texto plano que se envia al user por email en el enlace
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");//hash sha256 que se guarda en mongo owasp

    return { rawToken, hashedToken };
};

//hashea el toke que recibe para compararlo con el de la db
const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

module.exports = {
    generateAccesToken,
    generateRefreshToken,
    verifyAccesToken,
    verifyRefreshToken,
    generateRandomToken,
    hashToken,
};