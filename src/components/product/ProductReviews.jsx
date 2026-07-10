import {
  useEffect,
  useState,
} from "react";


import useAuth from "../../hooks/useAuth";


import {
  addReview,
  getProductReviews,
} from "../../services/reviewService";


import {
  successToast,
  errorToast,
} from "../ui/Toast";




export default function ProductReviews({
  productId
}){


  const {
    user
  } = useAuth();



  const [
    reviews,
    setReviews
  ] = useState([]);



  const [
    rating,
    setRating
  ] = useState(5);



  const [
    comment,
    setComment
  ] = useState("");



  const [
    loading,
    setLoading
  ] = useState(false);




  const loadReviews =
  async()=>{

    try{

      const data =
        await getProductReviews(
          productId
        );

      setReviews(data);


    }catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    loadReviews();

  },[productId]);






  const averageRating =
    reviews.length
      ?
      (
        reviews.reduce(
          (sum,item)=>
            sum + item.rating,
          0
        )
        /
        reviews.length
      ).toFixed(1)
      :
      "0.0";







  const submitReview =
  async()=>{


    if(!user){

      errorToast(
        "Please login first"
      );

      return;

    }



    if(!comment.trim()){

      errorToast(
        "Please write your review"
      );

      return;

    }



    try{


      setLoading(true);



      await addReview({

        productId,

        userId:
          user.uid,


        userName:
          user.displayName ||
          "Premium Customer",


        userEmail:
          user.email,


        rating,

        comment:

          comment.trim(),

      });



      successToast(
        "Review submitted successfully"
      );



      setComment("");

      setRating(5);



      loadReviews();



    }catch(error){


      console.log(error);


      errorToast(
        "Failed to submit review"
      );


    }
    finally{

      setLoading(false);

    }


  };







return (

<div className="
mt-16
">



{/* HEADER */}

<div className="
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
mb-8
">


<div>


<h2 className="
text-3xl
md:text-4xl
font-black
bg-gradient-to-r
from-blue-700
to-yellow-500
bg-clip-text
text-transparent
">
Customer Reviews
</h2>


<p className="
text-gray-500
mt-2
">
Real reviews from our premium customers
</p>


</div>





<div className="
bg-gradient-to-r
from-blue-900
to-blue-700
text-white
rounded-3xl
px-8
py-5
shadow-xl
">


<div className="
text-3xl
font-black
">
⭐ {averageRating}
</div>


<p className="
text-sm
text-yellow-300
">
{reviews.length} Reviews
</p>


</div>



</div>







{/* REVIEW BOX */}


<div className="
bg-white
rounded-[32px]
border
border-yellow-100
shadow-xl
p-6
md:p-8
">



<h3 className="
text-xl
font-bold
text-blue-900
mb-5
">
Share Your Experience
</h3>





<div className="
flex
gap-2
mb-6
">


{
[1,2,3,4,5]
.map((star)=>(

<button

key={star}

onClick={()=>
setRating(star)
}

className="
text-4xl
transition
hover:scale-125
"

>

{
star<=rating
?
"⭐"
:
"☆"
}


</button>


))
}



</div>





<textarea

rows="4"

className="
w-full
rounded-2xl
border
border-gray-200
p-4
outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder="
Write your premium experience...
"

value={comment}

onChange={(e)=>
setComment(
e.target.value
)
}

/>







<button

disabled={loading}

onClick={submitReview}

className="
mt-5
w-full
md:w-auto
px-8
py-4
rounded-2xl
font-bold
text-white
bg-gradient-to-r
from-blue-900
via-blue-700
to-yellow-500
hover:scale-105
transition
shadow-lg
disabled:opacity-50
"

>

{
loading
?
"Submitting..."
:
"Submit Review ⭐"
}


</button>



</div>









{/* REVIEWS LIST */}


<div className="
mt-8
space-y-5
">


{
reviews.length===0
?

<div className="
bg-blue-50
rounded-3xl
p-8
text-center
">

<div className="
text-5xl
">
⭐
</div>


<p className="
mt-3
font-semibold
text-blue-900
">
No reviews yet
</p>


<p className="
text-gray-500
">
Be the first customer to share your experience
</p>


</div>


:


reviews.map(review=>(


<div

key={review.id}

className="
bg-gradient-to-br
from-white
to-blue-50
rounded-3xl
p-6
border
border-blue-100
shadow-md
hover:shadow-xl
transition
"


>


<div className="
flex
justify-between
items-start
">


<div>

<h4 className="
font-black
text-blue-900
">
{review.userName}
</h4>


<p className="
text-yellow-500
mt-1
">
{"⭐".repeat(review.rating)}
</p>


</div>


<span className="
text-xs
text-gray-400
">
Verified Buyer
</span>


</div>





<p className="
mt-4
text-gray-600
leading-relaxed
">
{review.comment}
</p>




</div>


))


}



</div>




</div>

);

}
