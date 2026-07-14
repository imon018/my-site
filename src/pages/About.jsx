import {
  useSettings
} from "../context/SettingsContext";


import {
  getSiteConfig
} from "../config/siteConfig";



export default function About() {


  const {
    settings
  } = useSettings();



  const site =
    getSiteConfig(settings);





  return (

    <div
      className="
      max-w-6xl
      mx-auto
      px-6
      py-12
      "
    >


      <h1
        className="
        text-4xl
        font-bold
        "
      >

        About {site.appName}

      </h1>





      <p
        className="
        mt-4
        text-gray-600
        leading-7
        "
      >

        {site.appName} is an E-commerce platform focused on
        providing a fast, secure, and modern shopping experience.

      </p>



    </div>

  );

}
