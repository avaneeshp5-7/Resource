const mongoose=require('mongoose');

const ResourceSchema=new mongoose.Schema({
 resource_id:mongoose.Schema.Types.ObjectId,
 full_name:{
    type: String,
    require: true
 },
 resume:{
    type: String,
    require: true,
    unique:true
 },
 vendor_name:{
    type: String,
    require: true
 },
 technology:{
   type: String,
   require: true
}
});
module.exports=mongoose.model('resource',ResourceSchema);
