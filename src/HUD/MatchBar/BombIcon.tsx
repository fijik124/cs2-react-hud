import React from 'react';

interface BombIconProps {
  className?: string;
  size?: number;
  fillProgress?: number; // 0-100, for planting animation
  defuseProgress?: number; // 0-100, for defusing animation
}

const BombIcon: React.FC<BombIconProps> = ({ className = '', size = 48, fillProgress = 100, defuseProgress = 0 }) => {
  const fillHeight = (fillProgress / 100) * 38; // 38 is the height of the main body
  const isDefusing = defuseProgress > 0;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Clip path for the fill animation */}
        <clipPath id={`bombFillClip-${size}`}>
          <rect 
            x="14" 
            y={54 - fillHeight} 
            width="36" 
            height={fillHeight}
          />
        </clipPath>
      </defs>
      
      {/* Wires/Cables */}
      <path
        d="M20 12 L18 8 M28 12 L28 6 M36 12 L38 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={fillProgress >= 95 ? 1 : 0.3}
      />
      
      {/* Main C4 Body Outline (always visible) */}
      <rect
        x="14"
        y="16"
        width="36"
        height="38"
        rx="3"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Main C4 Body Fill (fills from bottom to top) */}
      <rect
        x="14"
        y="16"
        width="36"
        height="38"
        rx="3"
        fill="white"
        clipPath={`url(#bombFillClip-${size})`}
      />
      
      {/* Top Panel Detail */}
      <rect
        x="16"
        y="18"
        width="32"
        height="8"
        rx="1"
        fill="#0a0a0a"
        opacity="0.2"
        clipPath={`url(#bombFillClip-${size})`}
      />
      
      {/* Display Screen */}
      <rect
        x="20"
        y="28"
        width="24"
        height="10"
        rx="1"
        stroke="white"
        strokeWidth="1"
        fill={fillProgress >= 60 ? "#0a0a0a" : "none"}
        opacity={fillProgress >= 60 ? 0.3 : 0.3}
      />
      
      {/* Screen Lines (digital display) */}
      <line x1="24" y1="31" x2="40" y2="31" stroke="white" strokeWidth="0.5" opacity={fillProgress >= 60 ? 0.4 : 0.2} />
      <line x1="24" y1="33.5" x2="40" y2="33.5" stroke="white" strokeWidth="0.5" opacity={fillProgress >= 60 ? 0.4 : 0.2} />
      <line x1="24" y1="36" x2="40" y2="36" stroke="white" strokeWidth="0.5" opacity={fillProgress >= 60 ? 0.4 : 0.2} />
      
      {/* Side Panels/Straps */}
      <rect x="14" y="40" width="36" height="3" fill="white" opacity="0.2" clipPath={`url(#bombFillClip-${size})`} />
      <rect x="14" y="48" width="36" height="3" fill="white" opacity="0.2" clipPath={`url(#bombFillClip-${size})`} />
      
      {/* Blinking LED (only when filled) */}
      {fillProgress >= 95 && (
        <circle cx="42" cy="22" r="2" fill="#ff0000">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      
      {/* Buttons/Pins */}
      <circle cx="22" cy="22" r="1.5" fill="white" opacity={fillProgress >= 85 ? 0.3 : 0.15} />
      <circle cx="28" cy="22" r="1.5" fill="white" opacity={fillProgress >= 85 ? 0.3 : 0.15} />
      <circle cx="34" cy="22" r="1.5" fill="white" opacity={fillProgress >= 85 ? 0.3 : 0.15} />
      
      {/* Corner Details */}
      <circle cx="18" cy="20" r="1" fill="white" opacity={fillProgress >= 90 ? 0.2 : 0.1} />
      <circle cx="46" cy="20" r="1" fill="white" opacity={fillProgress >= 90 ? 0.2 : 0.1} />
      <circle cx="18" cy="50" r="1" fill="white" opacity={fillProgress >= 20 ? 0.2 : 0.1} />
      <circle cx="46" cy="50" r="1" fill="white" opacity={fillProgress >= 20 ? 0.2 : 0.1} />
      
      {/* Bottom Edge Detail */}
      <line x1="18" y1="53" x2="46" y2="53" stroke="white" strokeWidth="1" opacity={fillProgress >= 10 ? 0.15 : 0.05} />
      
      {/* Defuse Progress Overlay */}
      {isDefusing && (
        <>
          {/* Defuse progress bar (top to bottom) */}
          <rect
            x="14"
            y="16"
            width="36"
            height={(defuseProgress / 100) * 38}
            fill="#28abff"
            opacity="0.4"
            rx="3"
          />
          
          {/* Cutting line effect */}
          <line 
            x1="14" 
            y1={16 + (defuseProgress / 100) * 38} 
            x2="50" 
            y2={16 + (defuseProgress / 100) * 38}
            stroke="#28abff"
            strokeWidth="2"
            opacity="0.9"
          >
            <animate
              attributeName="opacity"
              values="0.9;1;0.9"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </line>
          
          {/* Sparks effect at cutting line */}
          <circle 
            cx="20" 
            cy={16 + (defuseProgress / 100) * 38} 
            r="1.5" 
            fill="#5cc5ff"
          >
            <animate
              attributeName="r"
              values="1;2;1"
              dur="0.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle 
            cx="32" 
            cy={16 + (defuseProgress / 100) * 38} 
            r="1.5" 
            fill="#5cc5ff"
          >
            <animate
              attributeName="r"
              values="1.5;2.5;1.5"
              dur="0.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle 
            cx="44" 
            cy={16 + (defuseProgress / 100) * 38} 
            r="1.5" 
            fill="#5cc5ff"
          >
            <animate
              attributeName="r"
              values="1;2;1"
              dur="0.35s"
              repeatCount="indefinite"
            />
          </circle>
        </>
      )}
    </svg>
  );
};

export default BombIcon;
