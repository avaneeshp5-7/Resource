const mongoose=require('mongoose');
const VendorSchema=new mongoose.Schema({
    vendor_id:mongoose.Schema.Types.ObjectId,
    vendor:{
    type: String,
    require: true
 }
}); 

module.exports=mongoose.model('vendor',VendorSchema);