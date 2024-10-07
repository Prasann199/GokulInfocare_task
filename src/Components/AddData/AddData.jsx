import React, { useState,useEffect } from 'react'
import "./AddData.css";
import axios from "axios"
// import DisplayData from '../DisplayData/DisplayData';
const AddData = ({emails,selectedUser}) => {

    // states are been created to store the values entered by the user
    const [fname,setFname]=useState("");
    const [lname,setLname]=useState("");
    const [pno,setPno]=useState("");
    const [address,setAddress]=useState("");
    const [email,setEmail]=useState("");
    // for redusing unrequired rendering
    useEffect(() => {
        // if selectedUser has data then setting those data
        if (selectedUser) {
            setFname(selectedUser.fname);
            setLname(selectedUser.lname);
            setPno(selectedUser.pno);
            setAddress(selectedUser.address);
            setEmail(selectedUser.email);
        }
        //  dependency for rendering
    }, [selectedUser]);
    // data is been adding to the database
    const submitData=async(event)=>{
        // it prevents the default behaviour of an element from triggering
        event.preventDefault();
        // error handeling
        try{
            // url for adding data to db via server 
            const url="http://localhost:8080/adduser";
            // data recieved by user
            let userData={
                fname:fname,
                lname:lname,
                pno:pno,
                address:address,
                email:email
            }
            // post method for posting data
            const response=await axios.post(url,userData);
            console.log(response.data);
            // checking data return by the server
            if (response.data === "user added") {
                alert("User added Successfully!");
              } else{
                alert("User not added !");
              }
        }catch(error){
            console.error("Error during login:", error);
            alert("An error occurred during login");
        }
        // reloading
        window.location.reload();
    }
    
    
// updating user data
    const updateDate=async()=>{
        // by object recieved by parent component we are getting email and sending it to backend
        let emails=selectedUser.email;
        const url=`http://localhost:8080/update/${emails}`;
        try{
            // data on which user made changes 
            let userData={
                fname:fname,
                lname:lname,
                pno:pno,
                address:address,
                email:email
            }
            // post method with url and data
            let response=await axios.post(url,userData)
            // checking condition for evaluation
            if(response.data==="user updated"){
                alert("user data updated!"); 
            }else{
                alert("User Not Updated");
            }
        }catch (error){
            alert("error:",error)
            console.log("error:",error)
        }
        // reloading
        window.location.reload();
        
    }


  return (
    <div className='adddata-container'>
        {/* form */}
        <form >
            {/* data fields label and textboxes */}
            <div className="adddata-box">
                <label htmlFor="fname">First Name</label>
                <input type="text" name='fname' placeholder='Enter your first name here' value={fname} onChange={(e)=>{setFname(e.target.value)}}/>
            </div>
            <div className="adddata-box">
                <label htmlFor="lname">Last Name</label>
                <input type="text" name='lname' placeholder='Enter your last name here'value={lname} onChange={(e)=>{setLname(e.target.value)}}/>
            </div>
            <div className="adddata-box">
                <label htmlFor="pno">Phone Number</label>
                <input type="text" name='pno' placeholder='Enter your phone number here' value={pno} onChange={(e)=>{setPno(e.target.value)}}/>
            </div>
            <div className="adddata-box">
                <label htmlFor="address"> Address</label>
                <input type="text" name='address' placeholder='Enter your address here'value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
            </div>
            <div className="adddata-box">
                <label htmlFor="email">Email</label>
                <input type="text" name='email' placeholder='Enter your email here' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="adddata-btn">
                {/* buttons for data adding and updating */}
            <button onClick={submitData}>Submit Data</button>
            <button onClick={updateDate}>Update Data</button>
            </div>
        </form>
        {/* <DisplayData /> */}
    </div>
  )
}

export default AddData