import axios from 'axios';
import fs from 'fs'
import FormData from 'form-data'
import userModel from "../models/userModel.js"

//controller function to remove bg from image

const removeBgImage = async (req,res) => {
    try{

        const {clerkID} = req.body

        const user = await userModel.findOne({clerkID})

        if(!user){
            return res.json({ success:false, message:"user Not Found"})
        }

        if(user.creditBalance === 0){
             return res.json({success:false, message:"Not Enough Credits", creditBalance:user.creditBalance})
        }

        const iamgePath = req.file.path;

        //reading the image file
        const imageFile = fs.createReadStream(iamgePath)

        const formdata = new FormData()
        formdata.append('image_file',imageFile)

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formdata,{
            headers:{
                'x-api-key':process.env.CLIPDROP_API
            },
            responseType:'arraybuffer'
        })

        const base64Image = Buffer.from(data,'binary').toString('base64')

        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        res.json({success:true, resultImage, creditBalance:user.creditBalance-1, message:'bg removed'})

    }catch(error){
        console.error('Credits fetch error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {removeBgImage}