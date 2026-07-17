import {
  FiArrowLeft,
  FiMenu,
} from "react-icons/fi";


import {
  useLocation,
  useNavigate,
} from "react-router-dom";




export default function AdminBackButton({

setDrawerOpen

}){


const navigate = useNavigate();

const location = useLocation();





// MAIN ADMIN PAGES

const mainRoutes = [

"/admin",

"/admin/profile",

"/admin/users",

"/admin/products",

"/admin/orders",

"/admin/return-orders",

"/admin/send-notification",

"/admin/settings",

"/admin/subscribers",

];





const isMainPage =
mainRoutes.includes(
location.pathname
);






return (

<button


onClick={()=>{


if(isMainPage){

setDrawerOpen(true);


}

else{


navigate(-1);


}


}}


className="
mb-4
flex
items-center
gap-2
text-[#071F57]
font-medium
hover:opacity-70
"


>



{

isMainPage

?

<>

<FiMenu size={24}/>

Menu

</>


:

<>

<FiArrowLeft size={22}/>

Back

</>


}



</button>


);


}
