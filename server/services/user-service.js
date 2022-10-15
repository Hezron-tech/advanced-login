const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const TokenModel = require('../models/token-model');

class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest('This user already have::: ' + email);
        }

        const activationLink = uuid.v4();
        const hashedPassword = await bcrypt.hash(password, 3);

        const user = await UserModel.create({ email, password: hashedPassword, activationLink });

        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user); // id email isActivated
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest('Wrong activation link!');
        }

        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });

        if (!user) {
            throw ApiError.BadRequest('Email not found');
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            throw ApiError.BadRequest('Wrong password');
        }

        const userDto = new UserDto(user);

        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }

    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        // TOKENIN DUZGUN OLMAGI
        const userData = tokenService.validateRefreshToken(refreshToken);


        // TOKENIN VAR OLMAGI
        const tokenFromDb = await tokenService.findToken(refreshToken);
       

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });


        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto }

    }

    async getAllUsers() {
        const users = await UserModel.find();

        return users;
    }
}

module.exports = new UserService();