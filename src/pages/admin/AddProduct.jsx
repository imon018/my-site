import {
  useState
} from "react";


import {
  FiBox,
  FiUploadCloud,
  FiDollarSign,
  FiFileText,
  FiX,
} from "react-icons/fi";


import toast from "react-hot-toast";


import Button from "../../components/ui/Button";


import {
  uploadImages
} from "../../services/uploadService";


import {
  addProductToDB
} from "../../services/firestoreProductService";


import {
  serverTimestamp
} from "firebase/firestore";





export default function AddProduct(){



const [product,setProduct]=useState({

name:"",

description:"",

price:""

});





const [
images,
setImages
]=useState([]);




const [
previewImages,
setPreviewImages
]=useState([]);





const [
loading,
setLoading
]=useState(false);









const handleChange=(e)=>{


setProduct({

...product,

[e.target.name]:
e.target.value

});


};









// MULTIPLE IMAGE SELECT


const handleImageChange=(e)=>{


const files =
Array.from(e.target.files);



setImages(prev=>[

...prev,

...files

]);





const previews =
files.map(
(file)=>({

file,

url:
URL.createObjectURL(file)

})

);



setPreviewImages(prev=>[

...prev,

...previews

]);



};









// REMOVE IMAGE


const removeImage=(index)=>{


setImages(prev=>

prev.filter(
(_,i)=>i!==index
)

);




setPreviewImages(prev=>

prev.filter(
(_,i)=>i!==index
)

);


};









// SAVE PRODUCT


const handleSubmit=async(e)=>{


e.preventDefault();



try{


setLoading(true);



let uploadedImages=[];




if(images.length>0){


uploadedImages =
await uploadImages(images);


}







await addProductToDB({

name:
product.name,


description:
product.description,


price:
Number(product.price),



images:
uploadedImages,


createdAt:
serverTimestamp()


});






toast.success(
"Product added successfully!"
);






setProduct({

name:"",

description:"",

price:""

});



setImages([]);

setPreviewImages([]);



}


catch(error){


console.log(error);


toast.error(
"Failed to add product"
);


}



finally{


setLoading(false);


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
max-w-3xl
mx-auto
"

>





{/* HEADER */}



<div

className="
flex
items-center
justify-between
mb-5
"

>


<div>


<h1

className="
text-2xl
font-black
text-[#172033]
"

>

Add Product

</h1>



<p

className="
text-sm
text-gray-500
mt-1
"

>

Create new product

</p>


</div>





<div

className="
w-11
h-11
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
"

>

<FiBox/>

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


<label

className="
block
font-bold
text-sm
mb-2
text-[#172033]
"

>

Product Name

</label>



<div

className="
relative
"

>


<div

className="
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
"

>

<FiBox size={16}/>

</div>





<input


name="name"


value={product.name}


onChange={handleChange}


placeholder="Product name"



className="
w-full
h-12
pl-12
pr-3
rounded-lg
border
border-gray-200
outline-none
text-sm
focus:border-amber-400
"


/>



</div>


</div>









{/* DESCRIPTION */}



<div>


<label

className="
block
font-bold
text-sm
mb-2
text-[#172033]
"

>

Description

</label>




<div

className="
relative
"

>


<div

className="
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
"

>

<FiFileText size={16}/>

</div>





<textarea


rows="5"


name="description"


value={product.description}


onChange={handleChange}


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


<label

className="
block
font-bold
text-sm
mb-2
text-[#172033]
"

>

Price

</label>




<div

className="
relative
"

>


<div

className="
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
"

>

<FiDollarSign size={16}/>

</div>





<input


type="number"


name="price"


value={product.price}


onChange={handleChange}


placeholder="Product price"


className="
w-full
h-12
pl-12
pr-3
rounded-lg
border
border-gray-200
outline-none
text-sm
focus:border-amber-400
"


/>



</div>


</div>









{/* IMAGE UPLOAD LAST */}



<div>


<label

className="
block
font-bold
text-sm
mb-2
text-[#172033]
"

>

Product Images

</label>






<label


htmlFor="images"



className="
h-40
rounded-xl
border
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
text-amber-500
text-4xl
"

/>



<p

className="
font-semibold
text-sm
mt-2
"

>

Upload Multiple Images

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


id="images"


type="file"


multiple


accept="image/*"


className="hidden"


onChange={handleImageChange}


/>









{/* PREVIEW */}



{

previewImages.length > 0 && (



<div

className="
grid
grid-cols-2
md:grid-cols-4
gap-4
mt-4
"


>


{

previewImages.map(
(item,index)=>(


<div

key={index}

className="
relative
"

>


<img


src={item.url}


className="
w-full
h-28
object-cover
rounded-xl
border
"


/>





<button


type="button"


onClick={()=>removeImage(index)}



className="
absolute
top-2
right-2
w-7
h-7
rounded-full
bg-red-500
text-white
flex
items-center
justify-center
"


>

<FiX size={16}/>

</button>




</div>


)

)


}



</div>



)


}







</div>









{/* BUTTON */}



<Button


type="submit"


disabled={loading}



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
"


>


{

loading

?

"Saving..."

:

"Add Product"

}


</Button>






</form>






</div>



</div>



);


}
