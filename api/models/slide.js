const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  SlideSchema = new Schema({
    name: {
      type: String,
      required: [true, "Укажите имя проекта"]
    },
    tech: {
      type: String,
      required: [true, "Укажите используемые технологии"]
    },
    picture: {
      type: [String]
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model("slide", SlideSchema);
