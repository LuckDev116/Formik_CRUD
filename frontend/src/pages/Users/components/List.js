import React, { useState, useCallback, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getAllUsers, deleteUser } from "../../../services/userServices";

function List() {

    const [allUsers, setAllUsers]=useState([]);
    
    useEffect(()=>{
        getAllUsers().then(res=>{
            console.log(res.data.users);
            setAllUsers(res.data.users);            
        })
    },[]);
    
    return(
        <div>
            <h1>Users</h1>
            <Link to={"/add"} className="btn btn-sm btn-success mb-2">Add User</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>First Name</th>
                        <th style={{ width: '20%' }}>Last Name</th>
                        <th style={{ width: '20%' }}>Email</th>
                        <th style={{ width: '20%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       allUsers && allUsers.map(user =>
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName} </td>
                            <td>{user.email}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`/edit/${user._id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => {                                    
                                    if (window.confirm("Want to delete?")) {
                                        deleteUser(user._id)
                                            .then((res)=>{
                                                if(res.data.success) {
                                                    setAllUsers(allUsers.filter(user1=>user1._id!==user._id));
                                                }
                                            })
                                    }
                                }} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                        )
                   }
                   {!allUsers &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="spinner-border spinner-border-lg align-center"></div>
                                </td>
                            </tr>
                        }
                        {allUsers && !allUsers.length &&
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <div className="p-2">No Users To Display</div>
                                </td>
                            </tr>
                        }
                </tbody>
            </table>
        </div>
    );
}

export { List };