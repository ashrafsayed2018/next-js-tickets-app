import mongoose, { Schema } from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

const UserSchema = new Schema({
  email: String,
  password: String,
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
