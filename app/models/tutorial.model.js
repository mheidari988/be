module.exports = (mongoose) => {
  const Tutorial = mongoose.model(
    "Tutorial",
    mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean,
      },
      { timestamps: true }
    )
  );

  return Tutorial;
};
