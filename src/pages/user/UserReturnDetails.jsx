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
  FiPackage,
} from "react-icons/fi";


import {
  getUserOrders,
} from "../../services/orderService";


import useAuth from "../../hooks/useAuth";



export default function UserReturnDetails(){


const {
 id
}=useParams();


const navigate =
useNavigate();



const {
 user
}=useAuth();




const [
 order,
 setOrder
]=useState(null);



const [
 loading,
 setLoading
]=useState(true);







useEffect(()=>{


loadReturn();


},[user]);






async function loadReturn(){


try{


if(!user)
return;



const orders =
await getUserOrders(
user.email
);



const found =
orders.find(
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








const statusStyle =
(status)=>{


if(status==="Accepted"){

return "bg-green-100 text-green-700";

}


if(status==="Rejected"){

return "bg-red-100 text-red-700";

}


if(status==="Picked Up"){

return "bg-blue-100 text-blue-700";

}


if(status==="Reviewing"){

return "bg-purple-100 text-purple-700";

}


if(status==="Refunded"){

return "bg-green-100 text-green-700";

}


if(status==="Exchanged"){

return "bg-indigo-100 text-indigo-700";

}


return "bg-yellow-100 text-yellow-700";


};









if(loading)

return (

<div className="
min-h-screen
flex
items-center
justify-center
font-bold
">

Loading...

</div>

);






if(!order)

return (

<div className="
min-h-screen
flex
items-center
justify-center
font-bold
">

Return Not Found

</div>

);






const request =
order.returnRequest || {};






return (


<div

className="
min-h-screen
bg-[#FCFAF5]
px-4
py-6
"

>



<div

className="
max-w-xl
mx-auto
space-y-4
"

>





{/* HEADER */}


<div

className="
flex
items-center
gap-3
"

>


<button

onClick={()=>navigate(-1)}

className="
w-10
h-10
rounded-lg
bg-white
border
flex
items-center
justify-center
"

>

<FiArrowLeft/>

</button>



<h1

className="
text-xl
font-black
"

>

Return Details

</h1>



</div>









{/* STATUS CARD */}


<div

className="
bg-white
border
border-gray-100
rounded-lg
shadow-sm
p-5
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


<p

className="
text-xs
text-gray-500
"

>

Return ID

</p>


<h2

className="
font-black
"

>

#{order.id.slice(0,8)}

</h2>


</div>






<span

className={`

px-3

py-1

rounded-full

text-xs

font-bold

${

statusStyle(
request.status
)

}

`}

>


{
request.status ||
"Submitted"
}


</span>



</div>



</div>









{/* PRODUCTS */}


<div

className="
bg-white
border
border-gray-100
rounded-lg
shadow-sm
p-5
"

>


<h2

className="
font-black
mb-4
flex
items-center
gap-2
"

>

<FiPackage/>

Returned Products

</h2>





<div

className="
space-y-4
"

>


{

request.items?.map(

(item,index)=>(


<div

key={index}

className="
flex
items-center
justify-between
border-b
border-gray-100
pb-4
"

>


<div

className="
flex
items-center
gap-3
"

>


<img

src={
item.image ||
"https://via.placeholder.com/70"
}

className="
w-16
h-16
rounded-lg
object-cover
"

/>



<div>


<h3

className="
font-bold
text-sm
"

>

{item.name}

</h3>



<p

className="
text-xs
text-gray-500
"

>

Qty : {item.quantity}

</p>



</div>


</div>





<p

className="
font-black
"

>

৳ {item.price}

</p>



</div>


)


)



}



</div>


</div>









{/* RETURN INFO */}


<div

className="
bg-white
border
border-gray-100
rounded-lg
shadow-sm
p-5
space-y-3
"

>


<h2

className="
font-black
"

>

Return Information

</h2>



<div>


<p className="
text-xs
text-gray-500
">

Reason

</p>


<p className="
font-bold
">

{request.reason}

</p>


</div>





<div>


<p className="
text-xs
text-gray-500
">

Type

</p>


<p className="
font-bold
">

{request.returnType}

</p>


</div>






{

request.description &&

<div>


<p className="
text-xs
text-gray-500
">

Description

</p>


<p className="
font-medium
">

{request.description}

</p>


</div>


}



</div>









{/* PICKUP ADDRESS */}


<div

className="
bg-white
border
border-gray-100
rounded-lg
shadow-sm
p-5
"

>


<h2

className="
font-black
mb-3
"

>

Pickup Address

</h2>


<p>
{request.pickupAddress?.name}
</p>

<p>
{request.pickupAddress?.phone}
</p>

<p>
{request.pickupAddress?.address}
</p>

<p>
{request.pickupAddress?.postOffice}
</p>

<p>
{request.pickupAddress?.thana}
</p>

<p>
{request.pickupAddress?.district}
</p>



</div>









</div>


</div>


);


}
