import {
  useEffect,
  useState,
} from "react";


import {
  useParams,
  useNavigate,
} from "react-router-dom";


import {
  FiArrowLeft,
  FiMapPin,
  FiPackage,
} from "react-icons/fi";


import useAuth from "../../hooks/useAuth";


import {
  getUserOrders,
} from "../../services/orderService";





export default function UserOrderDetails(){


const {
  id
}=useParams();


const navigate =
useNavigate();


const {
 user
}=useAuth();



const [order,setOrder]=useState(null);

const [loading,setLoading]=useState(true);







useEffect(()=>{


loadOrder();


},[user,id]);








async function loadOrder(){


try{


const data =
await getUserOrders(
user.email
);



const found =
data.find(
item=>item.id===id
);



setOrder(found);



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}








if(loading){

return(

<div className="
min-h-screen
flex
items-center
justify-center
font-bold
">

Loading Order...

</div>

);

}







if(!order){


return(

<div className="
min-h-screen
flex
flex-col
items-center
justify-center
gap-4
">


<h2 className="
font-bold
text-xl
">

Order Not Found

</h2>


<button

onClick={()=>navigate(-1)}

className="
px-4
py-2
bg-black
text-white
rounded-lg
"

>

Back

</button>


</div>

);


}








return(


<div className="
bg-[#faf9f6]
min-h-screen
p-4
space-y-3
">





{/* HEADER */}


<div className="
relative
flex
items-center
justify-center
mb-2
">


<button

onClick={()=>navigate(-1)}

className="
absolute
left-0
w-9
h-9
rounded-lg
bg-white
border
border-gray-100
flex
items-center
justify-center
"

>

<FiArrowLeft/>

</button>



<h1 className="
font-bold
text-lg
">

Order Details

</h1>



</div>







{/* ORDER CARD */}


<div className="
bg-white
border
border-gray-100
rounded-lg
p-4
shadow-sm
">


<div className="
flex
justify-between
items-start
">


<div>


<h2 className="
text-2xl
font-black
text-slate-900
">

#{order.id?.slice(0,10)}

</h2>


<p className="
text-xs
text-gray-500
mt-1
">

{
new Date(order.createdAt)
.toLocaleString()
}

</p>


</div>




<span className={`

text-xs
font-bold
px-3
py-1.5
rounded-full


${
order.status==="Delivered"

?
"bg-green-100 text-green-700"

:

order.status==="Processing"

?
"bg-blue-100 text-blue-700"

:

order.status==="Cancelled"

?
"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}

`}>

{order.status}

</span>



</div>



</div>









{/* SHIPPING ADDRESS */}


<div className="
bg-white
border
border-gray-100
rounded-lg
p-4
shadow-sm
">


<h3 className="
font-bold
text-sm
mb-3
">

Shipping Address

</h3>




<div className="
flex
gap-3
text-sm
text-gray-700
">


<FiMapPin
className="
mt-1
text-gray-500
"
/>



<p>

{
order.address ||
"No address available"
}

</p>


</div>



</div>









{/* PAYMENT METHOD */}



<div className="
bg-white
border
border-gray-100
rounded-lg
p-4
shadow-sm
">


<h3 className="
font-bold
text-sm
mb-3
">

Payment Method

</h3>




<div className="
flex
items-center
justify-between
">


<div className="
flex
items-center
gap-3
">


<div className="
w-9
h-9
rounded-lg
bg-green-50
flex
items-center
justify-center
text-green-600
">

💳

</div>



<p className="
text-sm
font-semibold
">

{
order.paymentMethod ||
""
}

</p>



</div>






<span className="
text-xs
font-bold
px-3
py-1.5
rounded-full
bg-green-100
text-green-700
">

Cash On Delivery 💰

</span>



</div>



</div>









{/* PRODUCTS */}


<div className="
bg-white
border
border-gray-100
rounded-lg
p-4
shadow-sm
">



<div className="
flex
items-center
gap-2
mb-4
">


<FiPackage
className="
text-blue-600
"/>


<h3 className="
font-bold
text-sm
">

Products

</h3>


</div>






<div className="
space-y-3
">


{

order.items?.map(

(item,index)=>(


<div

key={item.id || index}

className="
flex
items-center
justify-between
border-b
border-gray-100
pb-3
"

>


<div className="
flex
items-center
gap-3
">


<img

src={
item.image ||
"https://via.placeholder.com/60"
}

className="
w-14
h-14
rounded-lg
object-cover
bg-gray-50
"

/>



<div>


<h4 className="
text-sm
font-bold
">

{item.name}

</h4>


<p className="
text-xs
text-gray-500
">

Qty: {item.quantity}

</p>


</div>


</div>



<p className="
font-bold
text-sm
">

৳ {item.price * item.quantity}

</p>



</div>


)

)

}


</div>



</div>









{/* ORDER SUMMARY */}


<div className="
bg-white
border
border-gray-100
rounded-lg
p-4
shadow-sm
">


<h3 className="
font-bold
text-sm
mb-4
">

Order Summary

</h3>



<div className="
space-y-3
text-sm
">



<div className="
flex
justify-between
">

<span className="
text-gray-500
">

Subtotal

</span>


<span className="
font-semibold
">

৳ {order.subtotal || order.total}

</span>


</div>





<div className="
flex
justify-between
">

<span className="
text-gray-500
">

Shipping

</span>


<span className="
font-semibold
">

৳ {order.deliveryCharge || 0}

</span>


</div>





<hr className="
border-gray-100
"/>



<div className="
flex
justify-between
font-black
">

<span>

Total Amount

</span>


<span>

৳ {order.total}

</span>


</div>



</div>



</div>









{/* ACTION BUTTONS */}



<div className="
flex
gap-3
">



<button

className="
w-1/2
h-11
rounded-lg
border
border-red-200
text-red-600
font-bold
text-sm
bg-white
"

>

Cancel / Return

</button>






<button

onClick={()=>{

navigate(
`/product/${order.items?.[0]?.id}`
)

}}

className="
w-1/2
h-11
rounded-lg
bg-amber-500
text-white
font-bold
text-sm
"

>

Buy Again

</button>



</div>





</div>


);


}
