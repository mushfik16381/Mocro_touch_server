const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(404).json({ success: false, error: 'Email and Password is Required' });
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ success: false, error: 'user doesnt exist' });
    }

    if (user.email && user.password) {
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({ success: false, error: 'Invalid Password!' });
        }
        const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "2m",
        });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, {
            expiresIn: "10m",
        });

        res.json({ success: true, accessToken, refreshToken })

    }
};

const signup = async (req, res) => {
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone
    });

    user.save()
        .then(function (models) {
            res.json({ success: true, message: `Registerd Successfully` });
        })
        .catch(function (err) {
            console.log(err);
        });

}

module.exports = {
    loginUser,
    signup,
};