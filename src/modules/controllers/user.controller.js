import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Admin from '../../../db/models/admin.model.js';
import Student from '../../../db/models/student.model.js';
import { asyncHandler } from '../../utils/globalErrorHandling.js';


//=========================signUp===============================
export const signUp = asyncHandler(async (req, res , next) => {
    try {
        const { name, email, password, role } = req.body;
        if (role !== 'admin' && role !== 'student') {
            return res.status(400).json({ msg: "Invalid role. Only 'admin' or 'student' are allowed." });
        }
        const userExist = role === 'admin' ? await Admin.findOne({ email }) : await Student.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = role === 'admin'
            ? new Admin({ name, email, password: hashedPassword })
            : new Student({ name, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ msg: "Sign up successful", user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Catch error", error });
    }
});

//=========================signIn===============================
export const signIn = asyncHandler(async (req, res, next) => {
    try {
        const { email, password} = req.body;

        let user = await Admin.findOne({ email });
        if (!user) {
            user = await Student.findOne({ email });
        }
        if (!user) {
            return res.status(400).json({ msg: "Email not found" });
        }
        const match = bcrypt.compareSync(password, user.password); 
        if (!match) {
            return res.status(400).json({ msg: "Password does not match" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.signatureKey, { expiresIn: '2w' });
        res.status(200).json({ msg: "Login successful", token , role: user.role});

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error occurred during sign in", error });
    }
});

