// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     cloud_name : process.env.CLODINARY_CLOUD_NAME,
//     api_key : process.env.CLODINARY_API_KEY,
//     api_secret : process.env.CLODINARY_API_SECRET_KEY
// })

// const uploadImageClodinary = async(image)=>{
//     const buffer = image?.buffer || Buffer.from(await image.arrayBuffer())

//     const uploadImage = await new Promise((resolve,reject)=>{
//         cloudinary.uploader.upload_stream({ folder : "binkeyit"},(error,uploadResult)=>{
//             return resolve(uploadResult)
//         }).end(buffer)
//     })

//     return uploadImage
// }

// export default uploadImageClodinary
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// ✅ Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  });


  const bufferToStream = (buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  };


  const uploadImageToCloudinary = (file, folder) => {
    return new Promise((resolve, reject) => {
      if (!file || !file.buffer) {
        return reject(new Error("File is missing or does not have a buffer."));
      }
  
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `deal-swipe/${folder}`,
          public_id: `${Date.now()}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({ url: result.secure_url, result });
        }
      );
  
      bufferToStream(file.buffer).pipe(uploadStream);
    });
  };



  const uploadImageHandler = async (req, res) => {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: "File is missing or invalid." });
      }
  
      const cloudinaryResponse = await uploadImageToCloudinary(req.file, "Skill-links");
      
      return res.json({
        url: cloudinaryResponse.url,
        result: cloudinaryResponse.result,
      });
  
    } catch (error) {
      console.error("Upload Error:", error);
      return res.status(500).json({ error: "Image upload failed." });
    }
  };
  
  module.exports = { uploadImageToCloudinary, uploadImageFromPath, uploadImageHandler };
// export default uploadImageCloudinary;
