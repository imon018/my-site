const {
  onDocumentCreated
} = require("firebase-functions/v2/firestore");

const {
  defineSecret
} = require("firebase-functions/params");

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");


admin.initializeApp();



const gmailEmail =
defineSecret("GMAIL_EMAIL");


const gmailPassword =
defineSecret("GMAIL_PASSWORD");





exports.sendPasswordChangeEmail =

onDocumentCreated(

{
 document:
 "passwordChangeRequests/{requestId}",

 secrets:[
 gmailEmail,
 gmailPassword
 ]

},


async(event)=>{


const data =
event.data.data();



const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{
user:
gmailEmail.value(),

pass:
gmailPassword.value()
}

});





const link =

`https://dream-mode-site.vercel.app/password-change-verify?token=${data.token}`;





await transporter.sendMail({

from:
`"Dream Mode" <${gmailEmail.value()}>`,


to:
data.email,


subject:
"Password Change Verification",


html:

`

<h2>
Dream Mode Password Change
</h2>

<p>
Click below to verify password change.
</p>


<a href="${link}"

style="
background:#F59E0B;
color:white;
padding:12px 20px;
border-radius:8px;
text-decoration:none;
">

Verify Password Change

</a>


<p>
This link will expire soon.
</p>

`

});



return null;


});
