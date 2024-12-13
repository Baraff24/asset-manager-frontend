import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Slide {
    image: string;
    title: string;
    description: string;
    cta?: {
        label: string;
        link: string;
    };
}

interface HeroSliderProps {
    slides: Slide[];
    interval?: number; // in milliseconds, default 3000ms
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [slides, interval]);

    const goToPreviousSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.image}
                    className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        {slide.title}
                    </h1>
                    <p className="text-lg mb-6 max-w-xl text-white">
                        {slide.description}
                    </p>
                    {slide.cta && (
                        <Link
                            to={slide.cta.link}
                            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition"
                        >
                            {slide.cta.label}
                        </Link>
                    )}
                </div>
            ))}

            {/* Indicators (optional) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex ? "bg-white" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>

            {/* Arrow buttons */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
                onClick={goToPreviousSlide}
                aria-label="Previous slide"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
                onClick={goToNextSlide}
                aria-label="Next slide"
            >
                <FaChevronRight size={20} />
            </button>
        </div>
    );
};

export default HeroSlider;