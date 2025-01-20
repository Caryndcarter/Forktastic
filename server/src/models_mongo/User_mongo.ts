import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';


export interface UserDocument extends Document {
    id: number;
    userName: string;
    userEmail: string;
    userPassword: string;
    intolerance: string; 
    diet: string; 
    favIngredients: string; 
    isCorrectPassword(password: string): Promise<boolean>;
  }
  
  const userSchema = new Schema<UserDocument>(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
      },
      userEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
      },
      userPassword: {
        type: String,
        required: true,
      },
      intolerance: {
        type: String, 
        required: false, 
      }, 
      diet: {
        type: String, 
        required: false
      }, 
      favIngredients: {
        type: String, 
        required: false
      }
    },
    // set this to use virtual below
    {
      toJSON: {
        virtuals: true,
      },
    }
  );
  
  // hash user password
  userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.userPassword = await bcrypt.hash(this.userPassword, saltRounds);
    }
  
    next();
  });
  
  // custom method to compare and validate password for logging in
  userSchema.methods.isCorrectPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
  };
  
  
  const User = model<UserDocument>('User', userSchema);
  
  export default User;
  