import React from 'react';

const UnityGameComponent = () => {
  return (
    <div>
      <iframe
        title="Unity Game"
        src="unity-game/index.html"
        width="1050"
        height="750"
        allowFullScreen={true}
        frameBorder="0"
      />
    </div>
  );
};

export default UnityGameComponent;
