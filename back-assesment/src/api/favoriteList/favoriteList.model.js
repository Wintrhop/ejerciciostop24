const { Schema, model, models } = require("mongoose");

const FavoriteListSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        favs:{
            type:[{
                title:{
                    type: String,
                    required: false,
                },
                description:{
                    type: String,
                    required:false,
                },
                link:{
                    type:String,
                    required:false,
                },
            }],
            required:false,
        },
        user:{
            type:Schema.Types.ObjectId, ref:'Users',
            required: true,
        }
    },{timestamps:true},
);

const FavoriteList  = model('FavoriteList', FavsSchema);

module.exports = FavoriteList;