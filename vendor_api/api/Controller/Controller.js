const VendorSchems = require('../model/Vendor.Modal');
const ResourceSchema = require('../model/Resource.Model');

const mongoose = require('mongoose');

exports.createVendor = async (req, res, next) => {
    const rowData = req.body;
    const findVendor = await VendorSchems.findOne({ vendor: req.body.vendor });
      if (findVendor) {
        res.status(500).json({
            status: 500,
            success: false,
            message: 'Vendor exist!'
        });
    } else {
        const vendor = new VendorSchems({
            vendor_id: new mongoose.Types.ObjectId(),
            vendor: rowData.vendor
        })
        vendor.save().then(result => {
            res.status(201).json({
                status: 201,
                success: true,
                message: 'New vendor created!',
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                status: 500,
                success: false,
                message: 'No vendor created!',
                err: err
            });
        })
    }
}

exports.Vendors = async (req, res, next) => {
    const vendors = await VendorSchems.find();
    if (vendors) {
        res.status(201).json({
            status: 200,
            success: true,
            message: 'vendors records!',
            result: vendors
        });
    } else {
        res.status(500).json({
            status: 500,
            success: false,
            message: 'No record found!',
            err: err
        });
    }
}

exports.createResources= async (req,res,next)=>{
    const rowData=req.body;
    console.log(rowData)
    const resources=await ResourceSchema.findOne({full_name:req.body.full_name}); 
    if(resources){
        res.status(500).json({
            status:500,
            success:false,
            message:'resource exist!'
        });
    }else{
        const resource=new ResourceSchema({
            resource_id: new mongoose.Types.ObjectId(),
            full_name:rowData.full_name,
            resume:req.file.filename,
            vendor_name:rowData.vendor_name,
            technology:rowData.technology
        })
        resource.save().then(result=>{
            res.status(201).json({
                status:201,
                success:true,
                message:'New resource created!',
                result:result
            });
        }).catch(err=>{
            res.status(500).json({
                status:500,
                success:false,
                message:'No vendor created!',
                err:err
            });
        })
    }
}

exports.Resources= async (req,res,next)=>{
    const resources=await ResourceSchema.find();
    if(resources){
       res.status(201).json({
           status:200,
           success:true,
           message:'resources records!',
           result:resources
       });
    }else{
       res.status(500).json({
           status:500,
           success:false,
           message:'No record found!',
           err:err
       });
    }
   }