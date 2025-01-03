import React from 'react';

const HRLogo: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="50"
            viewBox="0 0 200 100"
            style={{ display: 'block'}}
        >
            {/* Background Gradient */}
            <defs>
                <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7152F3" />
                    <stop offset="100%" stopColor="#7152F3" />
                </linearGradient>
            </defs>
            <rect
                width="200"
                height="100"
                fill="url(#bgGradient)"
                rx="15"
                style={{ strokeWidth: 0 }}
            />
            {/* Border */}
            <rect
                x="2"
                y="2"
                width="196"
                height="96"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                rx="15"
            />
            {/* Text Styling */}
            <text
                x="50%"
                y="50%"
                fill="#fff"
                fontFamily="Arial, sans-serif"
                fontSize="48"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing="2"
            >
                LOGO
            </text>
        </svg>
    );
};

export default HRLogo;
