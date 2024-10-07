import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./DisplayData.css";
import AddData from '../AddData/AddData';

const DisplayData = () => {
    // states are been created if needed then initialized
    const [users,setUsers]=useState([]);
    const [email,setEmail]=useState();
    const [selectedUser,setSelectedUser]=useState();

    // useEffect is used to reduce unrequired rendering
    useEffect(() => {

        // the method is used to get the data from backend server
        // Asynchronous method is been defined to achive asyncronous flow
        const getData = async () => {
            // try catch is used for exception handling
            try {
                // data is been getting from server using url of the server in my case it is localhost getuser is endpoint
                let response = await axios.get("http://localhost:8080/getuser");
                // data is been set to Users array
                setUsers(response.data);

            } catch (error) {
                // if any exception or error found it will throw it on console
                console.error("Error fetching users:", error);
            }
        };

        // the method is being called
        getData();
    }, []);

    // this method used to delete the user
    // email is been sent from parent class
    let handleDelete=async(email)=>{
        // url and in this i have used string interpollation for sending email to backend
        const url=`http://localhost:8080/delete/${email}`;
        try{
            // the response sent by server will be catched by response
            let response=await axios.delete(url)

            // the response data is been checked if it equals to the same then that will alerat accordingly
        if(response.data==="user deleted"){
            alert("User deleted!")
            
        }else{
            alert("User not deleted!")
        }
        // error handling using try catch
        }catch (error){
            alert("error:",error);
            console.log("error:",error)
        }
        // finally block after the operations i want to load so that the data updates itself
        finally{
            // reloads the page
            window.location.reload();
        }
        
    }

    // edit handle will make the email to set and set user
    let handleEdit=async(email)=>{
        // setting email
        setEmail(email);   
        try{
            // url to send the request to server
            const url=`http://localhost:8080/getuser/${email}`;
            // response got by server
            let response=await axios.get(url);
            console.log(response.data);
            // setting selectedUser
            setSelectedUser(response.data);
            // alerting as editing enabled
            alert("Editing enabled!")
            // error handeling
        }catch(error){
            alert("Error:",error);
            console.log("Error:",error);
        }
    }

  return (<>
  {/* AddData Component is been connected here */}
  <AddData  selectedUser={selectedUser}/>
  {/* if user numbers are greater then 0 then the user list will be showed else not */}
  {(users.length>0)?<div className='disp-data-container'>
        <h2>Users</h2>
        {/* table for user data showing  */}
        <table border={1}>
            <thead>
                {/* headers of the table */}
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Actions</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    // using map the data is been rendering in table dynamically
                users.map((user,idx)=>(

                <tr key={idx}>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.pno}</td>
                    <td>{user.address}</td>
                    <td>{user.email}</td>
                    {/* button for enabling editing */}
                    <td><button className='dispdata-edit' onClick={()=>{handleEdit(user.email)}}>Edit</button></td>
                    {/* button for deleting user */}
                    <td><button className='dispdata-delete' onClick={()=>{handleDelete(user.email)}}>Delete</button></td>
                </tr>
                ))
                }
            </tbody>
        </table>
    </div>:""}
    
  </>
  )
}

export default DisplayData