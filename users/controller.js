const AppError = require('./utils'); 
const User = require('./user_model');

exports.welcome = (req,res,next) => {
    res.status(200).json({
        status : 'success',
        data : null,
        message : "welcome"
    })
}

exports.signup =  async (req,res,next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password)
            throw new AppError('provide email and password',400)

        const ck = await User.findOne({
            email : email
        });

        if(ck)
            throw new AppError('user email exist already',400);

        const user = await User.create({
            email : email,
            password : password
        });

        user.password = null

        res.status(200).json({
            status : 'success',
            data : {
                user
            }
        })
    } catch(err) {
        next(err);
    }
}

exports.login = async (req,res,next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password)
            throw new AppError('provide email and password',400)

        const user = await User.findOne({
            email : email
        }).select('password');

        if(!user)
            throw new AppError('user email not found',404);

        if(!(await user.checkPassword(password,user.password)))
            throw new AppError('password wrong',401);

        user.password = null

        res.status(200).json({
            status : 'success',
            data : {
               user
            }
        })
    } catch(err) {
        next(err)
    }
}