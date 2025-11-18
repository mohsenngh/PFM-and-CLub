import React, { useState, useRef, useEffect } from 'react';

interface OtpInputProps {
    length: number;
    onChange: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, onChange }) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        onChange(newOtp.join(""));
        
        // Focus next input
        if (element.nextSibling && element.value) {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputsRef.current[index - 1]) {
             inputsRef.current[index - 1]!.focus();
        }
    };

    return (
        <div className="flex justify-center gap-2" dir="ltr">
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    aria-label={`Digit ${index + 1}`}
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    ref={el => { inputsRef.current[index] = el; }}
                    className="w-12 h-14 text-center text-2xl bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}
        </div>
    );
};

export default OtpInput;
