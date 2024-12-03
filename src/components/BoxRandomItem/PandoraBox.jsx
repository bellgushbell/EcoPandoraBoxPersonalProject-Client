import React from 'react';
import PandoraBox3D from './PandoraBox3D';
import Swal from 'sweetalert2';

function PandoraBox() {


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-t from-green-400 to bg-green-200">
            <div className='flex-col justify-center items-center'>
                <h3 className='text-black font-bold text-xl'>กดที่กล่องเพื่อสุ่ม</h3>
                <img src="/public/assets/slideright.gif" alt="right" className='w-20' />
            </div>
            <PandoraBox3D />
        </div>
    );
}

export default PandoraBox;
