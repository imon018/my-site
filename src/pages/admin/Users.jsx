import { useEffect, useState } from "react";

import {
  FiSearch,
  FiFilter,
  FiTrash2,
  FiCrown,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiShield,
  FiUserCheck,
} from "react-icons/fi";


import {
  getUsers,
  changeRole,
  deleteUser,
} from "../../services/adminService";



export default function Users() {


const [users,setUsers] = useState([]);

const [search,setSearch] = useState("");

const [role,setRole] = useState("all");

const [page,setPage] = useState(1);

const [selectedUser,setSelectedUser] = useState(null);


const usersPerPage = 6;



useEffect(()=>{

loadUsers();

},[]);



async function loadUsers(){

try{

const data = await getUsers();

setUsers(data);


}catch(error){

console.log(error);

}

}




async function toggleAdmin(user){

await changeRole(

user.id,

user.role==="admin"
?
"user"
:
"admin"

);


loadUsers();

}





async function removeUser(user){


const confirmDelete =
window.confirm(
`Delete ${user.email}?`
);


if(!confirmDelete)
return;


await deleteUser(user.id);


loadUsers();


}




const filteredUsers = users.filter((user)=>{


const matchSearch =
user.email
?.toLowerCase()
.includes(
search.toLowerCase()
);



const matchRole =
role==="all"
?
true
:
user.role===role;



return matchSearch && matchRole;


});





const totalPages =
Math.ceil(
filteredUsers.length / usersPerPage
);



const currentUsers =
filteredUsers.slice(
(page-1)*usersPerPage,
page*usersPerPage
);





const totalUsers =
users.length;


const totalAdmins =
users.filter(
u=>u.role==="admin"
).length;







return (

<div className="
space-y-6
">


{/* Title */}

<div>

<h1 className="
text-3xl
font-bold
text-slate-800
">
Users
</h1>


<p className="
text-gray-500
mt-1
">
Dashboard  ›  Users
</p>


</div>






{/* Stats */}


<div className="
grid
grid-cols-2
lg:grid-cols-4
gap-4
">


<StatCard

icon={<FiUsers/>}

title="Total Users"

value={totalUsers}

/>


<StatCard

icon={<FiShield/>}

title="Admins"

value={totalAdmins}

/>


<StatCard

icon={<FiUserCheck/>}

title="New This Month"

value="32"

/>


<StatCard

icon={<FiUsers/>}

title="Active Users"

value="186"

/>



</div>








{/* Search Filter */}


<div className="
flex
gap-3
flex-col
md:flex-row
">


<div className="
relative
flex-1
">


<FiSearch

className="
absolute
left-4
top-4
text-gray-400
"

/>


<input

value={search}

onChange={(e)=>{

setSearch(e.target.value);
setPage(1);

}}

placeholder="
Search users...
"

className="
w-full
pl-11
pr-4
py-3
rounded-xl
border
bg-white
"
/>


</div>





<select

value={role}

onChange={(e)=>setRole(e.target.value)}

className="
px-5
py-3
rounded-xl
border
bg-white
"

>

<option value="all">
All Roles
</option>


<option value="admin">
Admin
</option>


<option value="user">
User
</option>


</select>



</div>









{/* User List */}


<div className="
bg-white
rounded-2xl
shadow-sm
overflow-hidden
">


{

currentUsers.map((user)=>(


<div

key={user.id}

className="
flex
items-center
justify-between
p-4
border-b
"

>


<div className="
flex
items-center
gap-3
">


<img

src={
user.photoURL ||
"https://ui-avatars.com/api/?name=User"
}

className="
w-12
h-12
rounded-full
object-cover
"

/>



<div>

<h3 className="
font-semibold
text-slate-800
">

{user.name || "User"}

</h3>


<p className="
text-sm
text-gray-500
">

{user.email}

</p>


</div>


</div>







<div className="
flex
items-center
gap-3
">


<span

className={`
hidden
sm:block
px-3
py-1
rounded-lg
text-sm

${
user.role==="admin"
?
"bg-orange-100 text-orange-600"
:
"bg-blue-100 text-blue-600"

}

`}

>

{user.role || "user"}

</span>





<button

onClick={()=>toggleAdmin(user)}

className="
p-3
rounded-xl
bg-orange-100
text-orange-600
"

>

<FiCrown/>

</button>





<button

onClick={()=>setSelectedUser(user)}

className="
p-3
rounded-xl
bg-red-100
text-red-600
"

>

<FiTrash2/>

</button>



</div>




</div>


))


}



</div>









{/* Pagination */}


<div className="
flex
justify-center
gap-2
">


<button

onClick={()=>
setPage(
Math.max(1,page-1)
)
}

className="
p-3
bg-white
rounded-xl
"

>

<FiChevronLeft/>

</button>



{

Array.from(
{
length: totalPages
}
).map(
(_,i)=>(


<button

key={i}

onClick={()=>setPage(i+1)}

className={`
px-4
rounded-xl

${
page===i+1
?
"bg-amber-500 text-white"
:
"bg-white"
}

`}

>

{i+1}

</button>


)

)

}





<button

onClick={()=>
setPage(
Math.min(
totalPages,
page+1
)
)
}

className="
p-3
bg-white
rounded-xl
"

>

<FiChevronRight/>

</button>


</div>








{/* Mobile Delete Sheet */}


{

selectedUser && (


<div className="
fixed
inset-0
bg-black/40
flex
items-end
z-50
">


<div className="
bg-white
w-full
rounded-t-3xl
p-6
space-y-4
">


<h2 className="
text-xl
font-bold
">

{selectedUser.name}

</h2>



<button

onClick={()=>{

toggleAdmin(selectedUser);

setSelectedUser(null);

}}

className="
w-full
p-4
rounded-xl
bg-gray-100
text-left
"

>

Make / Remove Admin

</button>



<button

onClick={()=>{

removeUser(selectedUser);

setSelectedUser(null);

}}

className="
w-full
p-4
rounded-xl
bg-red-50
text-red-600
text-left
"

>

Delete User

</button>


<button

onClick={()=>setSelectedUser(null)}

className="
w-full
p-4
rounded-xl
bg-gray-100
"

>

Cancel

</button>



</div>


</div>


)


}





</div>


);

}





function StatCard({
icon,
title,
value
}){


return (

<div className="
bg-white
rounded-2xl
p-5
shadow-sm
">


<div className="
text-amber-500
text-xl
mb-3
">

{icon}

</div>


<p className="
text-sm
text-gray-500
">

{title}

</p>


<h2 className="
text-3xl
font-bold
text-slate-800
">

{value}

</h2>


</div>

);


}
