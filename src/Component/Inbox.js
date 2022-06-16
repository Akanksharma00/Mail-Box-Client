import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../store/mailReducer";

import '../Style/Inbox.css';

const Home = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(state=> state.mail.isLoading);
    const mails = useSelector(state => state.mail.receivedMails);
    const email = localStorage.getItem('email');
    const string = email.split('@');
    const username = string[0];

    useEffect( ()=>{
        async function fetchMail(){
        dispatch(mailActions.setLoading(true));
        try{const response = await fetch('https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails.json')
        
        if(!response.ok){
            throw new Error('Something went wrong...retrying!');
        }
        
        const data = await response.json();

        //Taking all keys in an array
        const usernameKeys = Object.keys(data);
        //Taking all values in an array
        const values = Object.values(data);
        //Fetching index of current user
        const indexOfUser = usernameKeys.indexOf(username);
        //Removing current user from array
        const removedValue = values.splice(indexOfUser,1);
        // console.log('values: ',values);
        
        let receivedMails = [];
        for(let i=0;i<values.length;i++){
            // console.log('x: ',values[i]);
            for(let key in values[i]){
                // console.log(values[i][key].to);
                if(values[i][key].to === email){
                    receivedMails.push({
                        id: key,
                        to: values[i][key].to,
                        from: values[i][key].from,
                        subject: values[i][key].subject,
                        content: values[i][key].content,
                        timestamp: values[i][key].timestamp
                    })
                }
            }
        }

        // console.log(receivedMails);
        console.log('Successfully loaded');
        dispatch(mailActions.setReceivedMail(receivedMails));
        }catch(error){
            console.log(error);
        }

        dispatch(mailActions.setLoading(false));
    }
    fetchMail();
    },[dispatch]);

    return(
        <div>
            {mails.length===0 && <p>No mail found</p>}
            <ul>
                {mails.map((mail) => {
                return(<li>
                    <table className='tableBody'>
                        <tr className='row'>
                            <td className='fromCol'>{mail.from}</td>
                            <td className='subCol' onClick={()=>{navigate(`/mail/${mail.id}`)}}>
                                {mail.subject}
                            </td>
                            <td className='timeCol'>{mail.timestamp}</td>
                        </tr>
                    </table> 
                </li>)
            })}
            </ul> 
        </div>
    )
};

export default Home;