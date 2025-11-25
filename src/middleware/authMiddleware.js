const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.protect = async (req, res, next) => {
let token = null;
const authHeader = req.headers.authorization;
if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ message: 'Token não fornecido' });


try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.id).select('-password');
if (!user) return res.status(401).json({ message: 'Usuário inválido' });
req.user = { id: user._id.toString(), role: user.role };
next();
} catch (err) {
return res.status(401).json({ message: 'Token inválido ou expirado' });
}
};