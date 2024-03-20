import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dtwt3cwfo",
  api_key: "677497984568252",
  api_secret: "-yFEze2_ybTnCPyasZs6wtApS8c",
});

export const imageUploadController = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    res.json({ url: result.secure_url, 
        public_id: result.public_id 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export default imageUploadController;   