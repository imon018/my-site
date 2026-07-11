import PolicyLayout from "../components/PolicyLayout";


export default function SizeGuide(){


return (

<PolicyLayout

title="Size Guide"

description="Find the perfect fit with our easy measurement guide."

>


<div className="space-y-8">


<p>
Choosing the right size is important for a comfortable
and perfect look. Please check our size guide before
placing your order.
</p>




<h2 className="text-2xl font-bold text-blue-950">
How To Measure
</h2>


<ul className="list-disc pl-6 space-y-3">


<li>
Measure your body using a soft measuring tape.
</li>


<li>
Keep the tape comfortable and avoid pulling too tight.
</li>


<li>
Compare your measurements with the size chart below.
</li>


</ul>





<h2 className="text-2xl font-bold text-blue-950">
Dress Size Chart
</h2>




<div
className="
overflow-x-auto
"
>

<table
className="
w-full
border
border-slate-200
rounded-xl
overflow-hidden
"
>

<thead>

<tr
className="
bg-blue-950
text-white
"
>

<th className="p-4">
Size
</th>

<th className="p-4">
Bust
</th>

<th className="p-4">
Waist
</th>

<th className="p-4">
Length
</th>


</tr>

</thead>


<tbody>


<tr className="border-b">

<td className="p-4 text-center">
S
</td>

<td className="p-4 text-center">
34"
</td>

<td className="p-4 text-center">
28"
</td>

<td className="p-4 text-center">
40"
</td>

</tr>



<tr className="border-b">

<td className="p-4 text-center">
M
</td>

<td className="p-4 text-center">
36"
</td>

<td className="p-4 text-center">
30"
</td>

<td className="p-4 text-center">
42"
</td>

</tr>



<tr>

<td className="p-4 text-center">
L
</td>

<td className="p-4 text-center">
38"
</td>

<td className="p-4 text-center">
32"
</td>

<td className="p-4 text-center">
44"
</td>

</tr>


</tbody>


</table>


</div>





<h2 className="text-2xl font-bold text-blue-950">
Need Help Choosing Size?
</h2>


<p>
Contact our support team before ordering. We will help
you choose the best size.
</p>



</div>


</PolicyLayout>


);

}
