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
  FiImage,
  FiEdit,
} from "react-icons/fi";


import {
  getUserReturnDetails,
  updateReturnRequest,
} from "../../services/orderService";


import useAuth from "../../hooks/useAuth";


import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";






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




const [
 editMode,
 setEditMode
]=useState(false);



const [
 saving,
 setSaving
]=useState(false);








// =========================
// FORM STATE
// =========================


const [
 reason,
 setReason
]=useState("");



const [
 description,
 setDescription
]=useState("");



const [
 returnType,
 setReturnType
]=useState("");



const [
 refundMethod,
 setRefundMethod
]=useState("");



const [
 refundNumber,
 setRefundNumber
]=useState("");




const [
 pickupAddress,
 setPickupAddress
]=useState({

name:"",
phone:"",
address:"",
postOffice:"",
thana:"",
district:"",

});




const [
 images,
 setImages
]=useState([]);









// =========================
// LOAD RETURN
// =========================


useEffect(()=>{


loadReturn();


},[user]);






async function loadReturn(){


try{


if(!user)
return;



const data =
await getUserReturnDetails(id);



setOrder(data);



const request =
data.returnRequest || {};




setReason(
request.reason || ""
);



setDescription(
request.description || ""
);



setReturnType(
request.returnType || ""
);



setRefundMethod(
request.refundMethod || ""
);



setRefundNumber(
request.refundNumber || ""
);



setPickupAddress(

request.pickupAddress ||

{

name:"",
phone:"",
address:"",
postOffice:"",
thana:"",
district:""

}

);



setImages(
request.images || []
);



}

catch(error){

console.log(error);


errorToast(
"Failed to load return"
);


}

finally{

setLoading(false);

}


}








// =========================
// STATUS COLOR
// =========================


const statusStyle =
(status)=>{


switch(status){


case "Accepted":

return "bg-green-100 text-green-700";


case "Rejected":

return "bg-red-100 text-red-700";



case "Picked Up":

return "bg-blue-100 text-blue-700";



case "Reviewing":

return "bg-purple-100 text-purple-700";



case "Shipped":

return "bg-indigo-100 text-indigo-700";



case "Refunded":

return "bg-green-100 text-green-700";



case "Exchanged":

return "bg-indigo-100 text-indigo-700";



default:

return "bg-yellow-100 text-yellow-700";


}


};








if(loading)


return (

<div

className="
min-h-screen
flex
items-center
justify-center
font-bold
"

>

Loading...

</div>

);








if(!order)


return (

<div

className="
min-h-screen
flex
items-center
justify-center
font-bold
"

>

Return Not Found

</div>

);






const request =
order.returnRequest || {};



const canEdit =
request.status === "Submitted";






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
justify-between
"

>


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





{

canEdit && !editMode &&


<button

onClick={()=>setEditMode(true)}

className="
w-10
h-10
rounded-lg
bg-white
border
flex
items-center
justify-center
text-amber-600
"

>

<FiEdit/>

</button>


}



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


}



</div>


</div>









{/* PRODUCT PHOTOS */}


{

request.images?.length > 0 &&


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
flex
items-center
gap-2
"

>

<FiImage/>

Product Photos

</h2>





<div

className="
grid
grid-cols-3
gap-3
"

>


{

request.images.map(

(img,index)=>{


const imageUrl =

typeof img === "string"

?

img

:

img?.imageUrl ||

img?.url;




return (


<img

key={index}

src={imageUrl}

className="
w-full
h-28
rounded-lg
object-cover
border
"

/>


)


}


)


}



</div>



</div>


}









{/* RETURN INFORMATION */}


<div

className="
bg-white
border
border-gray-100
rounded-lg
shadow-sm
p-5
space-y-4
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


<p

className="
text-xs
text-gray-500
mb-1
"

>

Reason

</p>




{

editMode ?




<select

value={reason}

onChange={

e=>

setReason(
e.target.value
)

}

className="
w-full
border
rounded-lg
p-3
text-sm
"

>


<option>
Product damaged
</option>


<option>
Wrong product received
</option>


<option>
Size issue
</option>


<option>
Quality issue
</option>


<option>
Color mismatch
</option>


<option>
Other
</option>


</select>





:




<p

className="
font-bold
"

>

{reason}

</p>


}



</div>









<div>


<p

className="
text-xs
text-gray-500
mb-1
"

>

Type

</p>




{

editMode ?



<select

value={returnType}

onChange={

e=>

setReturnType(
e.target.value
)

}

className="
w-full
border
rounded-lg
p-3
text-sm
"

>


<option value="">
Select
</option>


<option value="Refund">
Refund
</option>


<option value="Exchange">
Exchange
</option>


</select>




:



<p

className="
font-bold
"

>

{returnType}

</p>


}



</div>









<div>


<p

className="
text-xs
text-gray-500
mb-1
"

>

Description

</p>



{

editMode ?


<textarea

value={description}

onChange={

e=>

setDescription(
e.target.value
)

}

rows="4"

className="
w-full
border
rounded-lg
p-3
text-sm
"

/>



:


<p

className="
font-medium
"

>

{description}

</p>



}



</div>









{

request.refundMethod &&



<div>


<p

className="
text-xs
text-gray-500
"

>

Refund Method

</p>


<p

className="
font-bold
"

>

{request.refundMethod}

-

{request.refundNumber}

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





{

editMode ?


<div

className="
space-y-3
"

>


{

[
"name",
"phone",
"address",
"postOffice",
"thana",
"district"

].map(field=>(


<input


key={field}


value={
pickupAddress[field] || ""
}


onChange={(e)=>{


setPickupAddress({

...pickupAddress,


[field]:
e.target.value


});


}}


placeholder={field}


className="
w-full
border
rounded-lg
p-3
text-sm
"

/>


))


}



</div>


:


<div

className="
space-y-1
text-sm
"

>


<p>
{pickupAddress.name}
</p>


<p>
{pickupAddress.phone}
</p>


<p>
{pickupAddress.address}
</p>


<p>
{pickupAddress.postOffice}
</p>


<p>
{pickupAddress.thana}
</p>


<p>
{pickupAddress.district}
</p>


</div>


}



</div>









{/* EDIT ACTION */}


{

editMode &&


<div

className="
flex
gap-3
"

>


<button


onClick={()=>setEditMode(false)}


disabled={saving}


className="
flex-1
py-3
rounded-lg
border
font-bold
bg-white
"

>


Cancel


</button>







<button


disabled={saving}


onClick={async()=>{


try{


setSaving(true);



await updateReturnRequest(

id,

{


reason,

description,

returnType,

refundMethod,

refundNumber,

pickupAddress,

images,


}

);




successToast(
"Return updated successfully"
);



setEditMode(false);



loadReturn();



}

catch(error){


console.log(error);


errorToast(

error.message ||

"Update failed"

);


}

finally{


setSaving(false);


}



}}


className="
flex-1
py-3
rounded-lg
bg-amber-500
text-white
font-bold
"

>


{

saving
?

"Saving..."

:

"Save"

}


</button>



</div>


}






</div>


</div>


);

}
