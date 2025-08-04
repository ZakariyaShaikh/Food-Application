import React ,{useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';


function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  let navigate = useNavigate()

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: credentials.email,
      password: credentials.password
    };

    // Log the data you're sending
    console.log("Sending data:", userData);

    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    console.log(json)


    if(!json.success) {
      alert(json.error ||
      "Please enter valid information");
    }
    if(json.success) {
      localStorage.setItem("userEmail" , credentials.email);
      localStorage.setItem("authtoken" , json.authtoken);
      console.log("authtoken:",localStorage.getItem("authtoken",))
      navigate("/")
    }
  }
  return (
    <>
      <div className="container">
        <h1 className="m-3 display-flex justify-content-center"> Login </h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address:</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email' value={credentials.email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name='password' value={credentials.password} />
          </div>
          <button type="submit" className=" btn btn-success">Submit</button>
          <Link className='m-3 btn btn-danger' to={"/signup"}>Don't have an account?</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
