import axios from 'axios';
import React from 'react'
import baseUrl from '../../utils/baseUrl';
const MyUser = ({user}) => {
    console.log(user.profilePicture)

    const myData ={
        name:user.name,
        username:user.username,
        email:user.email,
        phoneNumber:user.phoneNumber,
        country:user.country,
        imgPic:user.profilePicture,
    }
     function click(){
    // console.log(user)
    
         
        {
            try{

               const send= axios.post(`${baseUrl}/signup/livestream`, myData)
              
               
                console.log(send)
            }catch(e){
                console.log(e)
            }
        }
    }
  return (<>
    <button onClick={click}>click</button>
    </>
  )
}

export default MyUser