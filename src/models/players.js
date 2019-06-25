const mongoose=require('mongoose');
const{Schema}=mongoose;

const schemaPlayer=new Schema({
    ci:{type:String,required:true},
    name:{type:String,required:true},
    last_name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    birthday:{type:Date,require:true},
    team:{type:String,required:true},
    number_player:{type:Number,required:true},
    address:{type:String,require:true},
    photo:{type:String}


});

module.exports=mongoose.model('Player',schemaPlayer);