import React, { useState } from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();



const Auth1 = () => {
     const handleSubmit = async (e) => {
        e.preventDefault();

         try {
            var checkRadio = document.querySelector(
                'input[value="Doctor"]:checked');
                    if(checkRadio !== null){
                        cookies.set('role' , "Doctor");
                    //   console.log('Doctor')
                    }
                    else{
                        cookies.set('role' , "Patient")
                       // console.log('patient')
                    }
                  
          // console.log("jk");
            } catch (error) {
                console.log(error);
            }
  
    }

   

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>Choose your Roles</p>
                    <form onSubmit={handleSubmit}>
                         <div>
                            <div className="role_input_form">
                                <label className="role_input_form_label" htmlFor="Doctor">Doctor</label>
                                <input 
                                    name="Patient" 
                                    type="radio"
                                    value= "Doctor"
                                
                                />
                            </div>
                        
                        
                            <div className="role_input_form">
                                <label className="role_input_form_label"  htmlFor="patient">patient</label>
                                <input 
                                    name="Patient" 
                                    type="radio"
                                   value="patient"
                                   checked
                                />
                            </div>
                            </div>
                        
                        
                        <div className="auth__form-container_fields-content_button">
                            <button>submit</button>
                        </div> 
                    </form>
                    
                </div> 
            </div>
           
        </div>
    )
}

export default Auth1;
