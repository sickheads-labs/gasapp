// src/components/Slider.jsx
'use client';
import React, { useState } from 'react';
//import { ChevronLeft, ChevronRight } from 'lucide-react'; // You may need to install a react icon library like lucide-react

const Slider = ({ slides }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        // Loop back to the last slide if at the beginning
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        // Loop back to the first slide if at the end
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        // Main container
        <div className="max-w-4xl h-96 w-full m-auto py-4 relative group">
            {/* Slide Image/Content Area */}
            <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            >{slides[currentIndex].title}</div>

            {/* Left Arrow (Hidden by default, visible on hover) */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <button onClick={prevSlide}>{'<'}</button>
            </div>

            {/* Right Arrow (Hidden by default, visible on hover) */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <button onClick={nextSlide}>{'>'}</button>
            </div>

            {/* Slide Indicators (dots) */}
            <div className="flex top-4 justify-center py-2">
                {slides.map((slide: any, slideIndex: any) => (
                    <div
                        key={slideIndex}
                        onClick={() => setCurrentIndex(slideIndex)}
                        className={`cursor-pointer w-3 h-3 mx-1 rounded-full ${currentIndex === slideIndex ? 'bg-black' : 'bg-gray-400'
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default function Page() {
    const slides = [
        { url: 'images.unsplash.com', title: 'Beach' },
        { url: 'images.unsplash.com', title: 'Forest' },
        { url: 'images.unsplash.com', title: 'Mountain' },
    ];
    return (
        <div className="App flex justify-center items-center h-screen bg-gray-100">
            <Slider slides={slides} />
        </div>
    );
}
