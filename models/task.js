const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	tasktitle:{
		type:String,
		required:true
	}
})

module.exports = mongoose.model('Task',taskSchema);