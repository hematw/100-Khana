import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide first name!"],
  },
  profileImage: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    required: [true, "Please provide first name!"],
  },
  governmentId: {
    type: String,
    required: [true, "Please provide first name!"],
  },
});

export default mongoose.model("Profile", ProfileSchema);
