const { Schema, model, models } = require("mongoose");

const FavsSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required:true,
        },
        link:{
            type:String,
            required:true,
        },
        user:{
            type:Schema.Types.ObjectId, ref:'Users',
            required: true,
        }
    },{timestamps:true},
);

const Favs  = model('Favs', FavsSchema);

module.exports = Favs;