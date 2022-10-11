import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session"



const DemoUser = ()=>{
    const history = useHistory()
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);

    const demo = {
      credential: 'JohnSmith',
      password: 'password'
    }

    const handleClick = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login(demo.credential, demo.password )).catch(
          async (res) => {

            const data  = await res.json();

            if (data && data.errors) setErrors(data.errors);

          }
          ).then(()=>history.push('/currentUser'));
        };

      return  (
            <div>
                    <button className='user-nav' onClick={handleClick}>DemoUser</button>
            </div>
      )


}

export default DemoUser;
