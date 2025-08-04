// seedAdmin.js (ROOT LEVEL)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // ✅ Added
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ DB connected');

    const existing = await Admin.findOne({ email: 'harshit.singla1416@gmail.com' });
    if (existing) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('harshit14012006', 10);

    const newAdmin = new Admin({
      email: 'harshit.singla1416@gmail.com',
      phone: '+919053716901',
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log('✅ Admin created successfully');

    // ✅ Generate JWT Token after saving
    const token = jwt.sign(
      {
        id: newAdmin._id,
        email: newAdmin.email,
        role: 'admin',
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('🔑 JWT Token:', token);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
