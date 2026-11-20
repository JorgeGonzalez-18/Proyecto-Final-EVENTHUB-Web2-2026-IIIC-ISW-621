//generar errores con código de estado HTTP
const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// Middleware centralizado de errores
const errorHandler = (err, req, res, next) => {
    //JSON mal formado en el body 400
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res
            .status(400)
            .json({ error: "Cuerpo de la peticion contiene un JSON mal formado" });
    }

    // Errores de validación de Mongoose 400
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({ error: messages.join(", ") });
    }

    // ID de MongoDB inexistente o inválido CastError 404
    if (err.name === "CastError") {
        return res.status(404).json({ error: "Recurso no encontrado" });
    }

    //Clave duplicada en Mongo indices unicos repetidos 409
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || "campo";
        return res
            .status(409)
            .json({ error: `Ya existe un registro con ese ${field}` });
    }

    //Errores personalizados o error interno
    const status = err.statusCode || err.status || 500;
    return res.status(status).json({
        error: err.message || "Error interno del servidor",
    });
};

module.exports = {
    createError,
    errorHandler,
};