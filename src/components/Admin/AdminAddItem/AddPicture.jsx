import React from 'react';
import { AddPictureIcon } from '../../icons';

export default function AddPicture({ file, setFile }) {
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col p-4 border rounded-lg w-full max-w-md mx-auto">
            <div
                className="bg-gray-100 hover:bg-gray-200 min-h-[150px] rounded-lg relative cursor-pointer flex justify-center items-center"
                onClick={() => document.getElementById('input-file').click()}
            >
                <input
                    type="file"
                    className="hidden"
                    id="input-file"
                    onChange={handleFileChange}
                />
                {file ? (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="max-w-full max-h-full"
                    />
                ) : (
                    <AddPictureIcon className="w-10 h-10 text-gray-400" />
                )}
            </div>
            {file && (
                <p className="text-center text-gray-600 mt-2">{file.name}</p>
            )}
        </div>
    );
}
