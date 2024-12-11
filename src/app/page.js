"use client"
import { useState } from "react";
import Cell from "@/app/index/cell";
import { predict } from "@/app/index/model";
import BigButton from "./button";
import Link from "next/link";
import Image from 'next/image';


export default function Home() {
    const [cellState, setCellStates] = useState(Array(784).fill(0));
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [predicted, setPredicted] = useState(null);
    const [predictionColor, setPredictionColor] = useState("text-black");

    const handleMouseDown = (e, index) => {
        e.preventDefault();
        setIsMouseDown(true);
        updateCellStates(index);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleCellHover = (index) => {
        if (isMouseDown) {
            updateCellStates(index);
        }
    };

    const updateCellStates = (index) => {
        setCellStates(prevCells => {
            const newCells = [...prevCells];
            newCells[index] = Math.min(newCells[index] + 1, 1);

            let left = index - 1;
            let right = index + 1;
            let up = index - 28;
            let down = index + 28;

            if (index % 28 !== 0) // left valid
                newCells[left] = Math.min(newCells[left] + 0.5, 1);

            if (right % 28 !== 0) // right valid
                newCells[right] = Math.min(newCells[right] + 0.5, 1);

            if (up >= 0) // up valid
                newCells[up] = Math.min(newCells[up] + 0.5, 1);
        
            if (down < 784) // down valid
                newCells[down] = Math.min(newCells[down] + 0.5, 1);

            return newCells;
        });
    }


    const handlePredict = async () => {
        const prediction = await predict(cellState);
        setPredicted(prediction);
        setPredictionColor("text-slate-200");
        setTimeout(() => {
            setPredictionColor("text-black transition-colors duration-1000 ease-out");
        }, 100);
    };


    const handleClear = () => {
        setCellStates(Array(784).fill(0));
    }

    
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row">
                <div className="text-7xl font-bold mt-12 mr-8">
                    the-number-is
                </div>
                <div className={`text-9xl font-bold self-center ${predictionColor} mt-5 ml-8`}>
                    {predicted !== null ? predicted : "?"}
                </div>
            </div>
            <div className="flex items-start justify-start content-start">
                <div
                    className="grid grid-cols-28 grid-rows-28 gap-x-0 gap-y-0 mt-10"
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {cellState.map((value, index) => (
                        <Cell
                            key={index}
                            value={value}
                            onMouseEnter={() => handleCellHover(index)}
                            onMouseDown={(e) => handleMouseDown(e, index)}
                        />
                    ))}
                </div>
                <div className="flex flex-col mt-10 ml-5">
                    <div className="mb-5">
                        <BigButton onClick={handlePredict} text="Predict" />
                    </div>
                    <div className="mb-5">
                        <BigButton onClick={handleClear} text="Clear" />
                    </div>
                </div>
            </div>
            <div className="m-10">
                <Link href={"https://github.com/vicenteCordero/the-number-is"}>
                    <Image
                        src="/github-142-svgrepo-com.svg"
                        width={80}
                        height={80}
                        alt="Github repo"
                    />
                </Link>
            </div>
        </div>
    );
}