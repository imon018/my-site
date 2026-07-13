import { useState } from "react";

import {
  FiUploadCloud,
  FiImage,
  FiStar,
  FiTag,
  FiDollarSign,
  FiBox,
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



export default function AddProduct(){


const [name,setName]=useState("");

const [description,setDescription]=useState("");

const [price,setPrice]=useState("");

const [stock,setStock]=useState("");

const [images,setImages]=useState([]);

const [heroBanner,setHeroBanner]=useState(false);





const handleSubmit=async(e)=>{

e.preventDefault();



if(
!name ||
!description ||
!price ||
!stock ||
images.length===0
){

errorToast(
"Please fill in all fields."
);

return;

}



try{


const uploadedImages =
await uploadImages(images);



await addProductToDB({

name,

description,

price:Number(price),

stock:Number(stock),


image:
uploadedImages[0].imageUrl,


images:
uploadedImages.map(
img=>img.imageUrl
),


publicIds:
uploadedImages.map(
img=>img.publicId
),


heroBanner,


createdAt:new Date(),

});



successToast(
"Product added successfully!"
);



setName("");

setDescription("");

setPrice("");

setStock("");

setImages([]);

setHeroBanner(false);



const file =
document.getElementById(
"product-image"
);


if(file)
file.value="";



}
catch(error){


errorToast(
error.message ||
"Failed to add product."
);


}


};







return(

<div
className="
min-h-screen
bg-[#FAF7F2]
p-4
md:p-8
"
>


<div
className="
max-w-4xl
mx-auto
"
>


{/* HEADER */}

<div
className="
mb-6
"
>

<h1
className="
text-3xl
md:text-4xl
font-black
text-slate-900
"
>

Add Product

</h1>


<p
className="
text-gray-500
mt-2
"
>

Fill in the details to add a new product

</p>


</div>







<form

onSubmit={handleSubmit}

className="
bg-white
border
border-gray-100
rounded-xl
shadow-sm
p-5
md:p-7
space-y-6
"

>





{/* NAME */}

<div>

<label
className="
text-sm
font-bold
block
mb-2
"
>

Product Name

</label>


<div
className="
relative
"
>

<FiTag
className="
absolute
left-4
top-4
text-gray-400
"
/>


<input

value={name}

onChange={(e)=>
setName(e.target.value)
}

placeholder="Enter product name"

className="
w-full
h-12
border
border-gray-200
rounded-xl
pl-12
pr-4
outline-none
focus:border-amber-400
"

/>


</div>

</div>








{/* DESCRIPTION */}

<div>


<label
className="
text-sm
font-bold
block
mb-2
"
>

Product Description

</label>



<textarea

value={description}

onChange={(e)=>
setDescription(e.target.value)
}

placeholder="Write about your product..."

rows="5"

className="
w-full
border
border-gray-200
rounded-xl
p-4
outline-none
resize-none
focus:border-amber-400
"

/>


</div>









{/* PRICE STOCK */}

<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"
>


<div>


<label
className="
text-sm
font-bold
block
mb-2
"
>

Price

</label>



<div
className="
relative
"
>

<FiDollarSign
className="
absolute
left-4
top-4
text-gray-400
"
/>


<input

type="number"

value={price}

onChange={(e)=>
setPrice(e.target.value)
}

placeholder="Enter price"

className="
w-full
h-12
border
border-gray-200
rounded-xl
pl-12
"

/>


</div>


</div>







<div>


<label
className="
text-sm
font-bold
block
mb-2
"
>

Stock Quantity

</label>


<div
className="
relative
"
>

<FiBox
className="
absolute
left-4
top-4
text-gray-400
"
/>


<input

type="number"

value={stock}

onChange={(e)=>
setStock(e.target.value)
}

placeholder="Enter stock"

className="
w-full
h-12
border
border-gray-200
rounded-xl
pl-12
"

/>


</div>


</div>



</div>









{/* HERO */}

<div

className="
flex
items-center
justify-between
bg-amber-50
border
border-amber-100
rounded-xl
p-4
"

>


<div
className="
flex
gap-3
items-center
"
>


<div
className="
w-10
h-10
rounded-xl
bg-white
flex
items-center
justify-center
text-amber-500
"
>

<FiStar/>

</div>



<div>

<p
className="
font-bold
text-sm
"
>

Use this product as Hero Banner

</p>


<p
className="
text-xs
text-gray-500
"
>

Show this product on homepage

</p>

</div>


</div>




<input

type="checkbox"

checked={heroBanner}

onChange={(e)=>
setHeroBanner(e.target.checked)
}

className="
w-5
h-5
accent-amber-500
"

/>


</div>









{/* IMAGE UPLOAD */}


<div>


<label
className="
text-sm
font-bold
block
mb-3
"
>

Product Images

</label>



<label

htmlFor="product-image"

className="
h-32
border-2
border-dashed
border-gray-200
rounded-xl
flex
flex-col
items-center
justify-center
cursor-pointer
hover:bg-gray-50
"

>


<FiUploadCloud
size={32}
className="
text-amber-500
"
/>


<p
className="
font-semibold
mt-2
text-sm
"
>

Upload Images

</p>


<p
className="
text-xs
text-gray-400
"
>

PNG JPG WEBP

</p>


</label>



<input

id="product-image"

type="file"

multiple

accept="image/*"

className="
hidden
"

onChange={(e)=>
setImages(
Array.from(e.target.files)
)
}

/>







{
images.length>0 &&

<div
className="
flex
gap-3
mt-4
flex-wrap
"
>

{
images.map(
(img,index)=>(

<img

key={index}

src={
URL.createObjectURL(img)
}

className="
w-16
h-16
rounded-lg
object-cover
border
"

/>

)

)

}

</div>

}



</div>









<Button

type="submit"

className="
w-full
h-12
rounded-xl
bg-amber-500
text-white
font-bold
"

>

Save Product

</Button>





</form>


</div>


</div>


);

}
