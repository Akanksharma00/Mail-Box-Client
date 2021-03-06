import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { mailActions } from "../store/mailReducer";

import star from '../Asset/star.png'
import yellowStar from '../Asset/yellowStar.png';

import '../Style/Inbox.css';

const Home = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(state=> state.mail.isLoading);
    const mails = useSelector(state => state.mail.receivedMails);
    const isStarred = useSelector(state => state.mail.isStarred);

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
        if(indexOfUser > 0){
        const removedValue = values.splice(indexOfUser,1);
        console.log(removedValue);
        }
        
        console.log('values: ',values);
        
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
                        timestamp: values[i][key].timestamp,
                        hasOpened: values[i][key].hasOpened,
                        // isStarred: values[i][key].isStarred
                    })
                }
            }
        }

        console.log(receivedMails);

        const newMails = receivedMails.filter(i => i.hasOpened === false);
        const noOfUnreadMails = newMails.length;
        dispatch(mailActions.setNoOfUnreadMail(noOfUnreadMails));
        
        console.log('Successfully loaded');
        dispatch(mailActions.setReceivedMail(receivedMails));
        }catch(error){
            console.log(error);
        }

        dispatch(mailActions.setLoading(false));       
        
        
    }
    fetchMail();
    },[dispatch]);

    const openMailHandler = async (mail) => {
        // console.log(mail);
        navigate(`/mail/${mail.id}`);

        const usernameString = mail.from.split('@');
        const username =  usernameString[0];

        const response = await fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails/${username}/${mail.id}.json`,{
            method: 'PUT',
            body: JSON.stringify({
                to: mail.to,
                from: mail.from,
                subject: mail.subject,
                content: mail.content,
                timestamp: mail.timestamp,
                // isStarred: mail.isStarred,
                hasOpened: true      
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        })

        if(response.ok){
            console.log('Updated!');
        }else{
            console.log('Encountered error!');
        }
        
    }

    return(
        <div>
            {mails.length===0 && <p>No mail found</p>}
            <ul>
                {mails.map((mail) => {
                return(<li className='listItem'>
                    <table className='tableBody'>
                        <tr className='row'>
                            <td className='fromCol'>
                                {/* <span onClick={() => {dispatch(mailActions.setStarred())}} >
                                    {!isStarred && <img src={star} className='star'/>}
                                    {isStarred &&  <img src={yellowStar} className='star'/>}
                                </span> */}
                                {mail.from}
                            </td>
                            <td className='subCol' onClick={()=>{openMailHandler(mail)}}>
                                <b>{mail.subject}</b>
                                <span> </span>
                                <span>{mail.content}</span>
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