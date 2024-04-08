import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

export interface UserEntity extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  imageUrl: string;
  imageId: string;
}

interface UserModel extends mongoose.Model<UserEntity> {}

/**
 * Defines the schema for the User entity.
 */
export const UserSchema = new mongoose.Schema<UserEntity, UserModel>(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true },
      validate: [isEmail, 'invalid email'],
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imageId: { type: String, required: true },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt fields
  },
);

/**
 * Indices for uniqeness
 */

export const UserUniqueEmailIndex = 'email_1';

UserSchema.index({ email: 1 }, { unique: true });

/**
 * Middleware function that automatically hashes the password before saving it to the database.
 */
UserSchema.pre('save', async function (next) {
  const user: any = this; // 'this' refers to the user document

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
export default mongoose.model('User', new mongoose.Schema(UserSchema as any));
