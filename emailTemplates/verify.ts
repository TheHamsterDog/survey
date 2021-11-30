


const Token= (token)=>{return(`<html ><style type="text/css">	.button {  background-color: #4CAF50; /* Green */  border: none;  color: white;  padding: 15px 32px;  text-align: center;  text-decoration: none;  display: inline-block;  font-size: 16px;}h1{	padding-top: 100px;	color:Green;}body{	text-allign:center;}</style><body>
	<center>
		<img src="https://cdn.pixabay.com/photo/2020/05/15/18/46/corona-5174671__340.jpg">
		<h1>Click on the Button to Verify Your Covid Help Id</h1>
	<a class='button' bg-color='#4CAF50' href=${'http://localhost:5000/api/auth/confirmation/'+token}>Click Here </a>
</center>
</body></html>`)}
export default Token;