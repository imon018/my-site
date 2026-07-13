import {
  useEffect,
  useState
} from "react";


import {
  useParams,
  useNavigate
} from "react-router-dom";


import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiShoppingBag,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";


import {
  getUserById
} from "../../services/adminService";


import {
  getUserOrders
} from "../../services/orderService";




export default function UserDetails(){


const {
id
} = useParams();


const navigate =
useNavigate();



const [user,setUser] =
useState(null);


const [orders,setOrders] =
useState([]);


const [loading,setLoading] =
useState(true);





useEffect(()=>{

loadData();

},[]);





async function loadData(){


try{


setLoading(true);



const userData =
await getUserById(id);



setUser(userData);




if(userData?.email){


const orderData =
await getUserOrders(
userData.email
);


setOrders(orderData);


}



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}







const totalOrders =
orders.length;



const delivered =
orders.filter(
order =>
order.status==="Delivered"
).length;



const processing =
orders.filter(
order =>
order.status==="Processing"
).length;



const pending =
orders.filter(
order =>
order.status==="Pending"
).length;



const cancelled =
orders.filter(
order =>
order.status==="Cancelled"
).length;



const totalSpent =
orders.reduce(
(sum,order)=>
sum + Number(order.total || 0),
0
);







if(loading){

return(

<div
className="
min-h-screen
bg-[#FAF7F2]
p-4
md:p-8
flex
items-center
justify-center
"
>

Loading...

</div>

)

}







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
max-w-5xl
mx-auto
"
>





{/* HEADER */}


<div
className="
flex
items-center
gap-3
mb-6
"
>


<button

onClick={()=>
navigate(-1)
}

className="
w-10
h-10
rounded-xl
bg-white
border
border-gray-100
flex
items-center
justify-center
text-gray-600
"

>

<FiArrowLeft/>

</button>



<div>


<h1
className="
text-2xl
font-black
text-[#172033]
"
>

User Details

</h1>


<p
className="
text-sm
text-gray-500
mt-1
"
>

Dashboard › Users

</p>


</div>


</div>









{/* PROFILE CARD */}


<div
className="
bg-white
rounded-xl
p-5
md:p-6
shadow-sm
border
border-gray-100
mb-5
"
>


<div
className="
flex
items-center
gap-4
"
>


<img

src={
user?.photoURL ||
`https://ui-avatars.com/api/?name=${user?.name}`
}

className="
w-20
h-20
rounded-full
object-cover
border
border-gray-100
"

/>



<div>


<h2
className="
text-xl
font-black
text-[#172033]
"
>

{
user?.name || "User"
}

</h2>


<p
className="
text-sm
text-gray-500
"
>

{user?.email}

</p>



<span
className="
inline-block
mt-2
px-3
py-1
rounded-lg
text-xs
bg-[#FFF7E8]
text-amber-600
font-semibold
"
>

{
user?.role || "User"
}

</span>


</div>


</div>







<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-4
mt-6
"
>



<div
className="
flex
items-center
gap-3
bg-[#FAF7F2]
rounded-xl
p-3
"
>

<FiMail
className="
text-amber-500
"
/>

<div>

<p className="
text-xs
text-gray-500
">
Email
</p>

<p className="
text-sm
font-semibold
">
{user?.email}
</p>

</div>


</div>





<div
className="
flex
items-center
gap-3
bg-[#FAF7F2]
rounded-xl
p-3
"
>

<FiPhone
className="
text-amber-500
"
/>


<div>

<p className="
text-xs
text-gray-500
">
Phone
</p>


<p className="
text-sm
font-semibold
">
{
user?.phone || "Not added"
}
</p>


</div>


</div>



</div>



</div>









{/* ORDER SUMMARY */}


<div
className="
bg-white
rounded-xl
p-5
md:p-6
shadow-sm
border
border-gray-100
mb-5
"
>


<h2
className="
font-black
text-lg
mb-4
text-[#172033]
"
>

Order Summary

</h2>



<div
className="
grid
grid-cols-2
md:grid-cols-3
gap-3
"
>


{
[
["Total Orders",totalOrders],
["Delivered",delivered],
["Processing",processing],
["Pending",pending],
["Cancelled",cancelled],
["Total Spent",`৳${totalSpent}`]
]
.map(
(item,index)=>(


<div

key={index}

className="
bg-[#FAF7F2]
rounded-xl
p-4
"

>


<p
className="
text-xs
text-gray-500
"
>

{item[0]}

</p>


<h3
className="
text-xl
font-black
mt-1
"
>

{item[1]}

</h3>


</div>


)

)

}


</div>


</div>









{/* RECENT ORDERS */}


<div
className="
bg-white
rounded-xl
p-5
md:p-6
shadow-sm
border
border-gray-100
"
>


<h2
className="
font-black
text-lg
mb-4
text-[#172033]
"
>

Recent Orders

</h2>




<div
className="
space-y-3
"
>


{
orders.slice(0,5)
.map(
(order)=>(


<div

key={order.id}

className="
flex
items-center
justify-between
bg-[#FAF7F2]
rounded-xl
p-4
"

>


<div>


<h3
className="
font-bold
text-sm
"
>

#{order.id}

</h3>


<p
className="
text-xs
text-gray-500
"
>

{order.productName || "Product"}

</p>


</div>



<div
className="
text-right
"
>


<p
className="
font-bold
text-sm
"
>

৳{order.total}

</p>



<span
className="
text-xs
text-amber-600
font-semibold
"
>

{order.status}

</span>


</div>


</div>


)

)

}



</div>



</div>






</div>

</div>


);

}
