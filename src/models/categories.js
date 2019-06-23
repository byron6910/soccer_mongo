const mongoose=require('mongoose');
const {Schema}=mongoose;

const schemaCategory=new Schema({
    name:{type:String,required:true},
    gender:{type:String,require:true},
})

module.exports=mongoose.model('Category',schemaCategory);