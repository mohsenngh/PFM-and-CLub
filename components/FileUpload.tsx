import React, { useState, useRef } from 'react';
import { CameraIcon, DocumentArrowUpIcon } from './icons/Icons';

interface FileUploadProps {
    label: string;
    onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelect(file);
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setPreview(null); // No preview for non-image files like PDF
            }
        }
    };
    
    const triggerFileSelect = () => fileInputRef.current?.click();
    const triggerCamera = () => cameraInputRef.current?.click();

    return (
        <div className="w-full p-6 border-2 border-dashed border-gray-600 rounded-lg text-center bg-gray-800">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
            <input type="file" ref={cameraInputRef} onChange={handleFileChange} className="hidden" accept="image/*" capture="environment" />
            
            <p className="font-semibold mb-2 text-white">{label}</p>
            
            {preview && <img src={preview} alt="Preview" className="max-h-40 mx-auto rounded-lg my-2"/>}

            <div className="flex justify-center gap-4 mt-4">
                <button onClick={triggerFileSelect} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white">
                    <DocumentArrowUpIcon className="w-5 h-5" />
                    <span>گالری</span>
                </button>
                 <button onClick={triggerCamera} className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-white">
                    <CameraIcon className="w-5 h-5" />
                    <span>دوربین</span>
                </button>
            </div>
        </div>
    );
};

export default FileUpload;