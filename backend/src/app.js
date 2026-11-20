const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

//Middlewares de seguridad
app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        credentials: true,
    })
);

//Rate limiting global
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 150, // Límite de 150 peticiones por ventana por IP
    message: { error: "Demasiadas peticiones desde esta IP, intente de nuevo en 15 minutos" },
});
app.use("/api", limiter);

//Parser de JSON
app.use(express.json());

//prueba de salud endpoint de prueba para verificar que la API está funcionando correctamente
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "API EventHub en funcionamiento",
        timestamp: new Date().toISOString(),
    });
});

// aqui van las rutas

//Middleware centralizado de errores
app.use(errorHandler);

module.exports = app;