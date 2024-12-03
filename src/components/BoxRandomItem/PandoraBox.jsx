import React from 'react';
import PandoraBox3D from './PandoraBox3D';


function PandoraBox() {


    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-t from-green-400 to bg-green-200">
            <PandoraBox3D />
            <div className='flex-col justify-center items-center'>
                <h3
                    className="text-blue-400 font-bold text-2xl"
                    style={{
                        textShadow: `
      -1px 0 black,   /* ซ้าย */
       1px 0 black,   /* ขวา */
       0 -1px black,  /* บน */
       0 1px black    /* ล่าง */
    `,
                    }}
                >
                    Click the Box!
                </h3>

                <img src="/public/assets/leftfinger.gif" alt="right" className='w-[150px]' />
            </div>
        </div>
    );
}

export default PandoraBox;
