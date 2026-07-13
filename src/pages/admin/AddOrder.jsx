import {
  useState
} from "react";


import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPackage,
  FiDollarSign,
  FiHash,
  FiShoppingBag
} from "react-icons/fi";


import Button from "../../components/ui/Button";


import {
  addOrderByAdmin,
} from "../../services/orderService";


import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";





export default function AddOrder(){


const [customerName,setCustomerName]=useState("");

const [email,setEmail]=useState("");

const [phone,setPhone]=useState("");

const [address,setAddress]=useState("");

const [productName,setProductName]=useState("");

const [price,setPrice]=useState("");

const [quantity,setQuantity]=useState(1);







const handleSubmit=async(e)=>{

e.preventDefault();



if(
!customerName ||
!email ||
!phone ||
!address ||
!productName ||
!price
){

errorToast(
"Please fill all fields."
);

return;

}



try{


const total =
Number(price) *
Number(quantity);



await addOrderByAdmin({

customerName,

email,

phone,

address,


items:[

{

id:crypto.randomUUID(),

name:productName,

price:Number(price),

quantity:Number(quantity),

}

],


total,

status:"Pending",


createdAt:
new Date()
.toISOString(),

});



successToast(
"Order added successfully."
);



setCustomerName("");

setEmail("");

setPhone("");

setAddress("");

setProductName("");

setPrice("");

setQuantity(1);



}

catch(error){

console.log(error);


errorToast(
error.message ||
"Failed to add order."
);


}


};







const inputClass=`
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
`;





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

Add Order

</h1>


<p className="
text-gray-500
mt-2
">

Create a new customer order

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

<FiShoppingBag/>

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








{/* CUSTOMER NAME */}

<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Customer Name

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

<FiUser/>

</div>



<input

className={inputClass}

placeholder="Enter customer name"

value={customerName}

onChange={
e=>setCustomerName(
e.target.value
)
}

/>


</div>


</div>









{/* EMAIL */}


<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Email

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

<FiMail/>

</div>



<input

type="email"

className={inputClass}

placeholder="Customer email"

value={email}

onChange={
e=>setEmail(
e.target.value
)
}

/>


</div>


</div>









{/* PHONE */}

<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Phone Number

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

<FiPhone/>

</div>



<input

className={inputClass}

placeholder="Phone number"

value={phone}

onChange={
e=>setPhone(
e.target.value
)
}

/>


</div>


</div>









{/* ADDRESS */}

<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Shipping Address

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

<FiMapPin/>

</div>



<textarea

rows="4"

className="
w-full
pl-16
pt-5
pr-4
rounded-2xl
border
border-gray-200
outline-none
focus:border-amber-400
resize-none
"

placeholder="Customer address"

value={address}

onChange={
e=>setAddress(
e.target.value
)
}

/>


</div>


</div>









{/* PRODUCT + PRICE */}


<div className="
grid
grid-cols-1
md:grid-cols-2
gap-5
">



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

<FiPackage/>

</div>



<input

className={inputClass}

placeholder="Product name"

value={productName}

onChange={
e=>setProductName(
e.target.value
)
}

/>


</div>


</div>







<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Price

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

<FiDollarSign/>

</div>



<input

type="number"

className={inputClass}

placeholder="Product price"

value={price}

onChange={
e=>setPrice(
e.target.value
)
}

/>


</div>


</div>



</div>








{/* QUANTITY */}

<div>


<label className="
block
font-bold
text-[#172033]
mb-3
">

Quantity

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

<FiHash/>

</div>



<input

type="number"

className={inputClass}

value={quantity}

onChange={
e=>setQuantity(
e.target.value
)
}

/>


</div>


</div>









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

🛒 Add Order

</Button>






</form>


</div>


</div>


);


}


