// src/App.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mars, Venus } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import './styles/globals.css';
import { AgeControl } from './components/AgeControl';
import { HeightControl } from './components/HeightControl';
import { WeightControl } from './components/WeightControl';
import { MlControl } from './components/MlControl';
import { AbvControl } from './components/AbvControl';
import { CountControl } from './components/CountControl';

type Beverage = { id: string; name: string; ml: number; abv: number; count: number };

const App: React.FC = () => {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(70);
    const [beverages, setBeverages] = useState<Beverage[]>([]);
    const [name, setName] = useState('');
    const [ml, setMl] = useState(250);
    const [abv, setAbv] = useState(5);
    const [count, setCount] = useState(1);
    const [result, setResult] = useState<string | null>(null);
    const [confetti, setConfetti] = useState(false);
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const addBeverage = () => {
        if (!name.trim()) { alert('Bitte Name eingeben'); return; }
        const newDrink: Beverage = { id: Date.now().toString(), name: name.trim(), ml, abv, count };
        setBeverages(prev => [...prev, newDrink]);
        setName(''); setMl(250); setAbv(5); setCount(1);
    };

    const removeBeverage = (id: string) => {
        setBeverages(prev => prev.filter(b => b.id !== id));
    };

    const calculate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([age, height, weight].some(v => v <= 0)) { alert('Bitte gültige Körperdaten eingeben'); return; }
        if (beverages.length === 0) { alert('Bitte mindestens ein Getränk hinzufügen'); return; }
        const TBW = gender === 'male'
            ? 2.447 - 0.09156 * age + 0.1074 * height + 0.3362 * weight
            : -2.097 + 0.1069 * height + 0.2466 * weight;
        const totalAlcohol = beverages.reduce((sum, b) => sum + b.count * b.ml * (b.abv / 100) * 0.8, 0);
        const value = (totalAlcohol / TBW).toFixed(2);
        setResult(value);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 5000);
    };

    return (
        <motion.form
            onSubmit={calculate}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-screen h-screen bg-surface text-text p-8 flex flex-col gap-y-6 overflow-auto"
        >
            {/* Vollbild-Confetti */}
            {confetti && <Confetti width={windowWidth} height={windowHeight} recycle={false} numberOfPieces={300} />}

            {/* Zentral platziertes Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-48 h-auto px-[40rem]"
                />
            </div>

            <h1 className="text-3xl font-bold text-center">Promille-Rechner</h1>

            {/* Geschlechtsauswahl */}
            <div className="w-1/3 ml-8 flex justify-center space-x-[1rem]">
                <motion.button
                    type="button"
                    onClick={() => setGender('male')}
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: gender === 'male' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`p-3 rounded-full focus:outline-none ${
                        gender === 'male' ? 'border-4 border-primary bg-primary/20' : 'border-2 border-muted'
                    }`}>
                    <Mars size={32} className={gender === 'male' ? 'text-primary' : 'text-muted'} />
                </motion.button>
                <motion.button
                    type="button"
                    onClick={() => setGender('female')}
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: gender === 'female' ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`p-3 rounded-full focus:outline-none ${
                        gender === 'female' ? 'border-4 border-primary bg-primary/20' : 'border-2 border-muted'
                    }`}>
                    <Venus size={32} className={gender === 'female' ? 'text-primary' : 'text-muted'} />
                </motion.button>
            </div>

            {/* Spacer */}
            <div style={{ marginTop: '4rem' }} />

            {/* Alter, Größe & Gewicht */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block mb-1 ml-8">Alter</label>
                    <div className="w-1/3 ml-8">
                        <AgeControl age={age} min={14} max={100} onChange={setAge} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block mb-1 ml-8">Größe</label>
                    <div className="w-1/3 ml-8">
                        <HeightControl height={height} min={100} max={220} onChange={setHeight} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block mb-1 ml-8">Gewicht</label>
                    <div className="w-1/3 ml-8">
                        <WeightControl weight={weight} min={40} max={250} onChange={setWeight} />
                    </div>
                </div>
            </div>

            {/* Getränk hinzufügen */}
            <div className="flex flex-col space-y-[1rem] mt-[4rem] ml-[0rem]">
                <div className="w-1/3 ml-[1rem]">
                    <input
                        type="text"
                        placeholder="                                      Name des Getränks"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-[0.25rem] py-[1rem] bg-gray-100 border-2 border-primary rounded-xl shadow-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 text-[1.25rem]" />
                </div>
                <div className="space-y-2">
                    <label className="block mb-1 ml-8">Menge</label>
                    <div className="w-1/3 ml-8">
                        <MlControl ml={ml} min={10} max={1000} onChange={setMl} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block mb-1 ml-8">Alkoholgehalt</label>
                    <div className="w-1/3 ml-8">
                        <AbvControl abv={abv} min={1} max={95} onChange={setAbv} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block mb-1 ml-8">Anzahl</label>
                    <div className="w-1/3 ml-8">
                        <CountControl count={count} min={1} max={50} onChange={setCount} />
                    </div>
                </div>
                <motion.button
                    type="button"
                    onClick={addBeverage}
                    whileHover={{ scale: 1.05 }}
                    className="w-1/3 ml-[1rem] px-[0.5rem] py-[1rem] bg-gray-100 text-text rounded-xl shadow-md focus:outline-none transition duration-200">
                    Getränk hinzufügen
                </motion.button>
            </div>

            {/* Getränkeliste */}
            <div className="flex-1 overflow-auto space-y-2">
                <AnimatePresence>
                    {beverages.map(b => (
                        <motion.div
                            key={b.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex justify-between items-center p-2 bg-surface border border-border rounded">
                            <div>
                                <strong>{b.name}</strong>
                                <div className="text-sm text-gray-500">{b.count} × {b.ml} ml @ {b.abv} %</div>
                            </div>
                            <button onClick={() => removeBeverage(b.id)} className="text-red-500 font-bold">✕</button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Berechnen & Ergebnis */}
            <div className="absolute top-1/2 right-[10rem] transform -translate-y-1/2 flex flex-col items-end space-y-6">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    className="px-[1.5rem] py-[1rem] text-4xl font-extrabold bg-primary text-white rounded-lg shadow-xl">
                    Promille berechnen
                </motion.button>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-10 bg-white border rounded text-[2rem] font-extrabold text-center shadow-lg">
                        {result} ‰
                    </motion.div>
                )}
            </div>
        </motion.form>
    );
};

export default App;
