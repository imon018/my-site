import {
  useEffect,
  useMemo,
  useState
} from "react";


import {
  FiUsers,
  FiShoppingCart,
  FiBox,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";


import {
  getUsers
} from "../../services/adminService";


import {
  getProductsFromDB,
} from "../../services/firestoreProductService";


import {
  getAllOrders,
} from "../../services/orderService";



import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  BarElement,

  Tooltip,

  Legend,

} from "chart.js";



import {
  Line,
  Bar,
} from "react-chartjs-2";




ChartJS.register(

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  BarElement,

  Tooltip,

  Legend

);





export default function Dashboard(){



const [loading,setLoading] = useState(true);



const [users,setUsers] = useState([]);

const [products,setProducts] = useState([]);

const [orders,setOrders] = useState([]);






useEffect(()=>{

  loadDashboard();

},[]);






async function loadDashboard(){


try{


const [

usersData,

productsData,

ordersData

]= await Promise.all([


getUsers(),


getProductsFromDB(),


getAllOrders(),


]);



setUsers(usersData);

setProducts(productsData);

setOrders(ordersData);



}

catch(error){

console.log(error);

}


finally{

setLoading(false);

}


}







const stats = useMemo(()=>{


const admins = users.filter(

(user)=>

user.role === "admin"

).length;




const revenue = orders.reduce(

(sum,order)=>

sum +

Number(order.total || 0),

0

);



return {


users:users.length,


admins,


products:products.length,


orders:orders.length,


revenue,


};



},[

users,

products,

orders

]);









const cards=[


{

title:"Users",

value:stats.users,

icon:<FiUsers size={26}/>

},



{

title:"Admins",

value:stats.admins,

icon:<FiUsers size={26}/>

},




{

title:"Products",

value:stats.products,

icon:<FiBox size={26}/>

},




{

title:"Orders",

value:stats.orders,

icon:<FiShoppingCart size={26}/>

},




{

title:"Revenue",

value:`৳ ${stats.revenue}`,

icon:<FiDollarSign size={26}/>

},



];









const revenueData={


labels:[

"Week 1",

"Week 2",

"Week 3",

"Week 4",

],



datasets:[

{

label:"Revenue",


data:[

stats.revenue * .25,

stats.revenue * .50,

stats.revenue * .75,

stats.revenue,

],



borderColor:"#D4AF37",



backgroundColor:

"rgba(212,175,55,.15)",



tension:.4,


fill:true,

}

]

};









const overviewData={


labels:[

"Products",

"Orders",

"Users",

"Admins",

],




datasets:[

{

label:"Store Overview",


data:[

stats.products,

stats.orders,

stats.users,

stats.admins,

],



backgroundColor:"#F59E0B",



borderRadius:10,

}


]

};








const recentOrders =

[...orders]

.sort(

(a,b)=>

new Date(b.createdAt)

-

new Date(a.createdAt)

)

.slice(0,5);








if(loading){


return (

<div

className="

min-h-screen

w-full

bg-warm

flex

items-center

justify-center

text-amber-600

text-xl

font-semibold

"

>

Loading Dashboard...

</div>

);


}

return (

<div className="
w-full
min-h-screen
bg-warm
text-text
pb-10
">


{/* HERO SECTION */}

<div className="
bg-card
border
border-border
rounded-3xl
p-5
md:p-8
shadow-luxury
mb-6
">


<div className="
flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-6
">


<div>


<div className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-amber-50
text-amber-600
border
border-amber-200
font-semibold
text-sm
mb-4
">

<FiTrendingUp/>

Dream Mode Analytics

</div>



<h1 className="
text-3xl
md:text-5xl
font-bold
text-gray-900
">

Admin Dashboard

</h1>



<p className="
text-muted
mt-3
max-w-xl
">

Manage products, orders, users and
track your store growth.

</p>


</div>






{/* REVENUE CARD */}


<div className="
bg-gradient-to-br
from-amber-50
to-white

border
border-amber-200

rounded-3xl

p-6

min-w-[250px]

shadow-gold

">


<p className="
text-muted
text-sm
">

Total Revenue

</p>


<h2 className="
text-4xl
font-black
text-amber-600
mt-2
">

৳ {stats.revenue}

</h2>


<p className="
text-green-600
text-sm
mt-3
font-medium
">

↑ Store Performance

</p>


</div>


</div>


</div>







{/* STATS CARDS */}


<div className="
grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-5

gap-5
">


{

cards.map((card)=>(


<div

key={card.title}

className="
bg-card

border

border-border

rounded-3xl

p-5

shadow-luxury

hover:shadow-gold

transition-all

duration-300

"

>


<div className="
flex
items-center
justify-between
">


<div>


<p className="
text-muted
text-sm
">

{card.title}

</p>



<h3 className="
text-2xl
md:text-3xl
font-bold
text-gray-900
mt-2
">

{card.value}

</h3>


</div>






<div className="
w-14
h-14

rounded-2xl

bg-amber-50

flex
items-center
justify-center

text-amber-600

">

{card.icon}

</div>



</div>



</div>



))


}



</div>








{/* CHART SECTION */}


<div className="
mt-8

grid

grid-cols-1

2xl:grid-cols-2

gap-6

">






{/* REVENUE CHART */}


<div className="
bg-card

border

border-border

rounded-3xl

p-5

md:p-6

shadow-luxury

">


<h2 className="
text-xl
md:text-2xl
font-bold
text-gray-900
mb-6
">

Revenue Analytics

</h2>


<div className="
w-full
overflow-hidden
">


<Line

data={revenueData}

/>


</div>


</div>







{/* OVERVIEW CHART */}



<div className="
bg-card

border

border-border

rounded-3xl

p-5

md:p-6

shadow-luxury

">


<h2 className="
text-xl
md:text-2xl
font-bold
text-gray-900
mb-6
">

Store Overview

</h2>



<div className="
w-full
overflow-hidden
">


<Bar

data={overviewData}

/>


</div>



</div>





</div>





<div className="
mt-8

grid

grid-cols-2

lg:grid-cols-4

gap-4

">


{

[
  {
    title:"Products",
    desc:"Manage Store Items"
  },

  {
    title:"Orders",
    desc:"Track Customer Orders"
  },

  {
    title:"Users",
    desc:"User Management"
  },

  {
    title:"Revenue",
    desc:"Store Earnings"
  },

].map((item)=>(


<div

key={item.title}

className="
bg-card

border

border-border

rounded-3xl

p-5

text-center

shadow-luxury

hover:shadow-gold

transition

"


>


<h3 className="
font-bold
text-gray-900
">

{item.title}

</h3>


<p className="
text-sm
text-muted
mt-2
">

{item.desc}

</p>


</div>


))


}


</div>









{/* RECENT ORDERS */}



<div className="
mt-8

bg-card

border

border-border

rounded-3xl

p-5

md:p-6

shadow-luxury

">





<div className="
flex

flex-col

sm:flex-row

sm:items-center

sm:justify-between

gap-3

mb-6

">


<h2 className="
text-2xl

font-bold

text-gray-900

">

Recent Orders

</h2>



<span className="
text-amber-600

text-sm

font-medium

">

Latest 5 Orders

</span>


</div>








{

recentOrders.length === 0 ?



(

<div className="
text-center

py-10

text-muted

">

No Orders Found

</div>

)



:

(



<>



{/* DESKTOP TABLE */}



<div className="
hidden

lg:block

overflow-x-auto

">


<table className="
w-full
">


<thead>


<tr className="
border-b

border-border

text-left

text-gray-600

">


<th className="py-4">
Customer
</th>


<th className="py-4">
Status
</th>


<th className="py-4">
Total
</th>


<th className="py-4">
Date
</th>


</tr>


</thead>





<tbody>


{

recentOrders.map((order)=>(


<tr

key={order.id}

className="
border-b

border-gray-100

"


>


<td className="py-4 font-medium">

{order.customerName}

</td>




<td className="py-4">


<span className="

px-3

py-1

rounded-full

bg-amber-50

text-amber-600

text-sm

font-medium

">


{order.status}


</span>


</td>





<td className="py-4">


৳ {order.total}


</td>






<td className="py-4 text-gray-500">


{

new Date(
order.createdAt
).toLocaleDateString()

}


</td>



</tr>



))


}


</tbody>


</table>


</div>









{/* MOBILE ORDER CARD */}



<div className="
lg:hidden

space-y-4

">


{

recentOrders.map((order)=>(


<div

key={order.id}

className="
bg-warm

rounded-2xl

p-4

border

border-border

"


>


<div className="
flex

justify-between

items-center

">


<h3 className="
font-bold

text-gray-900

">

{order.customerName}

</h3>



<span className="
text-amber-600

text-sm

">

{order.status}

</span>


</div>





<p className="
text-gray-700

mt-3

font-medium

">

৳ {order.total}

</p>





<p className="
text-muted

text-xs

mt-2

">

{

new Date(
order.createdAt
).toLocaleDateString()

}

</p>



</div>



))


}


</div>





</>


)


}



</div>






</div>

);

}
