const Token= (token)=>{return(`<html ><style type="text/css">	.button {  background-color: #4CAF50; /* Green */  border: none;  color: white;  padding: 15px 32px;  text-align: center;  text-decoration: none;  display: inline-block;  font-size: 16px;}h1{	padding-top: 100px;	color:Green;}body{	text-allign:center;}</style><body>
<center>
    <img src="https://cdn.pixabay.com/photo/2020/05/15/18/46/corona-5174671__340.jpg">
    <h1>Click on the Button to reset your password</h1>
    <a color='white' bg-color='#4CAF50' href=${'http://localhost:5000/api/auth/forgot/'+token}>
<button class='button' bg-color='#4CAF50' width='100%'>Click Here </button></a>
</center>
</body></html>`)}
export default Token;