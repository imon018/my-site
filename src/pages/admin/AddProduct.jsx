import {
useState
} from "react";


import {
FiSettings,
FiUser,
FiMail,
FiPhone,
FiMapPin,
FiFacebook,
FiMessageCircle,
FiUploadCloud
} from "react-icons/fi";


import Button from "../../components/ui/Button";




export default function Settings(){


const [settings,setSettings]=useState({

storeName:"Dream Mode",
email:"",
phone:"",
address:"",
facebook:"",
whatsapp:""

});



const [logoPreview,setLogoPreview]=useState("");

const [maintenanceMode,setMaintenanceMode]=useState(false);





const handleChange=(e)=>{

setSettings({

...settings,

[e.target.name]:e.target.value

});

};




const handleLogoChange=(e)=>{

const file=e.target.files[0];

if(file){

setLogoPreview(
URL.createObjectURL(file)
);

}

};




return(

<div className="
min-h-screen
bg-[#FAF7F2]
p-4
md:p-8
">


<div className="
max-w-3xl
mx-auto
">


<div className="
flex
justify-between
items-center
mb-5
">


<div>

<h1 className="
text-2xl
font-black
text-[#172033]
">

System Settings

</h1>


<p className="
text-sm
text-gray-500
">

Manage store information

</p>


</div>


<div className="
w-11
h-11
rounded-xl
bg-[#FFF7E8]
flex
items-center
justify-center
text-amber-500
">

<FiSettings/>

</div>


</div>





<form className="
bg-white
rounded-xl
p-5
space-y-5
border
border-gray-100
shadow-sm
">






{/* STORE LOGO */}

<div>

<label className="
block
font-bold
text-sm
mb-2
text-[#172033]
">

Store Logo

</label>



<label

htmlFor="logo"

className="
h-40
rounded-xl
border-2
border-dashed
border-gray-300
bg-[#FAF7F2]
flex
flex-col
items-center
justify-center
cursor-pointer
overflow-hidden
"

>


{
logoPreview ?

<img

src={logoPreview}

className="
w-28
h-28
object-contain
"

/>


:

<>

<FiUploadCloud

className="
text-amber-500
text-4xl
"

/>


<p className="
font-semibold
text-sm
mt-2
">

Upload Store Logo

</p>


<p className="
text-xs
text-gray-400
">

PNG JPG WEBP

</p>

</>

}


</label>


<input

id="logo"

type="file"

accept="image/*"

className="hidden"

onChange={handleLogoChange}

/>


</div>







{/* STORE NAME */}

<div>

<label className="
block
font-bold
text-sm
mb-2
">

Store Name

</label>


<div className="relative">


<FiUser

className="
absolute
left-4
top-4
text-amber-500
"

/>


<input

name="storeName"

value={settings.storeName}

onChange={handleChange}

className="
w-full
h-12
pl-12
rounded-lg
border
border-gray-200
"

/>


</div>


</div>

  {/* EMAIL */}

<div>

<label className="
block
font-bold
text-sm
mb-2
text-[#172033]
">

Store Email

</label>


<div className="relative">


<FiMail

className="
absolute
left-4
top-4
text-amber-500
"

/>


<input

name="email"

value={settings.email}

onChange={handleChange}

placeholder="Store email"

className="
w-full
h-12
pl-12
rounded-lg
border
border-gray-200
outline-none
focus:border-amber-400
"

/>


</div>

</div>







{/* PHONE */}

<div>


<label className="
block
font-bold
text-sm
mb-2
text-[#172033]
">

Phone Number

</label>



<div className="relative">


<FiPhone

className="
absolute
left-4
top-4
text-amber-500
"

/>


<input

name="phone"

value={settings.phone}

onChange={handleChange}

placeholder="Phone number"

className="
w-full
h-12
pl-12
rounded-lg
border
border-gray-200
outline-none
focus:border-amber-400
"

/>


</div>


</div>








{/* ADDRESS */}


<div>


<label className="
block
font-bold
text-sm
mb-2
text-[#172033]
">

Store Address

</label>



<div className="relative">


<FiMapPin

className="
absolute
left-4
top-4
text-amber-500
"

/>



<textarea

rows="4"

name="address"

value={settings.address}

onChange={handleChange}

placeholder="Store address"

className="
w-full
pl-12
pt-3
rounded-lg
border
border-gray-200
outline-none
resize-none
focus:border-amber-400
"

/>


</div>


</div>








{/* FACEBOOK */}

<div>


<label className="
block
font-bold
text-sm
mb-2
">

Facebook URL

</label>


<div className="relative">


<FiFacebook

className="
absolute
left-4
top-4
text-amber-500
"

/>


<input

name="facebook"

value={settings.facebook}

onChange={handleChange}

placeholder="Facebook URL"

className="
w-full
h-12
pl-12
rounded-lg
border
border-gray-200
"

/>


</div>


</div>








{/* WHATSAPP */}

<div>


<label className="
block
font-bold
text-sm
mb-2
">

WhatsApp Number

</label>



<div className="relative">


<FiMessageCircle

className="
absolute
left-4
top-4
text-amber-500
"

/>


<input

name="whatsapp"

value={settings.whatsapp}

onChange={handleChange}

placeholder="WhatsApp number"

className="
w-full
h-12
pl-12
rounded-lg
border
border-gray-200
"

/>


</div>


</div>








{/* MAINTENANCE MODE */}


<div className="
bg-[#FFF9ED]
border
border-[#FDECC8]
rounded-xl
p-4
flex
items-center
justify-between
">


<div>


<h3 className="
font-bold
text-sm
text-[#172033]
">

Maintenance Mode

</h3>


<p className="
text-xs
text-gray-500
mt-1
">

Disable website temporarily

</p>


</div>





<label className="
cursor-pointer
">


<input

type="checkbox"

className="hidden"

checked={maintenanceMode}

onChange={(e)=>

setMaintenanceMode(
e.target.checked
)

}

/>



<div className={`
w-12
h-6
rounded-full
transition

${
maintenanceMode
?
"bg-amber-500"
:
"bg-gray-300"
}

`}>



<div className={`
w-5
h-5
bg-white
rounded-full
shadow
mt-[2px]
transition

${
maintenanceMode
?
"translate-x-6"
:
"translate-x-1"
}

`}>
</div>


</div>


</label>


</div>








{/* SAVE BUTTON */}


<Button

type="submit"

className="
w-full
h-12
rounded-xl
bg-gradient-to-r
from-amber-400
to-amber-500
text-white
font-black
"

>

Save Settings

</Button>




</form>


</div>


</div>


);

}
