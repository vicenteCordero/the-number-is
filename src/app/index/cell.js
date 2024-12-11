"use client"
import { useState, useSyncExternalStore } from "react"


export default function Cell({ value, onMouseEnter, onMouseDown }) {
    let color = "bg-black";
    if (value === 0.5) {
        color = "bg-neutral-700";
    } else if (value === 1) {
        color = "bg-white";
    }
    
    return (
        <div
            className={`${color} w-5 h-5`}
            onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}
        />
    );
}