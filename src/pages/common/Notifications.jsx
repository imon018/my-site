import {
  useState,
  useRef,
  useEffect,
} from "react";


import {
  FiBell,
  FiTrash2,
  FiCheck,
  FiMoreVertical,
} from "react-icons/fi";


import {
  useNotifications,
} from "../../context/NotificationContext";





export default function Notifications(){


const {

notifications,

loading,

markAsRead,

markAllAsRead,

removeNotification,

removeAllNotifications,

}=useNotifications();





const [
openMenu,
setOpenMenu
]=useState(false);



const menuRef = useRef();





useEffect(()=>{


const closeMenu=(e)=>{


if(
menuRef.current &&
!menuRef.current.contains(e.target)
){

setOpenMenu(false);

}


};



document.addEventListener(
"mousedown",
closeMenu
);



return()=>{

document.removeEventListener(
"mousedown",
closeMenu
);

};



},[]);






if(loading){

return (

<div className="
p-6
text-center
">

Loading notifications...

</div>

);

}






return (


<div className="
max-w-4xl
mx-auto
p-4
lg:p-6
">






{/* HEADER */}


<div className="
flex
items-center
justify-between
mb-6
">


<h1 className="
text-2xl
font-bold
flex
items-center
gap-2
">


<FiBell/>

Notifications


</h1>






{/* THREE DOT MENU */}


<div
className="
relative
"
ref={menuRef}
>


<button

onClick={()=>
setOpenMenu(!openMenu)
}

className="
w-10
h-10
rounded-xl
hover:bg-gray-100
flex
items-center
justify-center
"

>


<FiMoreVertical size={22}/>


</button>





{
openMenu && (


<div

className="
absolute
right-0
top-12
w-48
bg-white
rounded-xl
shadow-xl
border
z-50
overflow-hidden
"

>


<button

onClick={()=>{

markAllAsRead();

setOpenMenu(false);

}}

className="
w-full
flex
items-center
gap-3
px-4
py-3
hover:bg-green-50
text-left
"

>


<FiCheck
className="text-green-600"
/>


Mark All Read


</button>





<button

onClick={()=>{

removeAllNotifications();

setOpenMenu(false);

}}

className="
w-full
flex
items-center
gap-3
px-4
py-3
hover:bg-red-50
text-left
text-red-600
"

>


<FiTrash2/>


Delete All


</button>



</div>


)

}


</div>



</div>

        {/* EMPTY STATE */}

      {
        notifications.length === 0 ?


        (

          <div

          className="
          bg-white
          rounded-2xl
          p-10
          text-center
          shadow
          "

          >


          <FiBell

          size={50}

          className="
          mx-auto
          mb-4
          text-gray-400
          "

          />


          <h2

          className="
          text-xl
          font-semibold
          "

          >

          No Notifications

          </h2>



          <p

          className="
          text-gray-500
          mt-2
          "

          >

          You're all caught up.

          </p>


          </div>


        )


        :


        (


        <div

        className="
        space-y-4
        "

        >


        {
          notifications.map((item)=>(


          <div

          key={item.id}

          className={`
          
          rounded-xl
          border
          p-4

          flex
          justify-between
          items-start

          gap-4

          transition


          ${
            item.isRead

            ?

            "bg-white"

            :

            "bg-amber-50 border-amber-300"

          }

          `}

          >





          {/* CONTENT */}


          <div className="flex-1">


          <h3

          className="
          font-semibold
          text-lg
          "

          >

          {item.title}

          </h3>





          <p

          className="
          text-gray-600
          mt-1
          "

          >

          {item.message}

          </p>





          <p

          className="
          text-xs
          text-gray-400
          mt-3
          "

          >

          {
            item.createdAt?.toDate

            ?

            item.createdAt
            .toDate()
            .toLocaleString()

            :

            ""

          }


          </p>



          </div>








          {/* ACTIONS */}


          <div

          className="
          flex
          items-center
          gap-3
          "

          >



          {
            !item.isRead &&

            (

            <button

            onClick={()=>markAsRead(item.id)}

            className="
            text-green-600
            hover:scale-110
            transition
            "

            title="Mark as read"

            >

            <FiCheck size={20}/>

            </button>


            )

          }






          <button

          onClick={()=>removeNotification(item.id)}

          className="
          text-red-600
          hover:scale-110
          transition
          "

          title="Delete"

          >

          <FiTrash2 size={20}/>


          </button>




          </div>





          </div>



          ))

        }



        </div>


        )

      }



    </div>


  );


}
