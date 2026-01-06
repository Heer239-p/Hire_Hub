// Test script to check payment data structure
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Payment from './backend/src/models/Payment.js';
import User from './backend/src/models/User.js';
import Job from './backend/src/models/Job.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testPaymentData = async () => {
  try {
    console.log('Fetching payments with populated data...');
    
    const payments = await Payment.find()
      .populate("employer", "firstName lastName email")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(5);
      
    console.log(`Found ${payments.length} payments:`);
    
    payments.forEach((payment, index) => {
      console.log(`\n--- Payment ${index + 1} ---`);
      console.log('Payment ID:', payment._id);
      console.log('Transaction ID:', payment.transactionId);
      console.log('Amount:', payment.amount);
      console.log('Status:', payment.status);
      console.log('Payment Method:', payment.paymentMethod);
      console.log('Created At:', payment.createdAt);
      
      if (payment.employer) {
        console.log('Employer ID:', payment.employer._id);
        console.log('Employer First Name:', payment.employer.firstName);
        console.log('Employer Last Name:', payment.employer.lastName);
        console.log('Employer Email:', payment.employer.email);
      } else {
        console.log('No employer data');
      }
      
      if (payment.job) {
        console.log('Job ID:', payment.job._id);
        console.log('Job Title:', payment.job.title);
      } else {
        console.log('No job data');
      }
    });
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
};

testPaymentData();