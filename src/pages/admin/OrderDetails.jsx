import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";


import {
  FiArrowLeft,
  FiTrash2,
  FiPackage,
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";


import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/orderService";


import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";





export default function OrderDetails(){



const { id } = useParams();


const navigate = useNavigate();




const [order,setOrder] =
useState(null);


const [loading,setLoading] =
useState(true);






useEffect(()=>{

loadOrder();

},[id]);







async function loadOrder(){


try{


const data =
await getAllOrders();



const found =
data.find(
(item)=>item.id===id
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









async function changeStatus(status){


try{


await updateOrderStatus(
id,
status
);



setOrder(prev=>({

...prev,

status

}));



successToast(
"Order status updated."
);



}
catch(error){

console.log(error);

errorToast(
"Failed to update status."
);


}


}









async function removeOrder(){


const confirmDelete =
window.confirm(
"Delete this order permanently?"
);



if(!confirmDelete)
return;




try{


await deleteOrder(id);



successToast(
"Order deleted successfully."
);



navigate("/admin/orders");



}
catch(error){

console.log(error);


errorToast(
"Failed to delete order."
);


}


}







if(loading){


return(

<div className="
min-h-[60vh]
flex
items-center
justify-center
font-bold
text-xl
">


Loading Order...


</div>

);


}






if(!order){


return(

<div className="
min-h-[60vh]
flex
flex-col
gap-5
items-center
justify-center
">


<h2 className="
text-2xl
font-bold
">

Order Not Found

</h2>



<button

onClick={()=>navigate(-1)}

className="
bg-amber-500
text-white
px-5
py-3
rounded-xl
"

>

Go Back

</button>


</div>


);


}








return(


<div className="
space-y-6
">







{/* HEADER */}



<div className="
flex
flex-col
md:flex-row
justify-between
gap-4
">


<button

onClick={()=>navigate(-1)}

className="
bg-white
px-5
py-3
rounded-2xl
shadow-sm
flex
items-center
gap-2
font-semibold
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
rounded-2xl
flex
items-center
justify-center
gap-2
"

>

<FiTrash2/>

Delete Order

</button>


</div>










{/* ORDER TOP CARD */}



<div className="
bg-white
rounded-3xl
p-6
shadow-sm
">


<div className="
flex
flex-col
md:flex-row
justify-between
gap-5
">


<div>


<p className="
text-gray-500
text-sm
">

Order ID

</p>


<h1 className="
text-2xl
font-black
">

#{order.id.slice(0,10)}

</h1>


</div>





<div>


<p className="
text-gray-500
text-sm
mb-2
">

Order Status

</p>



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
font-semibold
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



</div>


</div>









{/* CUSTOMER INFO */}



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
className="
text-amber-500
"
size={24}
/>


<h2 className="
text-xl
font-black
">

Customer Information

</h2>


</div>





<div className="
grid
md:grid-cols-2
gap-5
">


<div className="
flex
gap-3
">

<FiUser/>

<p>
{order.customerName}
</p>

</div>





<div className="
flex
gap-3
">

<FiMail/>

<p>
{order.email}
</p>

</div>





<div className="
flex
gap-3
">

<FiPhone/>

<p>
{order.phone}
</p>

</div>





<div className="
flex
gap-3
">

<FiMapPin/>

<p>
{order.address}
</p>

</div>



</div>



</div>









{/* REQUEST ALERT */}



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
font-black
mb-3
">

Customer Request

</h2>



{
order.cancelRequested &&

<p className="
text-red-600
font-bold
">

⚠ Cancel Request Received

</p>

}




{
order.returnRequested &&

<p className="
text-blue-600
font-bold
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
className="
text-blue-600
"
size={24}
/>


<h2 className="
text-xl
font-black
">

Products

</h2>


</div>







<div className="
space-y-4
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
pb-4
gap-4
"

>


<div className="
flex
items-center
gap-4
">


<img

src={
item.image ||
"https://via.placeholder.com/80"
}

className="
w-16
h-16
rounded-xl
object-cover
"

/>



<div>


<h3 className="
font-bold
">

{item.name}

</h3>



<p className="
text-sm
text-gray-500
">

Qty:
{item.quantity}

</p>


</div>


</div>





<p className="
font-black
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

Total Amount

</span>


<span>

৳ {order.total}

</span>


</div>






</div>


);


}
