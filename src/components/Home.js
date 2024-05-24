export default function Home() {
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
    </div>
  );
}
