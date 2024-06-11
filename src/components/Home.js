import React, { useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useUnityContext } from 'react-unity-webgl';

const Unity = dynamic(() => import('react-unity-webgl').then(mod => mod.Unity), { ssr: false });

export default function Home() {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "buisnessSim/build/buisnessSim.loader.js",
    dataUrl: "buisnessSim/build/buisnessSim.data",
    frameworkUrl: "buisnessSim/build/buisnessSim.framework.js",
    codeUrl: "buisnessSim/build/buisnessSim.wasm",
  });

  useEffect(() => {
    // Fetch user info from API and save user ID in local storage
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/getUserInfo');
        const data = await response.json();
        if (data.user) {
          localStorage.setItem('userId', data.user.id);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  const sendUserID = useCallback(() => {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (userId) {
      sendMessage("OmniManager", "ReceiveUserID", userId);
    } else {
      console.error('User ID not found in local storage');
    }
  }, [sendMessage]);

  const getSaveGame = () => {
    sendUserID();
    handleSendSaveGameU2JS();
  };

  const handleSendSaveGameU2JS = () => {
    console.log('Sending save game data...');
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (userId) {
      sendMessage("OmniManager", "SendSaveGame");
    } else {
      console.error('User ID not found in local storage');
    }
  };

  const handleSendSaveGame = useCallback(async () => {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (userId) {
      try {
        const response = await fetch(`/api/getSaveGameData?userId=${userId}`);
        const saveGame = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch save game data');
        }

        sendMessage("OmniManager", "OmniReceiveSaveGame", JSON.stringify(saveGame));
        console.log('Save game data fetched and sent to Unity:', saveGame);
      } catch (error) {
        console.error('Error fetching save game data:', error);
      }
    } else {
      console.error('User ID not found in local storage');
    }
  }, [sendMessage]);

  const handleReceiveSaveGame = useCallback(async (event) => {
    const { userID, serializedData } = event.detail;
    const parsedData = JSON.parse(serializedData);

    const userId = parseInt(localStorage.getItem('userId'), 10);
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }

    try {
      const response = await fetch('/api/saveGameData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, saveData: parsedData }),
      });

      if (!response.ok) {
        throw new Error('Failed to save game data');
      }

      console.log('Game data saved successfully');
    } catch (error) {
      console.error('Error saving game data:', error);
    }
    console.log('Received save game data:', parsedData);
  }, []);

  useEffect(() => {
    const JSReceiveSaveGame = (event) => handleReceiveSaveGame(event);
    const JSSendSaveGame = () => handleSendSaveGame();

    window.addEventListener("JStoUnityUserID", sendUserID);
    window.addEventListener("JSReceiveSaveGame", JSReceiveSaveGame);
    window.addEventListener("JSSendSaveGame", JSSendSaveGame);

    return () => {
      window.removeEventListener("JStoUnityUserID", sendUserID);
      window.removeEventListener("JSReceiveSaveGame", JSReceiveSaveGame);
      window.removeEventListener("JSSendSaveGame", JSSendSaveGame);
    };
  }, [sendUserID, handleReceiveSaveGame, handleSendSaveGame]);

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

      {/* Container for the game */}
      <div className="mt-2 flex justify-center relative">
        <Unity unityProvider={unityProvider} style={{ width: "1000px", height: "600px" }} />
      </div>
    </div>
  );
}
