// /* eslint-disable no-const-assign */
import React, { useState , useEffect} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios'

import signinImage from '../assets/signup.jpg';


const cookies = new Cookies();


const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
    doctor_id : '',
}

 
const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(true);
  
     const [isDoctor, SetIsDoctor] = useState(true);
     const CheckSign = (SetIsDoctor) =>{
        const rolee = cookies.get('role'); 
       
        if(rolee === "Patient"){
          //  console.log(rolee);
            SetIsDoctor((prevIsSignup) => !prevIsSignup);
         
        }
     }
    
    
       useEffect(() => {
      
        CheckSign(SetIsDoctor);
      }, []);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

         try {
          
            // if(isSignup && form.password !== form.confirmPassword){
            //     alert('password and confirm passwod should same');
                
            //     window.location.reload();
            // }
            // else if(isSignup && form.phoneNumber.length() < 10 ){
            //     alert('Not an Valid phone number');
               
            //     window.location.reload();
            // }
          //  else{
                const { username, password, phoneNumber, avatarURL , fullName  ,doctor_id } = form;

        const URL = 'http://localhost:5000/auth';
        //console.log(form);
    
    // const { data: { token, userId, hashedPassword, fulllName } } =    await axios.post('http://localhost:5000/auth/signup', {
    //        username , fullName , phoneNumber , password
    //     });
     const { data: { token, userId, hashedPassword, fulllName , doctor_id1  } } =    await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
          username , fullName , phoneNumber , password , doctor_id
       });
    
      //   console.log(form);
        cookies.set('token', token);
       // console.log(token);
        cookies.set('username', username);
       
        cookies.set('userId', userId);

        if(isSignup) {
            cookies.set('fullName', fulllName);
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
            
        }
        //if(isDoctor)
        cookies.set('Dr.id' , doctor_id1);
          //  console.log(form);  
            } catch (error) {
               if(!isDoctor) alert('check your doctor id ')
               else alert('there is some error in connection retry again ')
            //    console.log(cookies.getAll());
                console.log(error);
            }
     window.location.reload();
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    
    const switchMode1 =  (isDoctor) =>{
        // if(isDoctor === true)
        // cookies.set('role' , "Doctor" );
        // else
         cookies.set('rolee' , "Patient" );
         cookies.remove('role');
     //  if(cookies.get('role') === null) cookies.romove('role');
        window.location.reload();
      // console.log(cookies.getAll())
        }
    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <p>{isDoctor ? 'welcome Doctor , you are an hero ' : 'have an healthy recovery '}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && !isDoctor && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="doctor_id">Doctor Id</label>
                                <input 
                                    name="doctor_id" 
                                    type="text"
                                    placeholder="Your doctor id "
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                       
                    </div>
                    <div className="auth__form-container_fields-account">
                        
                        <span onClick={switchMode1}>
                             {'Go back to Role page!'}
                             </span> 
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth;
