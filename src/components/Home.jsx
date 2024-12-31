import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addToPaste,updateToPaste} from '../redux/pasteSlice.js';

const Home = () => { 
    const [title, setTitle] = useState('');
    const [value,setValue] = useState('');
    const [searchParams,setSearchParams] = useSearchParams(); // to get the id of the paste

    const pasteId=searchParams.get("pasteId");

    const dispatch = useDispatch();

    const allPastes= useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
            console.log(pasteId);
            const paste=allPastes.find((p) => p.id === pasteId);
            if(paste){
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    },[pasteId]);

    function createPaste(){
        const paste = {
            title:title,
            content:value,
            id:pasteId || Date.now().toString(20),
            createdAt:new Date().toISOString(),

    }

    if(pasteId){
        //updating paste
        dispatch(updateToPaste(paste));

    }
    else{
        //creating paste
        dispatch(addToPaste(paste));

    }

    //after creating or updation
    setTitle('');
    setValue('');
    setSearchParams({});
}



    return (
        <>
        <div className='flex flex-row gap-4 place-content-between'>
            <input
                className='p2 rounded-lg mt-2 w-[50%] pl-4' type="text" placeholder='Enter the Title Here ' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            
            <button className='p2 rounded-lg mt-2' onClick={createPaste} >
                { pasteId ? 'Update Paste': 'Create My Paste'}

            </button>
        </div>
        <div className='mt-4'>
            <textarea 
            className='rounded=4xl mt-4 min-w-[500px] min-h-[500px] p-4'
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            placeholder='Enter the content here ' >

            </textarea>
        </div>
        </>
    )
}

export default Home

