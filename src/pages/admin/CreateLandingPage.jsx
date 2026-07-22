import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FiPackage,
  FiEdit3,
  FiImage,
  FiTruck,
  FiSettings,
  FiEye,
  FiXCircle,
} from "react-icons/fi";

import Button from "../../components/ui/Button";

import {
  successToast,
  errorToast,
} from "../../components/ui/Toast";

import {
  getProductsFromDB,
} from "../../services/firestoreProductService";

import {
  createLandingPage,
} from "../../services/landingPageService";

export default function CreateLandingPage() {

  const navigate = useNavigate();

  const [loading,setLoading]=useState(false);

  const [products,setProducts]=useState([]);

  const [selectedProduct,setSelectedProduct]=
    useState("");

  const [title,setTitle]=
    useState("");

  const [slug,setSlug]=
    useState("");

  const [description,setDescription]=
    useState("");

  const [price,setPrice]=
    useState("");

  const [offerPrice,setOfferPrice]=
    useState("");

  const [heroImage,setHeroImage]=
    useState("");

  const [deliveryZone,setDeliveryZone]=
    useState("inside");

  const [deliveryCharge,setDeliveryCharge]=
    useState(80);

  const [cashOnDelivery,setCashOnDelivery]=
    useState(true);

  const [status,setStatus]=
    useState("draft");

  const [showCancelModal,setShowCancelModal]=
    useState(false);

  useEffect(()=>{

    loadProducts();

  },[]);

  async function loadProducts(){

    try{

      const data=
        await getProductsFromDB();

      setProducts(data);

    }

    catch(error){

      console.log(error);

      errorToast(
        "Failed to load products."
      );

    }

  }

  function handleProductSelect(id){

    setSelectedProduct(id);

    const product=
      products.find(
        item=>item.id===id
      );

    if(!product) return;

    setTitle(
      product.name || ""
    );

    setSlug(

      (product.name || "")

      .toLowerCase()

      .replace(/\s+/g,"-")

      .replace(/[^a-z0-9-]/g,"")

    );

    setDescription(
      product.description || ""
    );

    setPrice(
      product.price || ""
    );

    setOfferPrice(
      product.price || ""
    );

    setHeroImage(

      product.image ||

      product.images?.[0] ||

      ""

    );

  }

  useEffect(()=>{

    switch(deliveryZone){

      case "inside":

        setDeliveryCharge(80);

      break;

      case "sub":

        setDeliveryCharge(100);

      break;

      case "outside":

        setDeliveryCharge(120);

      break;

      default:

        setDeliveryCharge(80);

    }

  },[
    deliveryZone
  ]);

  const landingData=useMemo(()=>({

    productId:
      selectedProduct,

    title,

    slug,

    description,

    price:Number(price),

    offerPrice:Number(
      offerPrice
    ),

    heroImage,

    deliveryCharge,

    cashOnDelivery,

    status,

    views:0,

    orders:0,

    revenue:0,

    createdAt:new Date(),

  }),[

    selectedProduct,

    title,

    slug,

    description,

    price,

    offerPrice,

    heroImage,

    deliveryCharge,

    cashOnDelivery,

    status,

  ]);

  function handlePreview(){

    if(!slug){

      errorToast(
        "Landing URL required."
      );

      return;

    }

    window.open(

      `/landing/${slug}`,

      "_blank"

    );

  }

  async function handleSubmit(e){

    e.preventDefault();

    if(

      !selectedProduct ||

      !title ||

      !slug ||

      !description ||

      !heroImage

    ){

      errorToast(

        "Please fill all required fields."

      );

      return;

    }

    try{

      setLoading(true);

      await createLandingPage(
        landingData
      );

      successToast(
        "Landing Page Created Successfully."
      );

      navigate(
        "/admin/landing"
      );

    }

    catch(error){

      console.log(error);

      errorToast(

        error.message ||

        "Failed to create landing page."

      );

    }

    finally{

      setLoading(false);

    }

  }

  function handleCancel(){

    navigate("/admin/landing");

  }

  return(

    <div
      className="
      min-h-screen
      bg-[#FAF7F2]
      p-4
      lg:p-8
      "
    >

      <div
        className="
        max-w-5xl
        mx-auto
        space-y-6
        "
      >


        {/* =========================
    HEADER
========================= */}

<div
  className="
  bg-white
  rounded-lg
  border
  border-amber-200
  shadow-sm
  overflow-hidden
  "
>

  <div
    className="
    px-6
    py-5
    flex
    items-center
    justify-between
    "
  >

    <div>

      <h1
        className="
        text-2xl
        lg:text-3xl
        font-black
        text-slate-900
        "
      >

        Create Landing Page

      </h1>

      <p
        className="
        text-gray-500
        mt-1
        "
      >

        Facebook Single Product Landing Builder

      </p>

    </div>

    <div
      className="
      w-14
      h-14
      rounded-lg
      bg-amber-500
      flex
      items-center
      justify-center
      text-white
      "
    >

      <FiPackage size={28}/>

    </div>

  </div>

</div>

{/* =========================
    BASIC INFORMATION
========================= */}

<form

  onSubmit={handleSubmit}

  className="space-y-6"

>

<div
className="
bg-white
rounded-lg
border
border-amber-200
shadow-sm
overflow-hidden
"
>

<div
className="
px-5
py-4
bg-amber-50
border-b
border-amber-100
flex
items-center
gap-3
"
>

<div
className="
w-10
h-10
rounded-lg
bg-amber-500
text-white
flex
items-center
justify-center
"
>

<FiEdit3/>

</div>

<h2
className="
text-lg
font-bold
"
>

Basic Information

</h2>

</div>

<div
className="
p-5
space-y-5
"
>

{/* Landing Name */}

<div>

<label
className="
block
font-semibold
mb-2
"
>

Landing Page Name

<span className="text-red-500">

 *

</span>

</label>

<input

value={title}

onChange={(e)=>

setTitle(
e.target.value
)

}

placeholder="Wireless Earbuds Offer"

className="
w-full
h-12
rounded-lg
border
border-amber-200
px-4
outline-none
focus:border-amber-500
focus:ring-4
focus:ring-amber-100
"

/>

</div>

{/* Slug */}

<div>

<label
className="
block
font-semibold
mb-2
"
>

Slug (URL)

<span className="text-red-500">

 *

</span>

</label>

<div
className="
flex
rounded-lg
overflow-hidden
border
border-amber-200
"
>

<div
className="
px-4
bg-amber-50
flex
items-center
text-sm
text-gray-500
whitespace-nowrap
"
>

dreammode.com/lp/

</div>

<input

value={slug}

onChange={(e)=>

setSlug(
e.target.value
)

}

placeholder="your-landing-page"

className="
flex-1
h-12
px-4
outline-none
"

/>

</div>

<p
className="
text-xs
text-gray-500
mt-2
"
>

এই URL দিয়েই Facebook Ad চলবে।

</p>

</div>

{/* Product */}

<div>

<label
className="
block
font-semibold
mb-2
"
>

Select Product

<span className="text-red-500">

 *

</span>

</label>

<select

value={selectedProduct}

onChange={(e)=>

handleProductSelect(
e.target.value
)

}

className="
w-full
h-12
rounded-lg
border
border-amber-200
px-4
outline-none
focus:border-amber-500
focus:ring-4
focus:ring-amber-100
"

>

<option value="">

Choose Product

</option>

{

products.map(product=>(

<option

key={product.id}

value={product.id}

>

{product.name}

</option>

))

}

</select>

</div>

{/* Description */}

<div>

<label
className="
block
font-semibold
mb-2
"
>

Description

</label>

<textarea

rows={5}

value={description}

onChange={(e)=>

setDescription(
e.target.value
)

}

placeholder="Write product description..."

className="
w-full
rounded-lg
border
border-amber-200
p-4
resize-none
outline-none
focus:border-amber-500
focus:ring-4
focus:ring-amber-100
"

/>

</div>

{/* Status */}

<div>

<label
className="
block
font-semibold
mb-3
"
>

Status

</label>

<div
className="
grid
grid-cols-2
gap-3
"
>

<button

type="button"

onClick={()=>

setStatus("published")

}

className={`

h-12

rounded-lg

border

font-semibold

transition

${
status==="published"

?

"bg-amber-500 border-amber-500 text-white"

:

"border-amber-200 bg-white"

}

`}

>

Published

</button>

<button

type="button"

onClick={()=>

setStatus("draft")

}

className={`

h-12

rounded-lg

border

font-semibold

transition

${
status==="draft"

?

"bg-slate-900 border-slate-900 text-white"

:

"border-amber-200 bg-white"

}

`}

>

Draft

</button>

</div>

</div>

</div>

</div>

{/* Pricing Section - Part 3 */}


  {/* =========================
    PRICING
========================= */}

<div
  className="
  bg-white
  rounded-lg
  border
  border-amber-200
  shadow-sm
  overflow-hidden
  "
>

<div
  className="
  px-5
  py-4
  bg-amber-50
  border-b
  border-amber-100
  flex
  items-center
  gap-3
  "
>

<div
className="
w-10
h-10
rounded-lg
bg-amber-500
text-white
flex
items-center
justify-center
font-bold
text-lg
"
>

৳

</div>

<div>

<h2
className="
text-lg
font-bold
"
>

Pricing

</h2>

<p
className="
text-xs
text-gray-500
"
>

Set regular and offer price.

</p>

</div>

</div>

<div
className="
p-5
grid
md:grid-cols-2
gap-5
"
>

<div>

<label
className="
block
font-semibold
mb-2
"
>

Regular Price

</label>

<input

type="number"

value={price}

onChange={(e)=>

setPrice(
e.target.value
)

}

placeholder="0"

className="
w-full
h-12
rounded-lg
border
border-amber-200
px-4
outline-none
focus:border-amber-500
focus:ring-4
focus:ring-amber-100
"

/>

</div>

<div>

<label
className="
block
font-semibold
mb-2
"
>

Offer Price

</label>

<input

type="number"

value={offerPrice}

onChange={(e)=>

setOfferPrice(
e.target.value
)

}

placeholder="0"

className="
w-full
h-12
rounded-lg
border
border-amber-200
px-4
outline-none
focus:border-amber-500
focus:ring-4
focus:ring-amber-100
"

/>

</div>

</div>

</div>

{/* =========================
    HERO IMAGE
========================= */}

<div
className="
bg-white
rounded-lg
border
border-amber-200
shadow-sm
overflow-hidden
"
>

<div
className="
px-5
py-4
bg-amber-50
border-b
border-amber-100
flex
items-center
gap-3
"
>

<div
className="
w-10
h-10
rounded-lg
bg-amber-500
text-white
flex
items-center
justify-center
"
>

<FiImage/>

</div>

<div>

<h2
className="
text-lg
font-bold
"
>

Hero Image

</h2>

<p
className="
text-xs
text-gray-500
"
>

Auto loaded from selected product.

</p>

</div>

</div>

<div className="p-5">

{

heroImage ? (

<div
className="
rounded-lg
overflow-hidden
border
border-amber-200
bg-amber-50
"
>

<img

src={heroImage}

alt={title}

className="
w-full
h-72
lg:h-[430px]
object-cover
"

/>

</div>

) : (

<div
className="
h-72
lg:h-[430px]
rounded-lg
border-2
border-dashed
border-amber-300
bg-amber-50
flex
flex-col
items-center
justify-center
"
>

<div
className="
w-20
h-20
rounded-full
bg-amber-100
flex
items-center
justify-center
"
>

<FiImage
size={38}
className="text-amber-500"
/>

</div>

<p
className="
mt-5
font-semibold
text-gray-500
"
>

No Hero Image Found

</p>

<p
className="
text-sm
text-gray-400
mt-1
"
>

Please select a product.

</p>

</div>

)

}

</div>

</div>

{/* Delivery Settings - Part 4 */}


  {/* =========================
    DELIVERY SETTINGS
========================= */}

<div
  className="
  bg-white
  rounded-lg
  border
  border-amber-200
  shadow-sm
  overflow-hidden
  "
>

  <div
    className="
    px-5
    py-4
    bg-amber-50
    border-b
    border-amber-100
    flex
    items-center
    gap-3
    "
  >

    <div
      className="
      w-10
      h-10
      rounded-lg
      bg-amber-500
      text-white
      flex
      items-center
      justify-center
      "
    >

      <FiTruck/>

    </div>

    <div>

      <h2
        className="
        text-lg
        font-bold
        "
      >

        Delivery Settings

      </h2>

      <p
        className="
        text-xs
        text-gray-500
        "
      >

        Configure delivery charge & payment.

      </p>

    </div>

  </div>

  <div
    className="
    p-5
    space-y-5
    "
  >

    {/* Delivery Charge */}

    <div>

      <label
        className="
        block
        font-semibold
        mb-2
        "
      >

        Delivery Charge

      </label>

      <select

        value={deliveryZone}

        onChange={(e)=>

          setDeliveryZone(
            e.target.value
          )

        }

        className="
        w-full
        h-12
        rounded-lg
        border
        border-amber-200
        px-4
        outline-none
        focus:border-amber-500
        focus:ring-4
        focus:ring-amber-100
        "

      >

        <option value="inside">

          Dhaka Inside — ৳80

        </option>

        <option value="sub">

          Sub Area — ৳100

        </option>

        <option value="outside">

          Outside Dhaka — ৳120

        </option>

      </select>

    </div>

    {/* Selected Charge */}

    <div
      className="
      rounded-lg
      border
      border-amber-200
      bg-amber-50
      p-4
      flex
      items-center
      justify-between
      "
    >

      <div>

        <p
          className="
          text-sm
          text-gray-500
          "
        >

          Selected Delivery Charge

        </p>

        <h3
          className="
          text-2xl
          font-bold
          text-amber-600
          "
        >

          ৳{deliveryCharge}

        </h3>

      </div>

      <div
        className="
        w-12
        h-12
        rounded-lg
        bg-amber-500
        text-white
        flex
        items-center
        justify-center
        "
      >

        <FiTruck/>

      </div>

    </div>

    {/* COD */}

    <div
      className="
      rounded-lg
      border
      border-amber-200
      p-4
      flex
      items-center
      justify-between
      "
    >

      <div>

        <h3
          className="
          font-semibold
          "
        >

          Cash On Delivery

        </h3>

        <p
          className="
          text-sm
          text-gray-500
          mt-1
          "
        >

          Enable COD payment

        </p>

      </div>

      <label
        className="
        relative
        inline-flex
        cursor-pointer
        "
      >

        <input

          type="checkbox"

          checked={cashOnDelivery}

          onChange={(e)=>

            setCashOnDelivery(
              e.target.checked
            )

          }

          className="sr-only peer"

        />

        <div
          className="
          w-11
          h-6
          rounded-full
          bg-gray-300
          peer-checked:bg-amber-500
          after:content-['']
          after:absolute
          after:left-[2px]
          after:top-[2px]
          after:w-5
          after:h-5
          after:bg-white
          after:rounded-full
          after:transition-all
          peer-checked:after:translate-x-5
          "
        />

      </label>

    </div>

  </div>

</div>

{/* =========================
    LANDING STATUS
========================= */}

<div
  className="
  bg-white
  rounded-lg
  border
  border-amber-200
  shadow-sm
  overflow-hidden
  "
>

  <div
    className="
    px-5
    py-4
    bg-amber-50
    border-b
    border-amber-100
    flex
    items-center
    gap-3
    "
  >

    <div
      className="
      w-10
      h-10
      rounded-lg
      bg-amber-500
      text-white
      flex
      items-center
      justify-center
      "
    >

      <FiSettings/>

    </div>

    <h2
      className="
      text-lg
      font-bold
      "
    >

      Landing Status

    </h2>

  </div>

  <div className="p-5">

    <select

      value={status}

      onChange={(e)=>

        setStatus(
          e.target.value
        )

      }

      className="
      w-full
      h-12
      rounded-lg
      border
      border-amber-200
      px-4
      outline-none
      focus:border-amber-500
      focus:ring-4
      focus:ring-amber-100
      "

    >

      <option value="draft">

        Draft

      </option>

      <option value="published">

        Published

      </option>

    </select>

  </div>

</div>

{/* Action Buttons - Part 5 */}


  {/* =========================
    ACTION BUTTONS
========================= */}

<div
  className="
  grid
  gap-3
  md:grid-cols-3
  "
>

  {/* CREATE */}

  <Button
    type="submit"
    disabled={loading}
    className="
    h-12
    rounded-lg
    bg-amber-500
    hover:bg-amber-600
    text-white
    font-bold
    "
  >

    {

      loading

      ? "Creating..."

      : "Create Landing Page"

    }

  </Button>

  {/* PREVIEW */}

  <Button
    type="button"
    onClick={handlePreview}
    className="
    h-12
    rounded-lg
    bg-slate-900
    hover:bg-slate-800
    text-white
    font-bold
    flex
    items-center
    justify-center
    gap-2
    "
  >

    <FiEye/>

    Preview

  </Button>

  {/* CANCEL */}

  <Button
    type="button"
    onClick={()=>
      setShowCancelModal(true)
    }
    className="
    h-12
    rounded-lg
    bg-red-500
    hover:bg-red-600
    text-white
    font-bold
    flex
    items-center
    justify-center
    gap-2
    "
  >

    <FiXCircle/>

    Cancel

  </Button>

</div>

</form>

{/* =========================
    CANCEL MODAL
========================= */}

{

showCancelModal && (

<div
className="
fixed
inset-0
z-50
bg-black/50
flex
items-center
justify-center
p-4
"
>

<div
className="
w-full
max-w-sm
bg-white
rounded-lg
shadow-xl
overflow-hidden
"
>

<div className="p-6">

<div
className="
mx-auto
mb-4
w-16
h-16
rounded-full
bg-red-100
flex
items-center
justify-center
"
>

<FiXCircle

size={34}

className="
text-red-500
"

/>

</div>

<h2
className="
text-center
text-xl
font-bold
"
>

Cancel Landing Page

</h2>

<p
className="
text-center
text-gray-500
mt-3
"
>

Are you sure you want to cancel this?

</p>

<div
className="
grid
grid-cols-2
gap-3
mt-6
"
>

<Button

type="button"

onClick={()=>

setShowCancelModal(false)

}

className="
bg-gray-200
text-gray-700
rounded-lg
"
>

No

</Button>

<Button

type="button"

onClick={handleCancel}

className="
bg-red-500
hover:bg-red-600
text-white
rounded-lg
"
>

Yes

</Button>

</div>

</div>

</div>

</div>

)

}

</div>

</div>

);

}
