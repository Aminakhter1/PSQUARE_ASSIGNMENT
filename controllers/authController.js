import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production
const JWT_EXPIRES_IN = '2h';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
console.log(req.body);
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully.' });
};