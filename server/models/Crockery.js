import mongoose from 'mongoose';

const crockerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      // required removed to make it optional
    },
  },
  { timestamps: true }
);

const Crockery = mongoose.model('Crockery', crockerySchema);
export default Crockery;
