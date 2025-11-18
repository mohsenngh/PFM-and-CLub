import React from 'react';

interface ProgressTrackerProps {
    steps: string[];
    currentStep: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-between items-start w-full my-8">
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center w-1/4">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 font-bold ${
                                    isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'
                                }`}
                            >
                                {isCompleted ? '✔' : index + 1}
                            </div>
                            <p className={`mt-2 text-xs text-center ${isActive ? 'font-bold text-blue-400' : 'text-gray-400'}`}>{step}</p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-grow h-1 mt-4 mx-2 transition-colors duration-300 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default ProgressTracker;
