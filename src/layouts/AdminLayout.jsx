import {
  useState,
} from "react";


import {
  Outlet,
  NavLink,
} from "react-router-dom";


import {
  FiGrid,
  FiHome,
  FiUser,
  FiUsers,
  FiBox,
  FiShoppingCart,
  FiImage,
  FiChevronDown,
  FiChevronRight,
  FiUpload,
  FiMail,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiAlertTriangle,
  FiBell,
  FiSend,
} from "react-icons/fi";



import useAuth from "../hooks/useAuth";


import {
  logout,
} from "../services/authService";


import {
  useSettings,
} from "../context/SettingsContext";







export default function AdminLayout(){



  const {
    user,
  } = useAuth();



  const {
    settings,
  } = useSettings();





  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);




  const [
    collapsed,
    setCollapsed,
  ] = useState(false);





  const [
    uploadsOpen,
    setUploadsOpen,
  ] = useState(true);




  const [
    bannerOpen,
    setBannerOpen,
  ] = useState(true);





  const [
    showLogoutWarning,
    setShowLogoutWarning,
  ] = useState(false);








  const handleLogoutClick = ()=>{


    if(
      settings?.maintenanceMode
    ){

      setShowLogoutWarning(true);

      return;

    }



    logout();


  };






  const confirmLogout = ()=>{


    logout();


  };









  const menu = [



    {
      name:"Dashboard",
      icon:<FiGrid size={20}/>,
      path:"/admin",
    },



    {
      name:"Home",
      icon:<FiHome size={20}/>,
      path:"/",
    },



    {
      name:"Admin Profile",
      icon:<FiUser size={20}/>,
      path:"/admin/profile",
    },



    {
      name:"Users Panel",
      icon:<FiUsers size={20}/>,
      path:"/admin/users",
    },



    {
      name:"Products",
      icon:<FiBox size={20}/>,
      path:"/admin/products",
    },



    {
      name:"Orders",
      icon:<FiShoppingCart size={20}/>,
      path:"/admin/orders",
    },
    {
  name: "Notifications",
  path: "/admin/notifications",
  icon: FiBell,
},
{
  name: "Send Notification",
  path: "/admin/send-notification",
  icon: FiSend,
},


  ];








  return (


    <div className="
      min-h-screen
      flex
      bg-[#F8F5EF]
    ">

          {/* MOBILE OVERLAY */}

    {
      sidebarOpen && (

        <div

          className="
            fixed
            inset-0
            bg-black/40
            z-40
            lg:hidden
          "

          onClick={()=>
            setSidebarOpen(false)
          }

        />

      )
    }







    {/* MOBILE MENU BUTTON */}


    <button

      onClick={()=>
        setSidebarOpen(true)
      }

      className="
        lg:hidden
        fixed
        top-4
        left-4
        z-50
        bg-amber-500
        text-white
        p-3
        rounded-xl
        shadow-lg
      "

    >

      <FiMenu size={24}/>

    </button>









    {/* SIDEBAR */}


    <aside


      className={`
      
        fixed
        top-0
        left-0

        h-dvh

        flex
        flex-col

        bg-white

        border-r
        border-amber-100

        shadow-xl

        transition-all
        duration-300

        z-50


        ${collapsed ? "lg:w-24" : "lg:w-72"}

        w-72


        ${
          sidebarOpen
          ?
          "translate-x-0"
          :
          "-translate-x-full lg:translate-x-0"
        }

      `}


    >








      {/* MOBILE CLOSE */}


      <div

        className="
          lg:hidden
          flex
          justify-end
          px-4
          pt-4
        "

      >

        <button

          onClick={()=>
            setSidebarOpen(false)
          }

        >

          <FiX size={28}/>

        </button>


      </div>









      {/* HEADER */}



      <div

        className="
          shrink-0
          px-6
          py-4
          border-b
          border-amber-100
        "

      >



        <h1

          className="
            text-2xl
            font-bold
            text-amber-600
          "

        >

          {settings?.storeName || "Dream Mode"}

        </h1>



        <p

          className="
            text-sm
            text-gray-500
          "

        >

          Admin Panel

        </p>






        <div

          className="
            mt-5
            flex
            items-center
            gap-4
          "

        >



          <img

            src={
              user?.photoURL ||
              "https://ui-avatars.com/api/?name=Admin"
            }

            alt="Admin"

            className="
              w-14
              h-14
              rounded-full
              object-cover
              border-4
              border-amber-200
            "

          />





          <div>


            <h3

              className="
                font-bold
                text-slate-800
              "

            >

              {user?.name || "Administrator"}

            </h3>



            <p

              className="
                text-sm
                text-gray-500
                truncate
                max-w-[150px]
              "

            >

              {user?.email}

            </p>


          </div>


        </div>



      </div>









      {/* MENU */}



      <nav

        className="
          flex-1
          overflow-y-auto

          px-4
          py-5

          space-y-2

          pb-10
        "

      >





        {
          menu.map((item)=>(


            <NavLink


              key={item.path}


              to={item.path}


              onClick={()=>
                setSidebarOpen(false)
              }


              className={({isActive})=>

              `

                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-xl

                transition-all


                ${
                  isActive

                  ?

                  "bg-amber-500 text-white shadow"

                  :

                  "text-slate-700 hover:bg-amber-50"

                }


              `

              }


            >


              {item.icon}



              {
                !collapsed && (

                  <span className="font-medium">

                    {item.name}

                  </span>

                )
              }


            </NavLink>


          ))
        }








        {/* UPLOADS */}


        <div className="pt-3">


          <button


            onClick={()=>setUploadsOpen(!uploadsOpen)}


            className="
              w-full
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              hover:bg-amber-50
            "


          >


            <div className="
              flex
              items-center
              gap-3
              text-slate-700
            ">


              <FiUpload size={20}/>


              {
                !collapsed && (

                  <span className="font-medium">

                    Uploads

                  </span>

                )
              }


            </div>





            {
              !collapsed &&
              (
                uploadsOpen
                ?
                <FiChevronDown/>
                :
                <FiChevronRight/>
              )
            }



          </button>





          {
            uploadsOpen && !collapsed && (

              <div className="
                ml-8
                mt-2
                space-y-2
              ">


                <NavLink

                  to="/admin/add-product"

                  className="block px-4 py-2 rounded-lg hover:bg-amber-50"

                >

                  Add Product

                </NavLink>




                <NavLink

                  to="/admin/add-order"

                  className="block px-4 py-2 rounded-lg hover:bg-amber-50"

                >

                  Add Order

                </NavLink>



              </div>

            )
          }


        </div>


                {/* BANNERS */}


        <div>


          <button

            onClick={()=>
              setBannerOpen(!bannerOpen)
            }

            className="
              w-full
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              hover:bg-amber-50
            "

          >


            <div className="
              flex
              items-center
              gap-3
              text-slate-700
            ">

              <FiImage size={20}/>


              {
                !collapsed && (

                  <span className="font-medium">

                    Banners

                  </span>

                )
              }


            </div>




            {
              !collapsed &&
              (
                bannerOpen
                ?
                <FiChevronDown/>
                :
                <FiChevronRight/>
              )
            }


          </button>






          {
            bannerOpen && !collapsed && (

              <div className="
                ml-8
                mt-2
                space-y-2
              ">


                <NavLink

                  to="/admin/banners"

                  className="
                    block
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-amber-50
                  "

                >

                  Home Banner

                </NavLink>





                <NavLink

                  to="/admin/shop-hero"

                  className="
                    block
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-amber-50
                  "

                >

                  Shop Banner

                </NavLink>



              </div>

            )
          }



        </div>









        {/* SUBSCRIBERS */}


        <NavLink

          to="/admin/subscribers"

          className={({isActive})=>

          `

          flex
          items-center
          gap-3

          px-4
          py-3

          rounded-xl


          ${
            isActive

            ?

            "bg-amber-500 text-white"

            :

            "text-slate-700 hover:bg-amber-50"

          }

          `

          }

        >

          <FiUsers size={20}/>


          {
            !collapsed && (

              <span>

                Subscribers

              </span>

            )
          }


        </NavLink>









        {/* NEWSLETTER */}


        <NavLink

          to="/admin/newsletter"

          className={({isActive})=>

          `

          flex
          items-center
          gap-3

          px-4
          py-3

          rounded-xl


          ${
            isActive

            ?

            "bg-amber-500 text-white"

            :

            "text-slate-700 hover:bg-amber-50"

          }

          `

          }

        >


          <FiMail size={20}/>


          {
            !collapsed && (

              <span>

                Newsletter

              </span>

            )
          }


        </NavLink>









        {/* SETTINGS */}



        <NavLink

          to="/admin/settings"

          className={({isActive})=>

          `

          flex
          items-center
          gap-3

          px-4
          py-3

          rounded-xl


          ${
            isActive

            ?

            "bg-amber-500 text-white"

            :

            "text-slate-700 hover:bg-amber-50"

          }


          `

          }

        >


          <FiSettings size={20}/>


          {
            !collapsed && (

              <span>

                Settings

              </span>

            )
          }


        </NavLink>









        {/* LOGOUT */}



        <button


          onClick={handleLogoutClick}


          className="
            w-full

            flex
            items-center
            gap-3

            px-4
            py-3

            rounded-xl

            bg-red-500

            hover:bg-red-600

            text-white

          "


        >


          <FiLogOut size={20}/>



          {
            !collapsed && (

              <span>

                Logout

              </span>

            )
          }


        </button>




      </nav>



    </aside>









    {/* MAIN CONTENT */}



    <main


      className={`

      flex-1

      min-h-screen


      bg-[#F8F5EF]


      transition-all
      duration-300



      ${
        collapsed

        ?

        "lg:ml-24"

        :

        "lg:ml-72"

      }


      `}


    >


      <div className="
        p-4
        lg:p-8
      ">


        <Outlet />


      </div>



    </main>









    {/* LOGOUT WARNING MODAL */}



    {
      showLogoutWarning && (


        <div

          className="
            fixed
            inset-0
            z-[999]

            bg-black/50

            flex
            items-center
            justify-center

            px-5
          "

        >



          <div

            className="
              bg-white

              rounded-3xl

              p-6

              max-w-sm

              w-full

              shadow-2xl

            "

          >



            <div className="
              flex
              justify-center
              mb-4
            ">

              <div className="
                w-14
                h-14
                rounded-full
                bg-red-100
                flex
                items-center
                justify-center
              ">

                <FiAlertTriangle

                  className="
                    text-red-500
                    text-3xl
                  "

                />

              </div>


            </div>





            <h2 className="
              text-xl
              font-black
              text-center
              text-red-600
            ">

              ⚠ Maintenance mode is ON

            </h2>





            <p className="
              mt-3
              text-gray-600
              text-center
            ">


              If you logout, visitors will continue seeing maintenance page.


            </p>






            <div className="
              flex
              gap-3
              mt-6
            ">



              <button


                onClick={()=>setShowLogoutWarning(false)}


                className="
                  flex-1
                  py-3
                  rounded-xl
                  border
                  font-bold
                "


              >

                Cancel

              </button>






              <button


                onClick={confirmLogout}


                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-red-500
                  text-white
                  font-bold
                "


              >

                Logout Anyway

              </button>



            </div>




          </div>



        </div>


      )
    }



  </div>


  );

}
