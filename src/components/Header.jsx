import { Link, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import { logout } from "../services/authService";


export default function Header() {


  const { user } = useAuth();

  const navigate = useNavigate();



  const handleLogout = async () => {

    await logout();

    navigate("/login");

  };



  return (

    <header className="bg-white shadow">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">



        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          Dream Mode
        </Link>





        <nav className="flex gap-6 font-medium items-center">


          <Link to="/">
            Home
          </Link>



          <Link to="/shop">
            Shop
          </Link>




          <Link to="/cart">
            Cart
          </Link>





          {user ? (

            <>


              <Link to="/profile">
                Profile
              </Link>




              {user.role === "admin" && (

                <Link to="/admin">
                  Admin
                </Link>

              )}





              <button

                onClick={handleLogout}

                className="text-red-600"

              >

                Logout

              </button>



            </>


          ) : (


            <Link to="/login">

              Login

            </Link>


          )}



        </nav>




      </div>


    </header>

  );

}
