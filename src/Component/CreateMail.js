import React,{useRef,useState} from 'react';

import style from './CreateMail.module.css';

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CreateMail = (props) => {
    const enteredTo = useRef();
    const enteredFrom = useRef();
    const enteredContent = useRef();
    const enteredSubject = useRef();

    const [text, setText] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const editChange = (value) => {
        console.log(value.blocks)
        setText(value.blocks)
        
    }

    const sendEmailHandler = (event)=>{
        event.preventDefault();

        const to = enteredTo.current.value;
        const from = enteredFrom.current.value;
        const subject = enteredSubject.current.value;
        const content = enteredContent.current.value;

        const toSplit = to.split('@')
        const name = toSplit[0];

        fetch('https://mail-box-client-eb11c-default-rtdb.firebaseio.com/sent.json',{
            method: 'POST',
            body: JSON.stringify({
                to: to,
                from: from,
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
            }else{
                res.json().then((data)=>{
                    const errMsg = data.error.message;
                    alert(errMsg);
                })
            }
        })

    }

    return(
        <div className={style.mailBody}>
            <form onSubmit={sendEmailHandler}>
                <label>To
                <input 
                    type='email'
                    className={style.inputField}
                    ref={enteredTo}
                /></label>
                <hr className={style.separator}/>
                <label>From
                    <input 
                        type='email'
                        className={style.inputField}
                        ref={enteredFrom}
                    />
                </label>
                <hr className={style.separator}/>
                <label>Subject
                    <input 
                        type='text'
                        className={style.inputField}
                        ref={enteredSubject}
                    />
                </label>
                <hr className={style.separator}/>
                {/* <textarea 
                    className={style.inputAreaBlock} 
                    ref={enteredContent}
                >
                </textarea> */}
                {/* <TextEditor /> */}
                <div>
                    <Editor 
                        ref={enteredContent}
                        editorState = {editorState}
                        toolbarClassName= 'toolbarClassName'
                        wrapperClassName='wrapperClassName'
                        editorClassName='editorClassName'
                        onEditorStateChange={setEditorState}
                        onContentStateChange={editChange}
                    />
                </div>
                <hr className={style.separator}/>
                <button className={style.sendBtn}>Send</button>
            </form>
        </div>
    )
};

export default CreateMail;