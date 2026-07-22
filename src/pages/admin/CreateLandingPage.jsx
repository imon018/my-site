import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const [selectedProduct,setSelectedProduct]=useState("");

const [title,setTitle]=useState("");

const [slug,setSlug]=useState("");

const [description,setDescription]=useState("");

const [price,setPrice]=useState("");

const [offerPrice,setOfferPrice]=useState("");

const [heroImage,setHeroImage]=useState("");

const [gallery,setGallery]=useState([]);

const [status,setStatus]=useState("draft");

const [offerText,setOfferText]=useState("");

const [countdown,setCountdown]=useState("");

const [deliveryCharge,setDeliveryCharge]=useState(80);

const [cod,setCod]=useState(true);

const [stickyButton,setStickyButton]=useState(true);

const [features,setFeatures]=useState([
"",
"",
"",
""
]);

const [faq,setFaq]=useState([
{
question:"",
answer:""
}
]);

const [reviews,setReviews]=useState([
{
name:"",
comment:"",
rating:5
}
]);

useEffect(()=>{

loadProducts();

},[]);

async function loadProducts(){

try{

const data=await getProductsFromDB();

setProducts(data);

}

catch(error){

console.log(error);

}

}

function handleProductSelect(id){

setSelectedProduct(id);

const product=

products.find(

item=>item.id===id

);

if(!product) return;

setTitle(product.name);

setSlug(

product.name

.toLowerCase()

.replace(/\s+/g,"-")

.replace(/[^a-z0-9-]/g,"")

);

setDescription(

product.description

);

setPrice(

product.price

);

setOfferPrice(

product.price

);

setHeroImage(

product.image

);

setGallery(

product.images || []

);

}

function updateFeature(

index,

value

){

const list=[

...features

];

list[index]=value;

setFeatures(list);

}

function updateFaqQuestion(

index,

value

){

const list=[

...faq

];

list[index].question=value;

setFaq(list);

}

function updateFaqAnswer(

index,

value

){

const list=[

...faq

];

list[index].answer=value;

setFaq(list);

}

function addFaq(){

setFaq([

...faq,

{

question:"",

answer:""

}

]);

}

function removeFaq(index){

setFaq(

faq.filter(

(_,i)=>

i!==index

)

);

}

function updateReviewName(

index,

value

){

const list=[

...reviews

];

list[index].name=value;

setReviews(list);

}

function updateReviewComment(

index,

value

){

const list=[

...reviews

];

list[index].comment=value;

setReviews(list);

}

function updateReviewRating(

index,

value

){

const list=[

...reviews

];

list[index].rating=value;

setReviews(list);

}

function addReview(){

setReviews([

...reviews,

{

name:"",

comment:"",

rating:5

}

]);

}

function removeReview(index){

setReviews(

reviews.filter(

(_,i)=>

i!==index

)

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


  const landingData={

productId:selectedProduct,

title,

slug,

description,

price:Number(price),

offerPrice:Number(offerPrice),

heroImage,

gallery,

offerText,

countdown,

deliveryCharge:Number(deliveryCharge),

cashOnDelivery:cod,

stickyButton,

features,

faq,

reviews,

status,

views:0,

orders:0,

revenue:0,

createdAt:new Date()

};

try{

setLoading(true);

await createLandingPage(

landingData

);

successToast(

"Landing Page Created Successfully."

);

navigate(

"/admin/landing-pages"

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

return(

<div className="

min-h-screen

bg-[#FAF7F2]

p-4

lg:p-8

">

<div className="

max-w-5xl

mx-auto

">

<div className="mb-6">

<h1 className="

text-3xl

font-black

text-slate-900

">

Create Landing Page

</h1>

<p className="

text-gray-500

mt-1

">

Facebook Landing Builder

</p>

</div>

<form

onSubmit={handleSubmit}

className="

bg-white

rounded-2xl

border

border-gray-100

shadow-sm

p-6

space-y-6

"

>

{/* PRODUCT */}

<div>

<label className="

block

font-bold

mb-2

">

Select Product

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

rounded-xl

border

border-gray-200

px-4

outline-none

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

{/* TITLE */}

<div>

<label className="

block

font-bold

mb-2

">

Landing Title

</label>

<input

value={title}

onChange={(e)=>

setTitle(

e.target.value

)

}

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

</div>

{/* SLUG */}

<div>

<label className="

block

font-bold

mb-2

">

Landing URL

</label>

<input

value={slug}

onChange={(e)=>

setSlug(

e.target.value

)

}

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

<p className="

text-xs

text-gray-500

mt-2

">

/landing/{slug}

</p>

</div>

{/* PRICE */}

<div className="

grid

md:grid-cols-2

gap-4

">

<div>

<label className="

block

font-bold

mb-2

">

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

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

</div>

<div>

<label className="

block

font-bold

mb-2

">

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

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

</div>

</div>

{/* DESCRIPTION */}

<div>

<label className="

block

font-bold

mb-2

">

Description

</label>

<textarea

rows={6}

value={description}

onChange={(e)=>

setDescription(

e.target.value

)

}

className="

w-full

rounded-xl

border

border-gray-200

p-4

resize-none

"

/>

</div>

{/* HERO IMAGE */}

<div>

<label className="

block

font-bold

mb-3

">

Hero Image

</label>

<img

src={heroImage}

alt=""

className="

w-full

h-72

rounded-xl

object-cover

border

"

/>

</div>



  {/* GALLERY */}

<div>

<label className="

block

font-bold

mb-3

">

Gallery Preview

</label>

<div className="

grid

grid-cols-2

md:grid-cols-4

gap-4

">

{

gallery.map((image,index)=>(

<img

key={index}

src={image}

alt=""

className="

w-full

h-32

rounded-xl

object-cover

border

"

/>

))

}

</div>

</div>

{/* OFFER */}

<div className="

grid

md:grid-cols-2

gap-4

">

<div>

<label className="

block

font-bold

mb-2

">

Offer Badge

</label>

<input

value={offerText}

onChange={(e)=>

setOfferText(

e.target.value

)

}

placeholder="🔥 Free Delivery"

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

</div>

<div>

<label className="

block

font-bold

mb-2

">

Countdown

</label>

<input

type="datetime-local"

value={countdown}

onChange={(e)=>

setCountdown(

e.target.value

)

}

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

</div>

</div>

{/* DELIVERY */}

<div className="

grid

md:grid-cols-2

gap-4

">

<div>

<label className="

block

font-bold

mb-2

">

Delivery Charge

</label>

<input

type="number"

value={deliveryCharge}

onChange={(e)=>

setDeliveryCharge(

e.target.value

)

}

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

</div>

<div className="

flex

items-center

justify-between

bg-amber-50

rounded-xl

px-4

py-4

">

<div>

<h3 className="font-bold">

Cash On Delivery

</h3>

<p className="text-xs text-gray-500">

Enable COD

</p>

</div>

<input

type="checkbox"

checked={cod}

onChange={(e)=>

setCod(

e.target.checked

)

}

className="

w-5

h-5

"

/>

</div>

</div>

{/* FEATURES */}

<div>

<label className="

block

font-bold

mb-3

">

Product Features

</label>

<div className="space-y-3">

{

features.map((item,index)=>(

<input

key={index}

value={item}

onChange={(e)=>

updateFeature(

index,

e.target.value

)

}

placeholder={`Feature ${index+1}`}

className="

w-full

h-12

rounded-xl

border

border-gray-200

px-4

"

/>

))

}

</div>

</div>

{/* FAQ */}

<div>

<div className="

flex

justify-between

items-center

mb-3

">

<h2 className="font-bold">

FAQ

</h2>

<button

type="button"

onClick={addFaq}

className="

px-4

py-2

rounded-lg

bg-blue-500

text-white

"

>

Add FAQ

</button>

</div>

{

faq.map((item,index)=>(

<div

key={index}

className="

border

rounded-xl

p-4

mb-4

space-y-3

"

>

<input

value={item.question}

onChange={(e)=>

updateFaqQuestion(

index,

e.target.value

)

}

placeholder="Question"

className="

w-full

h-11

rounded-lg

border

px-4

"

/>

<textarea

rows={3}

value={item.answer}

onChange={(e)=>

updateFaqAnswer(

index,

e.target.value

)

}

placeholder="Answer"

className="

w-full

rounded-lg

border

p-4

"

/>

<button

type="button"

onClick={()=>

removeFaq(

index

)

}

className="

text-red-500

font-bold

"

>

Delete FAQ

</button>

</div>

))

}

</div>

{/* REVIEWS */}

<div>

<div className="

flex

justify-between

items-center

mb-3

">

<h2 className="font-bold">

Customer Reviews

</h2>

<button

type="button"

onClick={addReview}

className="

px-4

py-2

rounded-lg

bg-green-500

text-white

"

>

Add Review

</button>

</div>

{

reviews.map((review,index)=>(

<div

key={index}

className="

border

rounded-xl

p-4

mb-4

space-y-3

"

>

<input

value={review.name}

onChange={(e)=>

updateReviewName(

index,

e.target.value

)

}

placeholder="Customer Name"

className="

w-full

h-11

rounded-lg

border

px-4

"

/>

<textarea

rows={3}

value={review.comment}

onChange={(e)=>

updateReviewComment(

index,

e.target.value

)

}

placeholder="Customer Review"

className="

w-full

rounded-lg

border

p-4

"

/>

<select

value={review.rating}

onChange={(e)=>

updateReviewRating(

index,

Number(e.target.value)

)

}

className="

w-full

h-11

rounded-lg

border

px-4

"

>

<option value={5}>★★★★★</option>

<option value={4}>★★★★☆</option>

<option value={3}>★★★☆☆</option>

<option value={2}>★★☆☆☆</option>

<option value={1}>★☆☆☆☆</option>

</select>

<button

type="button"

onClick={()=>

removeReview(

index

)

}

className="

text-red-500

font-bold

"

>

Delete Review

</button>

</div>

))

}

</div>



  {/* STATUS */}

<div className="

grid

md:grid-cols-2

gap-4

">

<div>

<label className="

block

font-bold

mb-2

">

Landing Status

</label>

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

rounded-xl

border

border-gray-200

px-4

outline-none

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

<div className="

bg-amber-50

rounded-xl

border

border-amber-200

px-4

py-4

flex

items-center

justify-between

">

<div>

<h3 className="

font-bold

text-slate-900

">

Sticky Order Button

</h3>

<p className="

text-xs

text-gray-500

mt-1

">

Show floating order button on mobile

</p>

</div>

<input

type="checkbox"

checked={stickyButton}

onChange={(e)=>

setStickyButton(

e.target.checked

)

}

className="

w-5

h-5

"

/>

</div>

</div>

{/* SUMMARY */}

<div className="

rounded-2xl

border

border-green-200

bg-green-50

p-5

space-y-2

">

<h2 className="

text-lg

font-black

text-green-700

">

Landing Summary

</h2>

<div className="

grid

grid-cols-2

gap-3

text-sm

">

<p>

<b>Product:</b>

{" "}

{title || "-"}

</p>

<p>

<b>Price:</b>

{" "}

৳ {price || 0}

</p>

<p>

<b>Offer:</b>

{" "}

৳ {offerPrice || 0}

</p>

<p>

<b>Status:</b>

{" "}

{status}

</p>

<p>

<b>Gallery:</b>

{" "}

{gallery.length} Images

</p>

<p>

<b>Reviews:</b>

{" "}

{reviews.length}

</p>

<p>

<b>FAQ:</b>

{" "}

{faq.length}

</p>

<p>

<b>Features:</b>

{" "}

{

features.filter(

item=>item.trim()!==""

).length

}

</p>

</div>

</div>

{/* BUTTONS */}

<div className="

flex

flex-col

md:flex-row

gap-3

pt-2

">

<Button

type="submit"

disabled={loading}

className="

flex-1

h-12

rounded-xl

bg-gradient-to-r

from-amber-400

to-amber-500

text-white

font-black

"

>

{

loading

?

"Creating Landing..."

:

"Create Landing Page"

}

</Button>

<Button

type="button"

onClick={()=>

navigate(

"/admin/landing-pages"

)

}

className="

flex-1

h-12

rounded-xl

bg-gray-200

text-slate-700

font-black

"

>

Cancel

</Button>

</div>

</form>

</div>

</div>

);

}



