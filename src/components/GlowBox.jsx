import React from 'react';
import grainTexture from 'src/images/effects/grain.png'; 

const creamColor = '#f0e5d6'; 
const glowBox = () => {
  const boxStyle = {
    width: '200px',
    height: '100px',
    backgroundColor: creamColor,
    boxShadow: '10px 0 15px -5px rgba(240, 229, 214, 0.8)', // Right directional glow
    position: 'relative',
    overflow: 'hidden',
  };

  const textureOverlayStyle = {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${grainTexture})`,
    backgroundSize: 'cover',
    mixBlendMode: 'multiply',
  };

  return (
    <div style={boxStyle}>
      <div style={textureOverlayStyle}></div>
    </div>
  );
};