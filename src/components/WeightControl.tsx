// src/components/WeightControl.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface WeightControlProps {
    weight: number;
    min: number;
    max: number;
    onChange: (w: number) => void;
}

export const WeightControl: React.FC<WeightControlProps> = ({
                                                                weight, min, max, onChange,
                                                            }) => {
    const step = 1;
    const dec = () => onChange(Math.max(min, weight - step));
    const inc = () => onChange(Math.min(max, weight + step));
    const onSlide = (e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(parseInt(e.target.value, 10));

    return (
        <div className="flex flex-col space-y-2 w-full items-start">
            <motion.input
                type="range"
                min={min}
                max={max}
                step={step}
                value={weight}
                onChange={onSlide}
                whileHover={{ scale: 1.025 }}
                className="ml-[2rem] w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
            />

            <div className="flex w-full justify-center items-center space-x-[1rem] mt-[0.5rem]">
                <motion.button
                    type="button"
                    onClick={dec}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full focus:outline-none border-4 border-border bg-surface"
                >
                    <Minus size={20} />
                </motion.button>

                <span className="w-20 text-center font-semibold">{weight} kg</span>

                <motion.button
                    type="button"
                    onClick={inc}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full focus:outline-none border-4 border-border bg-surface"
                >
                    <Plus size={20} />
                </motion.button>
            </div>
        </div>
    );
};
