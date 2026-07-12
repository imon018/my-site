import {
  useEffect,
  useState
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  FiSearch,
  FiShoppingBag,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiChevronDown,
  FiCalendar
} from "react-icons/fi";


import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from "../../services/orderService";


import {
  successToast,
  errorToast
} from "../../components/ui/Toast";





export default function Orders(){


const navigate = useNavigate();



const [orders,setOrders] =
useState([]);



const [loading,setLoading] =
useState(true);



const [search,setSearch] =
useState("");



const [status,setStatus] =
useState("All Status");



const [payment,setPayment] =
useState("Payment");



const [date,setDate] =
useState("");



const [openFilter,setOpenFilter] =
useState("");





useEffect(()=>{

loadOrders();

},[]);







const loadOrders = async()=>{


try{


const data =
await getAllOrders();


setOrders(data);



}catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};








const changeStatus =
async(id,newStatus)=>{


try{


await updateOrderStatus(
id,
newStatus
);



setOrders(prev=>

prev.map(order=>

order.id===id

?

{
...order,
status:newStatus
}

:

order

)

);


}catch(error){

console.log(error);

}


};








const removeOrder =
async(id)=>{


const ok =
window.confirm(
"Delete this order?"
);


if(!ok)
return;



try{


await deleteOrder(id);



setOrders(prev=>

prev.filter(
order=>order.id!==id
)

);



successToast(
"Order deleted"
);



}catch(error){

errorToast(
"Delete failed"
);

}


};









const filteredOrders =

orders.filter(order=>{



const searchMatch =

order.customerName
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

order.id
?.toLowerCase()
.includes(
search.toLowerCase()
);







const statusMatch =

status==="All Status"

?

true

:

order.status===status;







const paymentMatch =

payment==="Payment"

?

true

:

order.paymentMethod===payment;







const dateMatch =

!date

?

true

:

new Date(
order.createdAt
)
.toISOString()
.slice(0,10)

===date;






return (

searchMatch &&
statusMatch &&
paymentMatch &&
dateMatch

);


});









const totalOrders =
orders.length;



const pending =
orders.filter(
o=>o.status==="Pending"
).length;



const processing =
orders.filter(
o=>o.status==="Processing"
).length;



const delivered =
orders.filter(
o=>o.status==="Delivered"
).length;









if(loading){

return(

<div className="
min-h-screen
flex
items-center
justify-center
font-bold
">

Loading Orders...

</div>

)

}









return(


<div className="
space-y-6
bg-[#faf9f6]
min-h-screen
p-4
lg:p-8
">







{/* HEADER */}



<div>


<h1 className="
text-3xl
font-black
text-slate-900
">

Orders

</h1>



<p className="
text-gray-500
mt-1
">

Dashboard 
<span className="mx-2">
›
</span>
Orders

</p>



</div>









{/* STATS */}



<div className="
grid
grid-cols-2
gap-3
lg:grid-cols-4
">







<StatCard

icon={<FiShoppingBag/>}

title="Total Orders"

value={totalOrders}

color="orange"

/>







<StatCard

icon={<FiClock/>}

title="Pending"

value={pending}

color="yellow"

/>







<StatCard

icon={<FiTruck/>}

title="Processing"

value={processing}

color="blue"

/>







<StatCard

icon={<FiCheckCircle/>}

title="Delivered"

value={delivered}

color="green"

/>






</div>









{/* SEARCH */}



<div className="
relative
">


<FiSearch

className="
absolute
left-5
top-1/2
-translate-y-1/2
text-gray-400
text-xl
"

/>



<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="
Search order ID / customer...
"

className="
w-full
h-14
rounded-2xl
bg-white
border
border-gray-200
shadow-sm
pl-14
pr-5
text-sm
outline-none
focus:ring-2
focus:ring-blue-100
"

/>


</div>









{/* FILTERS */}



<div className="
grid
grid-cols-3
gap-3
">






{/* STATUS */}



<FilterButton

title={status}

icon={<FiChevronDown/>}

open={
openFilter==="status"
}

click={()=>setOpenFilter(
openFilter==="status"
?
""
:
"status"
)}

>

{

[
"All Status",
"Pending",
"Processing",
"Delivered",
"Cancelled"

].map(item=>(


<div

key={item}

onClick={()=>{

setStatus(item);
setOpenFilter("");

}}

className="
px-4
py-3
hover:bg-gray-50
text-sm
"

>

{item}

</div>


))


}


</FilterButton>









{/* PAYMENT */}



<FilterButton

title={payment}

icon={<FiChevronDown/>}

open={
openFilter==="payment"
}

click={()=>setOpenFilter(
openFilter==="payment"
?
""
:
"payment"
)}

>



{

[
"Payment",
"bKash",
"Nagad",
"Bank",
"Cash on Delivery"

].map(item=>(


<div

key={item}

onClick={()=>{

setPayment(item);
setOpenFilter("");

}}

className="
px-4
py-3
hover:bg-gray-50
text-sm
"

>

{item}

</div>


))


}



</FilterButton>









{/* DATE */}



<div className="
relative
">


<div className="
bg-white
h-12
rounded-xl
border
flex
items-center
px-4
gap-2
text-sm
"
>


<FiCalendar/>


<input

type="date"

value={date}

onChange={(e)=>
setDate(e.target.value)
}

className="
outline-none
w-full
"

>


</input>


</div>


</div>






</div>





{/* PART 2 HERE */}

  {/* ==========================
        MOBILE ORDER CARD
========================== */}



<div className="
lg:hidden
space-y-4
">


{

filteredOrders.map(order=>(


<div

key={order.id}

className="
bg-white
rounded-2xl
p-4
border
border-gray-100
shadow-sm
"

>


{/* TOP ROW */}



<div className="
flex
justify-between
items-start
">


<div>


<h3 className="
font-black
text-[15px]
text-slate-900
">

#
{order.id?.slice(0,8)}

</h3>


</div>



<p className="
text-xs
text-gray-500
">

{
new Date(
order.createdAt
)
.toLocaleDateString()
}

</p>



</div>








{/* CUSTOMER + PRICE */}



<div className="
mt-4
flex
justify-between
items-center
">



<div className="
flex
items-center
gap-3
">


<img

src={
order.customerPhoto ||

`https://ui-avatars.com/api/?name=${encodeURIComponent(
order.customerName || "User"
)}`
}

className="
w-10
h-10
rounded-full
object-cover
"

/>



<div>


<h4 className="
font-bold
text-sm
text-slate-800
">

{
order.customerName || "Customer"
}

</h4>



<p className="
text-xs
text-gray-500
">

{
order.email
}

</p>


</div>



</div>







<div className="
text-right
">


<p className="
font-black
text-base
text-slate-900
">

৳ {order.total}

</p>



<p className="
text-xs
text-gray-500
">

{
order.items?.length || 0
}
 Items

</p>


</div>



</div>









{/* BOTTOM ACTION */}



<div className="
mt-4
flex
items-center
justify-between
">







{/* STATUS */}



<select

value={
order.status || "Pending"
}

onChange={(e)=>
changeStatus(
order.id,
e.target.value
)
}


className={`
text-xs
font-bold
px-3
py-2
rounded-full
border-none
outline-none

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

`}

>


<option>
Pending
</option>

<option>
Processing
</option>

<option>
Delivered
</option>

<option>
Cancelled
</option>


</select>









<div className="
flex
gap-2
">






{/* VIEW */}



<button

onClick={()=>navigate(
`/admin/orders/${order.id}`
)}

className="
w-9
h-9
rounded-xl
bg-gray-50
border
flex
items-center
justify-center
text-blue-600
"

>

<FiEye size={17}/>

</button>









{/* MENU */}



<div className="
relative
">


<button

className="
w-9
h-9
rounded-xl
bg-gray-50
border
flex
items-center
justify-center
"

>

⋮

</button>



</div>





</div>





</div>





</div>


))


}


</div>









{/* ==========================
        DESKTOP TABLE START
========================== */}


<div className="
hidden
lg:block
bg-white
rounded-3xl
overflow-hidden
border
border-gray-100
">


<table className="
w-full
">


<thead className="
bg-gray-50
">


<tr>


<th className="
px-6
py-4
text-left
text-xs
text-gray-500
">

Order

</th>


<th className="
px-6
py-4
text-left
text-xs
text-gray-500
">

Customer

</th>


<th className="
px-6
py-4
text-left
text-xs
text-gray-500
">

Items

</th>


<th className="
px-6
py-4
text-left
text-xs
text-gray-500
">

Amount

</th>


<th className="
px-6
py-4
text-left
text-xs
text-gray-500
">

Status

</th>


<th className="
px-6
py-4
text-left
text-xs
text-gray-500
">

Action

</th>


</tr>


</thead>






<tbody>

{
filteredOrders.map(order=>(


<tr

key={order.id}

className="
border-t
"

>


<td className="
px-6
py-5
font-bold
">

#{order.id.slice(0,8)}

</td>





<td className="
px-6
py-5
">

<div className="
flex
items-center
gap-3
">


<img

src={
order.customerPhoto ||
`https://ui-avatars.com/api/?name=${order.customerName}`
}

className="
w-10
h-10
rounded-full
"

/>


<div>

<p className="
font-semibold
">

{order.customerName}

</p>

<p className="
text-xs
text-gray-500
">

{order.email}

</p>

</div>


</div>

</td>






<td className="
px-6
py-5
">

{order.items?.length || 0}

</td>





<td className="
px-6
py-5
font-black
">

৳ {order.total}

</td>




<td className="
px-6
py-5
">


<select

value={order.status}

onChange={(e)=>
changeStatus(
order.id,
e.target.value
)
}

className="
border
rounded-xl
px-3
py-2
text-sm
"

>

<option>Pending</option>
<option>Processing</option>
<option>Delivered</option>
<option>Cancelled</option>


</select>


</td>




<td className="
px-6
py-5
">


<button

onClick={()=>navigate(
`/admin/orders/${order.id}`
)}

className="
w-9
h-9
rounded-xl
bg-blue-50
text-blue-600
flex
items-center
justify-center
"

>

<FiEye/>

</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>

  {/* =========================
      DESKTOP TABLE
========================= */}

<div className="
hidden
lg:block
bg-white
rounded-2xl
border
border-gray-100
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-gray-50
">


<tr>


<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Order ID

</th>



<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Customer

</th>



<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Date

</th>




<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Items

</th>




<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Amount

</th>




<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Status

</th>




<th className="
px-5
py-3
text-left
text-xs
font-semibold
text-gray-500
">

Action

</th>


</tr>


</thead>






<tbody>


{

filteredOrders.map(order=>(


<tr

key={order.id}

className="
border-t
hover:bg-gray-50
transition
"


>



<td className="
px-5
py-4
font-bold
text-sm
">


#{order.id.slice(0,8)}


</td>






<td className="
px-5
py-4
">


<div className="
flex
items-center
gap-3
">


<img

src={
order.customerPhoto ||
`https://ui-avatars.com/api/?name=${order.customerName}`
}

className="
w-9
h-9
rounded-full
object-cover
"

/>



<div>

<p className="
text-sm
font-semibold
">

{order.customerName}

</p>


<p className="
text-xs
text-gray-500
">

{order.email}

</p>


</div>


</div>


</td>






<td className="
px-5
py-4
text-sm
text-gray-500
">


{
new Date(order.createdAt)
.toLocaleDateString()
}


</td>






<td className="
px-5
py-4
text-sm
">


{
order.items?.length || 0
}

Items


</td>






<td className="
px-5
py-4
font-bold
text-sm
text-blue-600
">


৳ {order.total}


</td>






<td className="
px-5
py-4
">


<select


value={
order.status || "Pending"
}


onChange={(e)=>
changeStatus(
order.id,
e.target.value
)
}


className={`

text-xs
font-semibold
px-3
py-2
rounded-xl
outline-none

${
order.status==="Delivered"

?
"bg-green-100 text-green-700"

:

order.status==="Processing"

?

"bg-orange-100 text-orange-700"

:

order.status==="Cancelled"

?

"bg-red-100 text-red-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

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



</td>








<td className="
px-5
py-4
">


<div className="
flex
items-center
gap-2
">


<button

onClick={()=>navigate(
`/admin/orders/${order.id}`
)}

className="
w-9
h-9
rounded-xl
bg-blue-50
text-blue-600
flex
items-center
justify-center
"

>

<FiEye size={16}/>

</button>





<div className="relative">


<button

onClick={()=>setMenuOpen(
menuOpen===order.id
?
null
:
order.id
)}

className="
w-9
h-9
rounded-xl
bg-gray-100
flex
items-center
justify-center
"

>

<FiMoreVertical size={16}/>


</button>





{
menuOpen===order.id &&

<div className="
absolute
right-0
top-10
bg-white
rounded-xl
shadow-xl
border
w-32
z-50
overflow-hidden
">


<button

onClick={()=>removeOrder(order.id)}

className="
w-full
text-left
px-3
py-2
text-sm
text-red-600
hover:bg-red-50
"

>

Delete

</button>


</div>

}


</div>


</div>


</td>





</tr>


))


}



</tbody>


</table>


</div>






</div>

);


}







// =============================
// STAT CARD
// =============================


function StatCard({
icon,
title,
value,
color
}){


const styles={

orange:
"bg-orange-50 text-orange-500",

yellow:
"bg-yellow-50 text-yellow-500",

blue:
"bg-blue-50 text-blue-500",

green:
"bg-green-50 text-green-500"

};



return(

<div className="
bg-white
rounded-2xl
border
border-gray-100
px-4
py-3
flex
items-center
gap-3
">


<div className={`
w-10
h-10
rounded-xl
flex
items-center
justify-center
${styles[color]}
`}>

{icon}

</div>




<div>


<p className="
text-xs
text-gray-500
">

{title}

</p>



<h2 className="
text-xl
font-black
text-slate-800
">

{value}

</h2>


</div>



</div>


)


}
