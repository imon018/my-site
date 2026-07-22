import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FiPhone,
  FiShoppingCart,
  FiCheckCircle,
  FiStar,
  FiClock,
  FiTruck,
  FiShield,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import Button from "../../components/ui/Button";

import useAuth from "../../hooks/useAuth";

import {
  getLandingPageBySlug,
  incrementLandingView,
  incrementLandingOrders,
} from "../../services/landingPageService";

import {
  createOrder,
} from "../../services/orderService";

import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";

export default function LandingPage() {

const { slug } = useParams();

const navigate = useNavigate();

const { user } = useAuth();

const [loading,setLoading] = useState(true);

const [landing,setLanding] = useState(null);

const [activeImage,setActiveImage] = useState(0);

const [ordering,setOrdering] = useState(false);

const [customerName,setCustomerName] = useState("");

const [phone,setPhone] = useState("");

const [address,setAddress] = useState("");

const [deliveryArea,setDeliveryArea] = useState("Dhaka City");

const [countdown,setCountdown] = useState({

days:0,

hours:0,

minutes:0,

seconds:0,

});

useEffect(()=>{

loadLanding();

},[slug]);

async function loadLanding(){

try{

setLoading(true);

const data = await getLandingPageBySlug(slug);

if(!data){

navigate("/404");

return;

}

setLanding(data);

await incrementLandingView(data.id);

if(user){

setCustomerName(user.name || "");

setPhone(user.phone || "");

}

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

}

useEffect(()=>{

if(!landing?.offerEndDate) return;

const timer = setInterval(()=>{

const end = new Date(

landing.offerEndDate

).getTime();

const now = new Date().getTime();

const diff = end-now;

if(diff<=0){

clearInterval(timer);

return;

}

setCountdown({

days:Math.floor(

diff/(1000*60*60*24)

),

hours:Math.floor(

(diff%(1000*60*60*24))

/

(1000*60*60)

),

minutes:Math.floor(

(diff%(1000*60*60))

/

(1000*60)

),

seconds:Math.floor(

(diff%(1000*60))

/

1000

),

});

},1000);

return()=>clearInterval(timer);

},[landing]);

const deliveryCharge =

deliveryArea==="Dhaka City"

?80

:

deliveryArea==="Dhaka Sub Area"

?100

:

120;

const subtotal =

Number(

landing?.offerPrice ||

landing?.price ||

0

);

const total =

subtotal +

deliveryCharge;

async function handleOrder(){

if(ordering) return;

if(

!customerName ||

!phone ||

!address

){

errorToast(

"Please fill all required information."

);

return;

}

try{

setOrdering(true);



  const orderId =
await createOrder({

userId:user?.uid || null,

customerName,

email:user?.email || "",

phone,

address,

deliveryArea,

deliveryCharge,

items:[

{

id:landing.productId,

name:landing.title,

price:subtotal,

quantity:1,

image:

landing.gallery?.[0] ||

landing.thumbnail ||

"",


},

],

subtotal,

total,

status:"Pending",

landingId:landing.id,

landingSlug:landing.slug,

createdAt:
new Date().toISOString(),

});

await incrementLandingOrders(

landing.id,

total

);

successToast(

"Order placed successfully."

);

navigate(

"/order-success",

{

state:{

orderId,

},

}

);

}

catch(error){

console.log(error);

errorToast(

"Order failed."

);

}

finally{

setOrdering(false);

}

}

if(loading){

return(

<div className="

min-h-screen

flex

items-center

justify-center

text-xl

font-bold

text-amber-600

">

Loading Landing...

</div>

);

}

if(!landing){

return(

<div className="

min-h-screen

flex

items-center

justify-center

text-red-500

font-bold

text-xl

">

Landing Page Not Found

</div>

);

}

const images =

landing.gallery?.length

?

landing.gallery

:

landing.image

?

[landing.image]

:

[];

return(

<div className="

min-h-screen

bg-[#faf8f5]

">

{/* HERO */}

<section className="

max-w-7xl

mx-auto

px-4

py-8

grid

lg:grid-cols-2

gap-10

items-start

">

{/* LEFT */}

<div>

<div className="

rounded-3xl

overflow-hidden

bg-white

border

">

<img

src={

images[activeImage]

}

alt={landing.title}

className="

w-full

aspect-square

object-cover

"

/>

</div>

{

images.length>1 && (

<div className="

grid

grid-cols-5

gap-3

mt-4

">

{

images.map(

(image,index)=>(

<button

key={index}

onClick={()=>

setActiveImage(index)

}

className={`

rounded-xl

overflow-hidden

border-2

${

activeImage===index

?

"border-amber-500"

:

"border-transparent"

}

`}

>

<img

src={image}

className="

w-full

h-20

object-cover

"

/>

</button>

)

)

}

</div>

)

}

</div>

{/* RIGHT */}

<div>

<div className="

inline-flex

items-center

gap-2

bg-red-100

text-red-600

font-bold

px-4

py-2

rounded-full

">

🔥 Limited Time Offer

</div>

<h1 className="

mt-5

text-4xl

font-black

text-slate-900

leading-tight

">

{landing.title}

</h1>

<p className="

mt-5

text-gray-600

leading-8

">

{landing.description}

</p>

<div className="

mt-8

flex

items-center

gap-4

">

<span className="

text-5xl

font-black

text-amber-600

">

৳ {landing.offerPrice || landing.price}

</span>

{

landing.offerPrice && (

<span className="

text-2xl

line-through

text-gray-400

">

৳ {landing.price}

</span>

)

}



  <div className="

mt-6

flex

items-center

gap-3

flex-wrap

">

{

landing.offerPrice && (

<div className="

px-4

py-2

rounded-full

bg-green-100

text-green-700

font-bold

">

Save ৳ {

Number(landing.price) -

Number(landing.offerPrice)

}

</div>

)

}

<div className="

px-4

py-2

rounded-full

bg-blue-100

text-blue-700

font-bold

flex

items-center

gap-2

">

<FiTruck/>

Cash On Delivery

</div>

<div className="

px-4

py-2

rounded-full

bg-purple-100

text-purple-700

font-bold

flex

items-center

gap-2

">

<FiShield/>

100% Authentic

</div>

</div>

{

landing.offerEndDate && (

<div className="

mt-8

rounded-2xl

bg-red-50

border

border-red-200

p-5

">

<div className="

flex

items-center

gap-2

font-black

text-red-600

mb-4

">

<FiClock/>

Offer Ends In

</div>

<div className="

grid

grid-cols-4

gap-3

">

{

[

{

label:"Days",

value:countdown.days,

},

{

label:"Hours",

value:countdown.hours,

},

{

label:"Minutes",

value:countdown.minutes,

},

{

label:"Seconds",

value:countdown.seconds,

},

].map(item=>(

<div

key={item.label}

className="

bg-white

rounded-xl

py-4

text-center

"

>

<h2 className="

text-3xl

font-black

text-slate-900

">

{item.value}

</h2>

<p className="

text-xs

text-gray-500

mt-1

">

{item.label}

</p>

</div>

))

}

</div>

</div>

)

}

{

landing.features?.length>0 && (

<div className="

mt-10

">

<h2 className="

text-2xl

font-black

mb-5

">

Product Features

</h2>

<div className="

space-y-4

">

{

landing.features.map(

(feature,index)=>(

<div

key={index}

className="

flex

items-start

gap-3

"

>

<div className="

text-green-600

mt-1

">

<FiCheckCircle/>

</div>

<p className="

text-gray-700

leading-7

">

{feature}

</p>

</div>

)

)

}

</div>

</div>

)

}



  {/* ORDER SECTION */}

</div>

</section>

<section className="

bg-white

py-10

border-t

">

<div className="

max-w-7xl

mx-auto

px-4

grid

lg:grid-cols-2

gap-10

">

{/* DELIVERY INFO */}

<div>

<h2 className="

text-3xl

font-black

text-slate-900

mb-6

">

Why Buy From Us?

</h2>

<div className="

space-y-5

">

<div className="

flex

gap-4

">

<div className="

w-12

h-12

rounded-full

bg-green-100

flex

items-center

justify-center

text-green-600

">

<FiTruck size={22}/>

</div>

<div>

<h3 className="font-bold">

Fast Delivery

</h3>

<p className="text-gray-500">

All over Bangladesh delivery available.

</p>

</div>

</div>

<div className="

flex

gap-4

">

<div className="

w-12

h-12

rounded-full

bg-blue-100

flex

items-center

justify-center

text-blue-600

">

<FiShield size={22}/>

</div>

<div>

<h3 className="font-bold">

Cash On Delivery

</h3>

<p className="text-gray-500">

Pay only after receiving the product.

</p>

</div>

</div>

<div className="

flex

gap-4

">

<div className="

w-12

h-12

rounded-full

bg-yellow-100

flex

items-center

justify-center

text-yellow-600

">

<FiCheckCircle size={22}/>

</div>

<div>

<h3 className="font-bold">

Premium Quality

</h3>

<p className="text-gray-500">

100% original quality guaranteed.

</p>

</div>

</div>

</div>

</div>

{/* COD ORDER FORM */}

<div className="

bg-[#faf8f5]

rounded-3xl

border

p-6

shadow-sm

">

<h2 className="

text-2xl

font-black

mb-6

">

Place Your Order

</h2>

<input

type="text"

placeholder="Full Name"

value={customerName}

onChange={(e)=>

setCustomerName(

e.target.value

)

}

className="

w-full

h-12

border

rounded-xl

px-4

mb-4

outline-none

"

/>

<input

type="tel"

placeholder="Phone Number"

value={phone}

onChange={(e)=>

setPhone(

e.target.value

)

}

className="

w-full

h-12

border

rounded-xl

px-4

mb-4

outline-none

"

/>

<textarea

placeholder="Full Address"

value={address}

onChange={(e)=>

setAddress(

e.target.value

)

}

className="

w-full

h-28

border

rounded-xl

p-4

mb-4

outline-none

resize-none

"

/>

<select

value={deliveryArea}

onChange={(e)=>

setDeliveryArea(

e.target.value

)

}

className="

w-full

h-12

border

rounded-xl

px-4

mb-6

outline-none

"

>

<option>

Dhaka City

</option>

<option>

Dhaka Sub Area

</option>

<option>

Outside Dhaka

</option>

</select>



  {/* ORDER SUMMARY */}

<div className="

rounded-2xl

bg-white

border

p-5

mb-6

space-y-4

">

<div className="

flex

justify-between

">

<span>

Product Price

</span>

<b>

৳ {subtotal}

</b>

</div>

<div className="

flex

justify-between

">

<span>

Delivery Charge

</span>

<b>

৳ {deliveryCharge}

</b>

</div>

<div className="

border-t

pt-4

flex

justify-between

text-xl

font-black

">

<span>

Total

</span>

<span className="

text-amber-600

">

৳ {total}

</span>

</div>

</div>

<Button

onClick={handleOrder}

disabled={ordering}

className="

w-full

h-14

rounded-2xl

bg-amber-500

hover:bg-amber-600

text-white

font-black

text-lg

"

>

{

ordering

?

"Processing..."

:

"Place Order"

}

</Button>

<p className="

text-center

text-xs

text-gray-500

mt-4

">

By placing your order you agree to our delivery terms.

</p>

</div>

</div>

</section>

{/* STICKY MOBILE BUTTON */}

<div className="

fixed

bottom-0

left-0

right-0

lg:hidden

bg-white

border-t

shadow-2xl

p-3

z-50

">

<Button

onClick={()=>

window.scrollTo({

top:document.body.scrollHeight,

behavior:"smooth",

})

}

className="

w-full

h-12

rounded-xl

bg-red-500

text-white

font-black

animate-pulse

"

>

<FiShoppingCart className="inline mr-2"/>

Order Now • ৳ {total}

</Button>

</div>

</div>

);

}
