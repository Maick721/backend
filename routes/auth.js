const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

// MODELOS
const Cliente = require("../models/cliente");
const Administrador = require("../models/administrador");

const CLIENT_ID = "668331615499-re0ii95hug47ueqgqg7a3mp2rkr9ro26.apps.googleusercontent.com"; 
const client = new OAuth2Client(CLIENT_ID);

// Clave secreta de tokens
const JWT_SECRET = "CLAVE_SUPER_SECRETA_CAMBIAR";

router.post("/google", async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: "Falta credential" });
        }

        // Verificar token con Google
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture, sub } = payload;

        let user;

        user = await Administrador.findOne({ email });

        let role = "cliente";

        if (user) {
            role = "administrador";
        } else {

            user = await Cliente.findOne({ email });


            if (!user) {
                user = new Cliente({
                    nombre: name,
                    email,
                    foto: picture,
                    googleId: sub,
                });
                await user.save();
            }
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: role,
            },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            user: {
                id: user._id,
                email: user.email,
                nombre: user.nombre,
                foto: user.foto,
                role,
            },
            token,
        });

    } catch (error) {
        console.error("Error Google Login:", error);
        res.status(500).json({ message: "Error login Google" });
    }
});

module.exports = router;
