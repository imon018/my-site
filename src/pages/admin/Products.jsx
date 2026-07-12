import {
  useEffect,
  useMemo,
  useState
} from "react";


import {
  getProductsFromDB,
  deleteProduct
} from "../../services/firestoreProductService";


import MobileProducts from "./components/MobileProducts";

import DesktopProducts from "./components/DesktopProducts";



export default function Products(){


const [products,setProducts]=useState([]);

const [loading,setLoading]=useState(true);


const [search,setSearch]=useState("");





useEffect(()=>{

loadProducts();

},[]);





async function loadProducts(){


try{


const data = await getProductsFromDB();


setProducts(data);



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


}







async function handleDelete(id){


const confirmDelete =
window.confirm(
"Are you sure you want to delete this product?"
);


if(!confirmDelete)
return;



try{


await deleteProduct(id);


loadProducts();



}

catch(error){

console.log(error);

}



}








const filteredProducts = useMemo(()=>{


return products.filter(product=>{


const name =
product.name
?.toLowerCase()
|| "";



return name.includes(
search.toLowerCase()
);


});


},[

products,

search

]);







if(loading){


return (

<div

className="
min-h-screen
flex
items-center
justify-center

bg-warm

text-amber-600

font-semibold

"

>

Loading Products...

</div>

);


}







const productData={


products:filteredProducts,


search,


setSearch,


handleDelete,


reload:loadProducts


};







return (


<>


{/* MOBILE */}


<div className="lg:hidden">

<MobileProducts

data={productData}

/>

</div>







{/* DESKTOP */}


<div className="hidden lg:block">

<DesktopProducts

data={productData}

/>

</div>




</>


);


}
