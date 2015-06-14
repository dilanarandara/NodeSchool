var mongose = require('mongoose'),
    Schema = mongose.Schema;

var StudentSchema = new Schema({
    firstName: {
        type : String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        index : true,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    age: Number,
});

mongose.model('Student', StudentSchema);