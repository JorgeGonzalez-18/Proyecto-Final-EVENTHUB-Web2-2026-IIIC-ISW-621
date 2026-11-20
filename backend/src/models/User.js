const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Nombre completo obligatorio"],
            trim: true,
            minLength: [2, "El nombre debe tener al menos 2 caracteres"],
            maxLength: [40, "El nombre no puede exceder los 40 caracteres"],
        },
        email: {
            type: String,
            required: [true, "Correo obligatorio"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Por favor ingrese un correo electrónico válido",],
        },
        password: {
            type: String,
            // no obligatorio con google
            required: function () {
                return this.authProvider === "local";
            },
            minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
            select: false, // Nunca se retorna en los queries normales
        },
        role: {
            type: String,
            enum: {
                values: ["admin", "organizer", "attendee"],
                message: "Rol incorrecto, solo: admin, organizer, attendee",
            },
            default: "attendee",
        },
        avatar: {
            type: String,
            default: null,
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        googleId: {
            type: String,
            default: null,
        },
        isEmailVerified: {
            type: Boolean,
            dfault: false,
        },
        emailVerificationToken: {
            type: String,
            dafault: null,
            select: false,
        },
        emailVerificationExpires: {
            type: Date,
            dafault: null,
            select: false,

        },
        //un solo uso con tiempo limite
        passwordResetToken: {
            type: String,
            dafault: null,
            select: false,

        },
        passwordResetExpires: {
            type: Date,
            dafault: null,
            select: false,
        },
        refreshTokens: {
            type: [String],
            default: [],
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

//hasheo automatico para la contresena antes de guardar
userSchema.pre("save", async function () {

    //se hashea solo si passwor es nuevo o se modifica
    if (!this.isModified("password") || !this.password) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//comparar password de mansera segura

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

//ocultar campos sensibles al serializar a json
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.passwordResetToken;
    delete userObject.passwordResetExpires;
    delete userObject.emailVerificationToken
    delete userObject.emailVerificationExpires
    delete userObject.refreshTokens;
    return userObject;
};

module.exports = mongoose.model("User", userSchema);