"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function Home() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  function handleClick() {
    if (isRunning) {
      setCount(count + 1);
    } else {
      setIsRunning(true);
      setCount(count + 1);
      startTest(time);
    }
  }

  function startTest(time: number) {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setIntervalId(null);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(interval);
  }

    return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl mb-2" style={{ fontFamily: "Darlington" }}>
            Click Test
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {time}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Temps restant
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {count}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              Clics
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 font-medium py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            onPress={handleClick}
            isDisabled={time === 0}
          >
            {isRunning ? 'Keep going!' : 'Start Test'}
          </Button>
          
          <Button 
            className="flex-1 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 font-medium py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            onPress={() => {
              if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
              }
              setIsRunning(false);
              setCount(0);
              setTime(10);
            }}
          >
            Reset
          </Button>
        </div>

        {/* Progress Bar */}
        {isRunning && (
          <div className="mb-6">
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(time / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Results */}
        {time === 0 && count > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-800 dark:text-green-200 mb-1">
                Test finished!
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">
                {count / 10} clicks per second !
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
