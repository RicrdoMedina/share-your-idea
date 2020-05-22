const mongoose = require("mongoose");
const { Schema } = mongoose;

// En la prop de author se esta relacionando con el modelo user igual con la prop comments se relaciona con el modelo comment
// En la prop de author la propiedad ref usa el nombre que se uso al crear el modelo en mongoose.model("user", UserSchema) igual para comment
// El autopopulate es para que cada vez que se traiga una idea venga con la informacion de su autor y comentarios.
const IdeaSchema = new Schema({
  idea: { type: String, required: true },
  description: { type: String },
  upvotes: [{ type: Boolean }],
  downvotes: [{ type: Boolean }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    autopopulate: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: true,
      autopopulate: true,
    },
  ],
});

IdeaSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("idea", IdeaSchema);
