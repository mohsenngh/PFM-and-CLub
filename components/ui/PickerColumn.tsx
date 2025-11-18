import React, { useRef, useEffect } from 'react';

interface PickerColumnProps {
    items: number[];
    onSelect: (value: number) => void;
    value: number;
}

const PickerColumn: React.FC<PickerColumnProps> = ({ items, onSelect, value }) => {
    const ref = useRef<HTMLDivElement>(null);
    const itemHeight = 36; // Corresponds to h-9 in Tailwind
    const scrollTimeout = useRef<number | null>(null);

    useEffect(() => {
        const index = items.indexOf(value);
        if (ref.current && index !== -1) {
            // Center the initial value without animation
            ref.current.scrollTop = index * itemHeight;
        }
    }, [value, items, itemHeight]);

    const handleScroll = () => {
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = window.setTimeout(() => {
            if (ref.current) {
                const index = Math.round(ref.current.scrollTop / itemHeight);
                 if (items[index] !== undefined && items[index] !== value) {
                    onSelect(items[index]);
                }
            }
        }, 150); // Debounce scroll event
    };

    return (
        <div 
            ref={ref}
            onScroll={handleScroll}
            className="h-48 w-1/3 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        >
            {/* Padding elements to allow first and last items to be centered */}
            <div className="h-[72px]"></div>
            {items.map(item => (
                <div
                    key={item}
                    className={`h-9 flex items-center justify-center snap-center text-xl transition-colors duration-150 ${item === value ? 'font-bold text-blue-400' : 'text-gray-500'}`}
                >
                    {String(item).padStart(2, '0')}
                </div>
            ))}
            <div className="h-[72px]"></div>
        </div>
    );
};

export default PickerColumn;
