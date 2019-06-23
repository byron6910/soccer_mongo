const mongoose=require('mongoose')
const {Schema}=mongoose;

const schemaTeam=new Schema({
    name:{type:String,require:true},
    category:{type:String,require:true},
    president:{type:String,require:true},
    date_f:{type:Date,require:true},
    email:{type:String,require:true},
    description:{type:String,require:true},
    phone:{type:Number,require:true,min:8}
});

module.exports=mongoose.model('Team',schemaTeam);

