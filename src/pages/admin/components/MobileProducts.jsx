import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";



export default function MobileProducts({data}){


const {
  products,
  search,
  setSearch,
  handleDelete
}=data;



const navigate = useNavigate();





return (

<div
className="
w-full
min-h-screen
bg-[#FAF7F2]
p-4
"
>





{/* HEADER */}

<div
className="
bg-white
rounded-[28px]
p-5
border
border-gray-100
shadow-sm
mb-5
"
>


<div
className="
flex
justify-between
items-center
"
>


<div>

<h1
className="
text-2xl
font-bold
"
>

Products

</h1>


<p
className="
text-gray-500
text-sm
mt-1
"
>

Manage your store products

</p>


</div>





<button

onClick={()=>navigate("/admin/add-product")}

className="
bg-amber-500
text-white
p-3
rounded-xl
shadow
"

>

<FiPlus size={22}/>

</button>



</div>

</div>









{/* SEARCH */}


<div
className="
bg-white
rounded-2xl
border
border-gray-100
p-3
mb-5
flex
items-center
gap-3
"
>


<FiSearch
className="
text-gray-400
"
/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search product..."

className="
w-full
outline-none
bg-transparent
"
/>


</div>









{/* PRODUCTS */}



<div
className="
space-y-4
"
>



{

products.length===0 ?


(

<div

className="
bg-white
rounded-3xl
p-8
text-center
text-gray-400
"

>

No Products Found

</div>


)


:


products.map(product=>(


<div

key={product.id}

className="
bg-white

rounded-[28px]

p-4

border

border-gray-100

shadow-sm

"

>


<div
className="
flex
gap-4
"
>


<img

src={
product.image ||
"https://via.placeholder.com/100"
}

className="
w-24
h-24
rounded-2xl
object-cover
"

/>



<div
className="
flex-1
"
>


<h2
className="
font-bold
text-lg
"
>

{product.name}

</h2>



<p
className="
text-gray-500
text-sm
mt-1
"
>

{product.category}

</p>




<p
className="
text-amber-600
font-bold
mt-2
"
>

৳ {product.price}

</p>



</div>


</div>






<div
className="
flex
justify-between
items-center
mt-5
"
>


<span
className="
bg-green-50
text-green-600

px-3
py-1

rounded-full

text-sm
"
>

Stock:
{product.stock || 0}

</span>






<div
className="
flex
gap-2
"
>


<button

onClick={()=>navigate(
`/admin/edit-product/${product.id}`
)}

className="
bg-blue-50
text-blue-600
p-3
rounded-xl
"

>

<FiEdit/>

</button>





<button

onClick={()=>handleDelete(product.id)}

className="
bg-red-50
text-red-500
p-3
rounded-xl
"

>

<FiTrash2/>

</button>



</div>


</div>






</div>



))


}



</div>







</div>

);


}
