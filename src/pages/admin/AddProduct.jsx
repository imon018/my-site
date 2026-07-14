import { useState } from "react";
import {
  FiPackage,
  FiType,
  FiFileText,
  FiDollarSign,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

import Button from "../../components/ui/Button";

import {
  addProductToDB,
} from "../../services/firestoreProductService";

import {
  uploadImages,
} from "../../services/uploadService";

import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";

export default function AddProduct() {

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const inputClass = `
w-full
h-12
pl-12
pr-3
rounded-lg
border
border-gray-200
outline-none
text-sm
text-gray-700
focus:border-amber-400
`;

  const handleImageChange = (e) => {

    const files = Array.from(
      e.target.files
    );

    if (!files.length) return;

    setImages((prev) => [
      ...prev,
      ...files,
    ]);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviewImages((prev) => [
      ...prev,
      ...previews,
    ]);
  };

  const removeImage = (index) => {

    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPreviewImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !description ||
      !price ||
      images.length === 0
    ) {

      errorToast(
        "Please fill all fields."
      );

      return;
    }

    try {

      setLoading(true);

      const uploaded =
        await uploadImages(images);

      await addProductToDB({

        name,

        description,

        price: Number(price),

        image:
          uploaded[0].imageUrl,

        images:
          uploaded.map(
            (item) => item.imageUrl
          ),

        publicIds:
          uploaded.map(
            (item) => item.publicId
          ),

        createdAt:
          new Date(),

      });

      successToast(
        "Product added successfully."
      );

      setName("");

      setDescription("");

      setPrice("");

      setImages([]);

      setPreviewImages([]);

      document.getElementById(
        "product-images"
      ).value = "";

    } catch (error) {

      console.log(error);

      errorToast(
        "Failed to add product."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

<div className="
min-h-screen
bg-[#FAF7F2]
p-4
md:p-8
">

<div className="
max-w-3xl
mx-auto
">

<div className="
flex
items-center
justify-between
mb-5
">

<div>

<h1 className="
text-2xl
font-black
text-[#172033]
">

Add Product

</h1>

<p className="
text-sm
text-gray-500
mt-1
">

Create new product

</p>

</div>

<div className="
w-11
h-11
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
text-xl
">

<FiPackage/>

</div>

</div>

<form

onSubmit={handleSubmit}

className="
bg-white
rounded-xl
p-5
md:p-6
shadow-sm
border
border-gray-100
space-y-5
"
>

  {/* PRODUCT NAME */}

<div>

<label className="
block
font-bold
text-sm
text-[#172033]
mb-2
">

Product Name

</label>

<div className="relative">

<div className="
absolute
left-3
top-1/2
-translate-y-1/2
w-8
h-8
rounded-lg
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">

<FiType size={16}/>

</div>

<input

type="text"

value={name}

onChange={(e)=>
setName(e.target.value)
}

placeholder="Product name"

className={inputClass}

/>

</div>

</div>





{/* DESCRIPTION */}

<div>

<label className="
block
font-bold
text-sm
text-[#172033]
mb-2
">

Description

</label>

<div className="relative">

<div className="
absolute
left-3
top-3
w-8
h-8
rounded-lg
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">

<FiFileText size={16}/>

</div>

<textarea

rows="5"

value={description}

onChange={(e)=>
setDescription(e.target.value)
}

placeholder="Product description"

className="
w-full
pl-12
pt-3
pr-3
rounded-lg
border
border-gray-200
outline-none
resize-none
text-sm
focus:border-amber-400
"

/>

</div>

</div>





{/* PRICE */}

<div>

<label className="
block
font-bold
text-sm
text-[#172033]
mb-2
">

Price

</label>

<div className="relative">

<div className="
absolute
left-3
top-1/2
-translate-y-1/2
w-8
h-8
rounded-lg
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">

<FiDollarSign size={16}/>

</div>

<input

type="number"

value={price}

onChange={(e)=>
setPrice(e.target.value)
}

placeholder="Product price"

className={inputClass}

/>

</div>

</div>





{/* IMAGE UPLOAD */}

<div>

<label className="
block
font-bold
text-sm
text-[#172033]
mb-2
">

Product Images

</label>

<label

htmlFor="product-images"

className="
h-44
rounded-xl
border-2
border-dashed
border-gray-300
bg-[#FAF7F2]
flex
flex-col
items-center
justify-center
cursor-pointer
"

>

<FiUploadCloud
className="
text-5xl
text-amber-500
mb-2
"
/>

<p className="font-semibold">

Upload Multiple Images

</p>

<p className="
text-xs
text-gray-400
mt-1
">

PNG • JPG • WEBP

</p>

</label>

<input

id="product-images"

type="file"

multiple

accept="image/*"

className="hidden"

onChange={handleImageChange}

/>

</div>





{/* IMAGE PREVIEW */}

{

previewImages.length>0 && (

<div>

<label className="
block
font-bold
text-sm
text-[#172033]
mb-3
">

Preview Images

</label>

<div className="
grid
grid-cols-2
sm:grid-cols-3
gap-4
">

{

previewImages.map((img,index)=>(

<div

key={index}

className="
relative
rounded-xl
overflow-hidden
border
border-gray-200
bg-white
"

>

<img

src={img.url}

alt="preview"

className="
w-full
h-36
object-cover
"

/>

<button

type="button"

onClick={()=>
removeImage(index)
}

className="
absolute
top-2
right-2
w-8
h-8
rounded-full
bg-red-500
text-white
flex
items-center
justify-center
hover:bg-red-600
"

>

<FiX/>

</button>

</div>

))

}

</div>

</div>

)
}


  {/* SAVE BUTTON */}

<Button

type="submit"

className="
w-full
h-12
rounded-lg
bg-gradient-to-r
from-amber-400
to-amber-500
text-white
font-black
text-sm
shadow
"

>

Save Product

</Button>

</form>

</div>

</div>

);

}
