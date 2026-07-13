import { 
  useState 
} from "react";


import {
  FiTag,
  FiFileText,
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
"Please fill all fields."
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


}

catch(error){

console.log(error);


errorToast(
error.message ||
"Failed to add product"
);


}


};









return(


<div className="
min-h-screen
bg-[#FAF7F2]
p-4
md:p-8
">


<div className="
max-w-4xl
mx-auto
">





{/* HEADER */}


<div className="
flex
items-center
justify-between
mb-6
">


<div>


<h1 className="
text-3xl
font-black
text-[#172033]
">

Add Product

</h1>


<p className="
text-gray-500
mt-2
">

Fill in the details to add a new product

</p>


</div>


<div className="
w-14
h-14
rounded-full
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
text-2xl
">

🛍️

</div>


</div>








<form

onSubmit={handleSubmit}

className="
bg-white
rounded-3xl
p-6
md:p-8
shadow-sm
border
border-gray-100
space-y-6
"

>








{/* PRODUCT NAME */}


<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Product Name

<span className="
text-amber-500
ml-1
">

*

</span>


</label>



<div className="
relative
">


<div className="
absolute
left-4
top-1/2
-translate-y-1/2
w-10
h-10
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">

<FiTag/>

</div>



<input

className="
w-full
h-16
pl-16
pr-4
rounded-2xl
border
border-gray-200
outline-none
text-gray-700
placeholder:text-gray-400
focus:border-amber-400
"

placeholder="Enter product name"


value={name}

onChange={
e=>setName(
e.target.value
)
}


/>


</div>


</div>









{/* DESCRIPTION */}


<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Product Description


</label>




<div className="
relative
">


<div className="
absolute
left-4
top-5
w-10
h-10
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">


<FiFileText/>


</div>




<textarea


rows="5"


className="
w-full
pl-16
pt-5
pr-4
rounded-2xl
border
border-gray-200
outline-none
text-gray-700
placeholder:text-gray-400
focus:border-amber-400
resize-none
"


placeholder="Write about your product..."


value={description}


onChange={
e=>setDescription(
e.target.value
)
}


/>



</div>



</div>


        </div>









{/* PRICE + STOCK */}



<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">






{/* PRICE */}


<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Price (৳)

<span className="
text-amber-500
ml-1
">

*

</span>


</label>




<div className="
relative
">


<div className="
absolute
left-4
top-1/2
-translate-y-1/2
w-10
h-10
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
font-bold
">

৳

</div>



<input

type="number"

className="
w-full
h-16
pl-16
pr-4
rounded-2xl
border
border-gray-200
outline-none
focus:border-amber-400
"

placeholder="Enter price"


value={price}


onChange={
e=>setPrice(
e.target.value
)
}


/>


</div>


</div>








{/* STOCK */}


<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Stock Quantity

<span className="
text-amber-500
ml-1
">

*

</span>


</label>



<div className="
relative
">


<div className="
absolute
left-4
top-1/2
-translate-y-1/2
w-10
h-10
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">

📦

</div>



<input


type="number"


className="
w-full
h-16
pl-16
pr-4
rounded-2xl
border
border-gray-200
outline-none
focus:border-amber-400
"


placeholder="Enter stock"



value={stock}



onChange={
e=>setStock(
e.target.value
)
}


/>


</div>


</div>



</div>









{/* HERO BANNER */}



<div className="
bg-[#FFF9ED]
rounded-2xl
p-5
flex
items-center
justify-between
border
border-[#FDECC8]
">


<div className="
flex
gap-4
items-center
">


<div className="
w-12
h-12
rounded-xl
bg-white
flex
items-center
justify-center
text-amber-500
text-xl
">

⭐

</div>




<div>


<h3 className="
font-bold
text-[#172033]
">


Use this product as Hero Banner


</h3>



<p className="
text-sm
text-gray-500
mt-1
">

Show this product on homepage banner


</p>


</div>


</div>






<label className="
relative
cursor-pointer
">


<input

type="checkbox"

className="
sr-only
"

checked={heroBanner}

onChange={
e=>setHeroBanner(
e.target.checked
)
}


/>


<div className={`
w-14
h-8
rounded-full
transition
${
heroBanner
?
"bg-amber-500"
:
"bg-gray-300"
}
`}>



<div className={`
w-6
h-6
bg-white
rounded-full
mt-1
transition
shadow

${
heroBanner
?
"translate-x-7"
:
"translate-x-1"
}

`}>

</div>



</div>


</label>


</div>









{/* IMAGE UPLOAD */}



<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Product Images


</label>



<div className="
border
border-gray-200
rounded-2xl
p-5
">



<p className="
text-sm
text-gray-500
mb-4
">

Add up to 5 images

</p>





<label

htmlFor="product-image"

className="
h-40
rounded-2xl
border
border-dashed
border-gray-300
bg-[#FAF7F2]
flex
flex-col
items-center
justify-center
cursor-pointer
text-gray-500
hover:bg-gray-50
"


>


<div className="
text-amber-500
text-3xl
mb-2
">

☁️

</div>


<p className="
font-semibold
">

Tap to upload images

</p>



<p className="
text-xs
mt-1
">

PNG, JPG or WEBP

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


onChange={
e=>
setImages(
Array.from(
e.target.files
)
)
}


/>






{

images.length > 0 &&

<div className="
flex
gap-3
mt-4
flex-wrap
">


{

images.map(
(img,index)=>(


<div

key={index}

className="
w-20
h-20
rounded-xl
overflow-hidden
border
"


>


<img

src={
URL.createObjectURL(img)
}

className="
w-full
h-full
object-cover
"

/>


</div>


)

)


}


</div>


}



</div>


</div>









{/* SAVE BUTTON */}



<Button

type="submit"

className="
w-full
h-14
rounded-2xl
bg-gradient-to-r
from-amber-400
to-amber-500
text-white
font-black
text-lg
shadow-lg
"


>

💾 Save Product


</Button>






</form>


</div>


</div>


);

}
