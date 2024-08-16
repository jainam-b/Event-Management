// // uploadHandler.ts
// import { Context } from 'hono';
// import cloudinary from './cloudinaryConfig';
// import { Readable } from 'stream';

// export const uploadImage = async (c: Context) => {
//   try {
//     const file = await c.req.parseBody(); // Use Hono's built-in method to parse the request body
//     const imageFile = file.files?.image; // Assuming the file field is named 'image'

//     if (!imageFile) {
//       return c.json({ error: 'No file uploaded' }, 400);
//     }

//     const uploadPromise = new Promise<string>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: 'your_folder_name' }, // Specify the folder in Cloudinary where you want to store the image
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else if (result) {
//             resolve(result.secure_url);
//           }
//         }
//       );

//       const fileStream = Readable.from(imageFile.data as Buffer);
//       fileStream.pipe(uploadStream);
//     });

//     const imageUrl = await uploadPromise;

//     return c.json({ imageUrl }, 200);
//   } catch (error) {
//     return c.json({ error: error.message }, 500);
//   }
// };
