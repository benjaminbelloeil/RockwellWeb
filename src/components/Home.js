// Home.js
import React, { useState } from 'react';
import UnityGameComponent from './UnityGameComponent';

export default function Home() {
  const [gameVersion, setGameVersion] = useState('vertical'); // Default to vertical version

  const toggleGameVersion = () => {
    setGameVersion((prevVersion) => (prevVersion === 'vertical' ? 'horizontal' : 'vertical'));
  };

  return (
    <div className="p-6">
      <h1 className="text-gray-700 text-4xl mb-8 font-bold">Welcome to the Game Dashboard!</h1>
      
      <p className="text-gray-600 text-lg mb-8">
        Dive into an immersive gaming experience. Explore, play, and manage your game right from this dashboard.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Latest Updates</h2>
          <p className="text-gray-600">Stay up-to-date with the latest patches and updates.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Community</h2>
          <p className="text-gray-600">Join the community discussions and connect with other players.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Achievements</h2>
          <p className="text-gray-600">Track your progress and showcase your achievements.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-700 text-2xl font-bold mb-2">Support</h2>
          <p className="text-gray-600">Need help? Access our support resources and get assistance.</p>
        </div>
      </div>

      {/* Container for the game and button */}
      <div className="mt-2 flex justify-center relative">
        <UnityGameComponent version={gameVersion} />
        {/* Add button to switch between game versions */}
        <button
          onClick={toggleGameVersion}
          className="absolute top-0 left-0 m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Switch to {gameVersion === 'vertical' ? 'Horizontal' : 'Vertical'} Version
        </button>
      </div>
    </div>
  );
}
