import mongoose, { Model, Schema, Document } from 'mongoose';
import { PasswordManager } from '../services/password';

/**
 * An interface that describes the properties
 * that are required to create a new User
 **/
interface IUserAttrs {
  email: string;
  password: string;
}

/**
 * An interface that describes the properties
 * that a User Model has
 **/
interface IUserModel extends Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}

/**
 * An interface that describes the properties
 * that a User Document has
 * */
interface IUserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };
