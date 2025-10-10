const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'Admin@gmail.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email:', existingAdmin.email);
      console.log('isAdmin:', existingAdmin.isAdmin);
      
      if (!existingAdmin.isAdmin) {
        existingAdmin.isAdmin = true;
        await existingAdmin.save();
        console.log('✅ Updated existing user to admin');
      }
    } else {
      // Create new admin user
      const admin = await User.create({
        name: 'Admin',
        email: 'Admin@gmail.com',
        password: 'Admin@1234',
        isAdmin: true,
        theme: 'dark'
      });

      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: Admin@gmail.com');
      console.log('🔑 Password: Admin@1234');
      console.log('👑 Admin Status: true');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

