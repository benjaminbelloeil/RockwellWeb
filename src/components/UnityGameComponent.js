// UnityGameComponent.js
import React from 'react';

const UnityGameComponent = ({ version }) => {
  const srcUrl = version === 'horizontal' ? 'unity-game-Horizontal/index.html' : 'unity-game-Horizontal/index.html';

  return (
    <div>
      <iframe
        title="Unity Game"
        src={srcUrl}
        width="1050"
        height="750"
        allowFullScreen={true}
        frameBorder="0"
      />
    </div>
  );
};

export default UnityGameComponent;
