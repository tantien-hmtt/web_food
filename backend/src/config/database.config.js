import { mongoose,connect, set } from 'mongoose';
const PASSWORD_HASH_SALT_ROUNDS = 10;
set('strictQuery', true);


export const dbconnect = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connect successfully---');
    
  } catch (error) {
    console.log(error);
  }
};



