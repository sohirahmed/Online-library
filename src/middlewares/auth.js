import jwt from 'jsonwebtoken';
import Admin from '../../db/models/admin.model.js';
import Student from '../../db/models/student.model.js';

export const auth = () => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers;

            if (!token) {
                return res.status(400).json({ msg: "Token not found" });
            }
            if (!token.startsWith(process.env.bearerKey)) {
                return res.status(400).json({ msg: "Token not valid" });
            }
            const newToken = token.split(process.env.bearerKey)[1];
            if (!newToken) {
                return res.status(400).json({ msg: "Token not valid" });
            }
            const decoded = jwt.verify(newToken, process.env.signatureKey);

            let user;
            user = await Admin.findById(decoded.id) || await Student.findById(decoded.id);
            if (!user) {
                return res.status(400).json({ msg: "Not authorized" });
            }

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(400).json({ msg: "Catch error", error });
        }
    }
};
