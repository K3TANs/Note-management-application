import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateTokens.js';
import User from '../models/userSchema.js';

export const signup = async (req,res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username: username });

        if (user) {
            return res.status(400).json({ error: "Username already exist" });
        }

        // Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            fullname,
            username,
            password: hashpassword,
            gender,
        })

        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
            })
        }
        else {
            res.status(500).json({ error: "invalid user data" })
        }


    }
    catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req,res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "invalid username or password" });
        }

        
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
        });

    }
    catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie("ntoken", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" })
    }
    catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}