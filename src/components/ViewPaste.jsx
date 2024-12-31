import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {

    const {id} = useParams();
    console.log(id);    

    const allPastes = useSelector((state) => state.paste.pastes);
    console.log(allPastes);

    const paste = allPastes.filter((paste) => paste.id === id)[0];

    console.log(paste);



  return (
    <div>
      <div className='flex flex-row gap-4 place-content-between'>
            <input
                className='p2 rounded-lg mt-2 w-[50%] pl-4' disabled='disabled' type="text"  value={paste.title} />
            
        </div>
        <div className='mt-4'>
            <textarea 
            className='rounded=4xl mt-4 min-w-[500px] min-h-[500px] p-4'
            disabled='disabled'
            value={paste.content}
 >

            </textarea>
        </div>
    </div>
  )
}

export default ViewPaste
