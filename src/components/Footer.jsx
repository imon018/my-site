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



{/* MAIN SECTION */}



<div

className="
grid
grid-cols-2
md:grid-cols-3
gap-8
"


>




{/* BRAND */}



<div

className="
col-span-2
md:col-span-1
"


>



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


DREAM

<span

className="
text-amber-500
"

>

 MODE

</span>


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
text-sm
leading-7
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

<Link
to="/"
className="hover:text-amber-400"
>

Home

</Link>

</li>




<li>

<Link
to="/shop"
className="hover:text-amber-400"
>

Shop

</Link>

</li>




<li>

<Link
to="/profile"
className="hover:text-amber-400"
>

My Account

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

<Link
to="/return-policy"
className="hover:text-amber-400"
>

Return Policy

</Link>

</li>




<li>

<Link
to="/refund-policy"
className="hover:text-amber-400"
>

Refund Policy

</Link>

</li>




<li>

<Link
to="/shipping-policy"
className="hover:text-amber-400"
>

Shipping Policy

</Link>

</li>




<li>

<Link
to="/privacy-policy"
className="hover:text-amber-400"
>

Privacy Policy

</Link>

</li>




<li>

<Link
to="/terms"
className="hover:text-amber-400"
>

Terms & Conditions

</Link>

</li>




</ul>



</div>





</div>









{/* CONTACT + PAYMENT */}




<div

className="
mt-12
border-t
border-white/10
pt-8
grid
grid-cols-1
md:grid-cols-2
gap-8
"


>






{/* CONTACT */}



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



<div

className="
space-y-4
text-gray-300
text-sm
"


>


<p className="flex items-center gap-3">

<FiPhone
className="text-amber-500"
/>

+8801406978619

</p>



<p className="flex items-center gap-3">

<FiMail
className="text-amber-500"
/>

dreammode27@gmail.com

</p>




<p className="flex items-center gap-3">

<FiMapPin
className="text-amber-500"
/>

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

src="/payments/visa-logo.png"

className="
h-10
object-contain
"

/>





<img

src="/payments/mastercard-logo.png"

className="
h-10
object-contain
"

/>





<img

src="/payments/bkash-logo.png"

className="
h-10
object-contain
"

/>





<img

src="/payments/nagad-logo.png"

className="
h-10
object-contain
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


© 2026 All Rights Reserved by DREAM MODE.


</div>






</div>



</footer>


);


}
