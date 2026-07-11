import {
  Link,
} from "react-router-dom";


import {
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";


export default function Footer(){


return (

<footer

className="
bg-[#061538]
text-white
pt-12
pb-24
px-6
"

>


<div

className="
max-w-7xl
mx-auto
"

>


{/* TOP GRID */}

<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-10
"

>


{/* BRAND */}

<div>


<div

className="
flex
items-center
gap-3
mb-5
"

>

<img

src="/logo.png"

className="
w-14
h-14
object-contain
"

/>


<div>

<h2

className="
text-2xl
font-bold
tracking-wide
"

>

DREAM MODE

</h2>


<p

className="
text-xs
text-amber-400
"

>
Dress Your Dream, Live Your Style
</p>


</div>


</div>




<p

className="
text-gray-300
leading-7
text-sm
"

>

Dream Mode is your trusted destination for premium dress.
We ensure quality, style and customer satisfaction.

</p>



</div>





{/* QUICK LINKS */}


<div>


<h3

className="
text-amber-500
font-bold
text-lg
mb-5
"

>

Quick Links

</h3>



<ul

className="
space-y-3
text-gray-300
text-sm
"

>


<li>
<Link to="/">
Home
</Link>
</li>


<li>
<Link to="/shop">
Shop
</Link>
</li>


<li>
<Link to="/cart">
Cart
</Link>
</li>


<li>
<Link to="/profile">
My Account
</Link>
</li>


<li>
<Link to="/orders">
Track Order
</Link>
</li>


</ul>


</div>








{/* CUSTOMER SERVICE */}


<div>


<h3

className="
text-amber-500
font-bold
text-lg
mb-5
"

>

Customer Service

</h3>



<ul

className="
space-y-3
text-gray-300
text-sm
"

>


<li>

<Link to="/return-policy">
Return Policy
</Link>

</li>


<li>

<Link to="/refund-policy">
Refund Policy
</Link>

</li>



<li>

<Link to="/shipping-policy">
Shipping Policy
</Link>

</li>



<li>

<Link to="/privacy-policy">
Privacy Policy
</Link>

</li>



<li>

<Link to="/terms">
Terms & Conditions
</Link>

</li>


</ul>


</div>



</div>









{/* CONTACT */}


<div

className="
mt-12
border-t
border-white/10
pt-8
grid
md:grid-cols-2
gap-8
"

>



<div>


<h3

className="
text-amber-500
font-bold
mb-5
"

>
Contact Us
</h3>


<div className="space-y-4 text-gray-300 text-sm">


<p className="flex gap-3 items-center">

<FiPhone className="text-amber-500"/>

+8801406978619

</p>


<p className="flex gap-3 items-center">

<FiMail className="text-amber-500"/>

dreammode27@gmail.com

</p>



<p className="flex gap-3 items-center">

<FiMapPin className="text-amber-500"/>

Dhaka, Bangladesh

</p>


</div>


</div>









{/* PAYMENT */}



<div>


<h3

className="
text-amber-500
font-bold
mb-5
"

>

We Accept

</h3>



<div

className="
flex
gap-4
flex-wrap
items-center
"

>


<img

src="/payments/visa.png"

className="
h-8
w-auto
"

/>


<img

src="/payments/mastercard.png"

className="
h-8
w-auto
"

/>



<img

src="/payments/bkash.png"

className="
h-8
w-auto
"

/>



<img

src="/payments/nagad.png"

className="
h-8
w-auto
"

/>


</div>


</div>



</div>








{/* COPYRIGHT */}



<div

className="
border-t
border-white/10
mt-8
pt-6
text-center
text-gray-400
text-sm
"

>


© 2026 DREAM MODE. All Rights Reserved.


</div>



</div>


</footer>


);


}
