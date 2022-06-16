import React,{useRef,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Style/CreateMail.css';

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CreateMail = (props) => {
    const navigate = useNavigate();
    const enteredTo = useRef();
    const enteredContent = useRef();
    const enteredSubject = useRef();

    const [text, setText] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
   
    const email = localStorage.getItem('email');
    const string = email.split('@');
    const username = string[0];

    const editChange = (value) => {
        console.log(value.blocks)
        setText(value.blocks)
        console.log('Text: ',text);
    }
    
    const sendEmailHandler = (event)=>{
        event.preventDefault();

        const to = enteredTo.current.value;
        const subject = enteredSubject.current.value;
        const content = enteredContent.current.value;
        
        fetch(`https://mail-box-client-eb11c-default-rtdb.firebaseio.com/mails/${username}.json`,{
            method: 'POST',
            body: JSON.stringify({
                to: to,
                from: email,
                subject: subject,
                content: content,
                timestamp: new Date().toLocaleTimeString()
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                res.json().then((data)=> console.log(data));
                alert('Email sent successfully!');
                navigate('/inbox');
            }else{
                res.json().then((data)=>{
                    const errMsg = data.error.message;
                    alert(errMsg);
                })
            }
        })

    }

    return(
        <div className='mailBody'>
            <form onSubmit={sendEmailHandler}>
                <label>To
                <input 
                    type='email'
                    className='inputField'
                    ref={enteredTo}
                /></label>
                <hr className='separator'/>
                <label>Subject
                    <input 
                        type='text'
                        className='inputField'
                        ref={enteredSubject}
                    />
                </label>
                <hr className='separator'/>
                <textarea 
                    className='inputAreaBlock'
                    ref={enteredContent}
                >
                </textarea>
                {/* <div className='editor'>
                    <Editor 
                        ref={enteredContent}
                        editorState = {editorState}
                        toolbarClassName= 'toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        onEditorStateChange={setEditorState}
                        onContentStateChange={editChange}
                        
                    />
                </div> */}
                <hr className='separator'/>
                <button className='sendBtn'>Send</button>
            </form>
        </div>
    )
};

export default CreateMail;