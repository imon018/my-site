export const uploadImages = async (files) => {
  const uploadedImages = [];

  for (const file of files) {
    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();

    uploadedImages.push({
      imageUrl: data.secure_url,
      publicId: data.public_id,
    });
  }

  return uploadedImages;
};
