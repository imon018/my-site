import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/orderService";

import {
  FiArrowLeft,
  FiTrash2,
  FiPackage,
  FiUser,
  FiMapPin,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";



export default function OrderDetails(){


const {id}=useParams();

const navigate = useNavigate();


const [order,setOrder]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{

loadOrder();

},[]);



async function loadOrder(){

try{


const data =
await getAllOrders();


const found =
data.find(
(item)=>item.id===id
);


setOrder(found);


}catch(error){

console.log(error);

}
finally{

setLoading(false);

}


}




async function changeStatus(status){


try{


await updateOrderStatus(
id,
status
);


setOrder({

...order,
status

});


}catch(error){

console.log(error);

}


}




async function removeOrder(){


const confirmDelete =
window.confirm(
"Delete this order permanently?"
);


if(!confirmDelete)
return;


await deleteOrder(id);


navigate("/admin/orders");


}





if(loading){

return(

<div className="
p-10
text-center
">

Loading Order...

</div>

)

}



if(!order){

return(

<div className="
p-10
text-center
">

Order Not Found

</div>

)

}



return(


<div className="
space-y-6
">



{/* HEADER */}


<div className="
flex
items-center
justify-between
">


<button

onClick={()=>navigate(-1)}

className="
flex
items-center
gap-2
bg-white
px-4
py-3
rounded-xl
shadow-sm
"

>

<FiArrowLeft/>

Back

</button>



<button

onClick={removeOrder}

className="
bg-red-500
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
"

>

<FiTrash2/>

Delete

</button>


</div>






{/* CUSTOMER */}


<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<div className="
flex
items-center
gap-3
mb-5
">


<FiUser
className="text-amber-500"
size={24}
/>


<h2 className="
text-xl
font-bold
">

Customer Information

</h2>


</div>




<div className="
grid
md:grid-cols-2
gap-4
text-sm
">


<p>
<b>Name:</b> {order.customerName}
</p>


<p>
<b>Email:</b> {order.email}
</p>


<p>
<b>Phone:</b> {order.phone}
</p>


<p>
<b>Address:</b> {order.address}
</p>


</div>


</div>








{/* STATUS */}


<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<h2 className="
font-bold
mb-4
">

Order Status

</h2>



<select

value={
order.status || "Pending"
}

onChange={(e)=>
changeStatus(
e.target.value
)
}

className="
border
rounded-xl
px-5
py-3
"

>


<option>
Pending
</option>

<option>
Processing
</option>

<option>
Shipped
</option>

<option>
Delivered
</option>

<option>
Cancelled
</option>


</select>


</div>








{/* REQUESTS */}


{

(order.cancelRequested ||
order.returnRequested)

&&


<div className="
bg-yellow-50
rounded-3xl
p-6
">


<h2 className="
font-bold
mb-3
">

Customer Requests

</h2>



{
order.cancelRequested &&

<p className="
text-red-600
font-semibold
">

⚠ Cancel Request Received

</p>

}



{
order.returnRequested &&

<p className="
text-blue-600
font-semibold
">

🔄 Return Request Received

</p>

}



</div>


}









{/* PRODUCTS */}



<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<div className="
flex
items-center
gap-3
mb-5
">

<FiPackage
className="text-blue-600"
/>


<h2 className="
text-xl
font-bold
">

Products

</h2>


</div>





<div className="
space-y-4
">


{

order.items?.map(
(item)=>(


<div

key={item.id}

className="
flex
items-center
justify-between
border-b
pb-4
"


>


<div>


<h3 className="
font-semibold
">

{item.name}

</h3>


<p className="
text-sm
text-gray-500
">

Quantity:
{item.quantity}

</p>


</div>




<p className="
font-bold
">

৳ {item.price * item.quantity}

</p>


</div>


)

)


}



</div>


</div>







{/* TOTAL */}


<div className="
bg-blue-900
text-white
rounded-3xl
p-6
flex
justify-between
text-xl
font-black
">


<span>

Total

</span>


<span>

৳ {order.total}

</span>


</div>






</div>


)


}
