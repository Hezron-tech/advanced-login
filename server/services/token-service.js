const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '30m'
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });

        return { accessToken, refreshToken }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({ user: userId })

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }

        const token = TokenModel.create({ user: userId, refreshToken });
        return token;
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
       
        try {
            const userData = jwt.verify(token.toString(), process.env.JWT_REFRESH_SECRET);

            return userData;
        } catch (error) {
            return null
        }
    }

    async findToken(token) {
        try {
            const tokenData = await TokenModel.findOne({ refreshToken: token })
            return tokenData
        } catch (error) {
            return null
        }
    }
}

module.exports = new TokenService();