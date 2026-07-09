import {
  useEffect,
  useState,
} from "react";


import {
  collection,
  getDocs,
} from "firebase/firestore";


import {
  db,
} from "../../firebase/firestore";


import useAuth from "../../hooks/useAuth";



export default function RecentActivities(){


  const { user } = useAuth();


  const [activities,setActivities] =
    useState([]);


  const [loading,setLoading] =
    useState(true);




  useEffect(()=>{


    const loadActivities =
      async()=>{


        if(!user)
          return;



        try{


          const ref =
            collection(
              db,
              "users",
              user.uid,
              "activity"
            );



          const snapshot =
            await getDocs(ref);



          const data =
            snapshot.docs
            .map(item=>({

              id:item.id,

              ...item.data(),

            }))
            .sort(
              (a,b)=>

              (b.createdAt?.seconds || 0)

              -

              (a.createdAt?.seconds || 0)

            );



          setActivities(data);



        }catch(error){


          console.log(error);


        }finally{


          setLoading(false);


        }


      };



    loadActivities();


  },[user]);





  return (

    <div>


      <h1 className="text-3xl font-bold mb-8">

        Recent Activities

      </h1>




      <div className="bg-white rounded-3xl shadow p-8">


        {
          loading

          ?

          <p>
            Loading...
          </p>


          :


          activities.length === 0

          ?

          <p className="text-gray-500">

            No activity found.

          </p>


          :


          <div className="space-y-4">


          {
            activities.map(activity=>(


              <div

                key={activity.id}

                className="
                border
                rounded-xl
                p-4
                "

              >

                <p className="font-medium">

                  {activity.message}

                </p>



                <p className="text-sm text-gray-500 mt-2">

                  {
                    activity.createdAt?.toDate

                    ?

                    activity.createdAt
                    .toDate()
                    .toLocaleString()

                    :

                    ""

                  }

                </p>


              </div>


            ))

          }


          </div>


        }


      </div>


    </div>

  );

}
