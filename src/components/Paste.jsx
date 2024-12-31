import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Paste = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const pastes = useSelector((state) => state.paste.pastes);
    console.log(pastes);
    const dispatch = useDispatch();
    const filteredPastes = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPaste(pasteId));

    }


    return (
        <div >
            <input
                className='p-2 rounded-lg mt-2 mb-2 w-[100%] pl-4'
                type="search" placeholder="Search Here" vlaue={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value);
                }} />

            <div className='flex flex-col gap-4 mt-8'>

                {
                    filteredPastes.length > 0 ?
                        filteredPastes.map((paste) => {
                            return (
                                <div className='border' key={paste?.id}>
                                    <div>
                                        {paste.title}
                                    </div>
                                    <div>
                                        {paste.content}
                                    </div>

                                    <div className='flex flex-row gap-2 place-content-evenly'>
                                        <button><NavLink to={`/?pasteId=${paste?.id}`}> Edit </NavLink></button>
                                        <button ><NavLink to={`/pastes/${paste?.id}`}>  View </NavLink></button>
                                        <button onClick={() => { handleDelete(paste?.id) }}>Delete</button>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(paste?.content);
                                            toast.success("Copied to clipboard");
                                        }}>Copy</button>
                                        <button>Share</button>
                                    </div>
                                    <div>
                                        {paste.createdAt}
                                    </div>


                                </div>
                            )

                        }

                        ) : <h1>No Pastes Found</h1>
                }

            </div>

        </div>
    )
}

export default Paste
