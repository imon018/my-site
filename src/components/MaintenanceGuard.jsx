import {
  useSettings,
} from "../context/SettingsContext";


import useAuth from "../hooks/useAuth";


import MaintenancePage from "./MaintenancePage";



export default function MaintenanceGuard({
  children
}){


  const {
    settings,
    loading
  } = useSettings();



  const {
    user
  } = useAuth();





  if(loading){

    return null;

  }





  const isAdmin =
    user?.role === "admin";






  const maintenanceMode =
    settings?.maintenanceMode === true
    ||
    settings?.maintenanceMode === "true";







  let maintenanceExpired = false;





  if(settings?.maintenanceEndTime){


    const endTime =
      new Date(
        settings.maintenanceEndTime
      ).getTime();



    if(
      !isNaN(endTime)
      &&
      Date.now() >= endTime
    ){

      maintenanceExpired = true;

    }


  }







  if(
    maintenanceMode
    &&
    !maintenanceExpired
    &&
    !isAdmin
  ){

    return (

      <MaintenancePage/>

    );

  }







  return children;


}
