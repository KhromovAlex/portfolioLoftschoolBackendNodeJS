const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	SkillSchema = new Schema({
		name: {
			type: String
		},
		perc: {
			type: Number,
			default: 0
		},
		type: {
			type: Number
		}
	});

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('skill', SkillSchema);
