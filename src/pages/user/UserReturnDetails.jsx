import {
  useParams,
} from "react-router-dom";


export default function UserReturnDetails(){


const {
  id
}=useParams();



return (

<div

className="
min-h-screen
bg-[#FCFAF5]
px-4
py-6
"

>


<div

className="
max-w-xl
mx-auto
bg-white
border
border-gray-100
rounded-lg
shadow-sm
p-6
text-center
"

>


<h1

className="
text-xl
font-black
"

>

Return Details

</h1>



<p

className="
text-sm
text-gray-500
mt-3
"

>

Return ID:

<span

className="
font-bold
ml-1
"

>

{id}

</span>


</p>





<p

className="
text-sm
text-gray-400
mt-4
"

>

Return details page will be added soon.

</p>



</div>


</div>


);


}
