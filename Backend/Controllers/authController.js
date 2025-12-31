import userModel from '../Model/user.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// REGISTER / SIGNUP
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("reached")
        console.log(req.body);

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
         console.log(req.body);
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Auth failed, email or password is wrong",
                success: false
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(403).json({
                message: "Auth failed, email or password is wrong",
                success: false
            });
        }

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            },
            accessToken:token
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};



// REFRESH TOKEN
export const refresh = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(400)
            .json(
                  { 
                    message: "Token missing", 
                    success: false 
                  });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid token", success: false });

             const newToken=jwt.sign(
                  {_id:user._id ,email:user.email},
                  process.env.JWT_SECRET,
                  {expiresIn:'24h'}


             )
             res.status(200).json({
                token:newToken,
                success:true
             })
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// GET PROFILE
export const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        if (!user)
        {
              return res.status(404).json({ message: "User not found", success: false });
        } 
           

        res.status(200).json({ user, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
        res.status(200).json({ user: updatedUser, success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

