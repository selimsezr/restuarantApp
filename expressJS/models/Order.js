const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a content"],
    minlenght: [10, "Please provide a title at least 10 characters"],
    unique: true,
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  orderStatus: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    }
  ],

});

OrderSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

OrderSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacment: "-",
     remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};
module.exports = mongoose.model("Order", OrderSchema);