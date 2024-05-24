// Products.js
import Layout from "./Layout";

export default function Products() {
  return (
    <div className="p-6">
      <h1 className="text-gray-800 text-4xl mb-8 font-bold">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product 1 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/product1.jpg" alt="Product 1" className="w-full h-60 object-cover" />
          <div className="p-6">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Product 1</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula est vitae dui dapibus, vitae tempor ipsum lacinia.</p>
            <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 mt-4 rounded-full focus:outline-none focus:shadow-outline">View Details</button>
          </div>
        </div>

        {/* Product 2 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/product2.jpg" alt="Product 2" className="w-full h-60 object-cover" />
          <div className="p-6">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Product 2</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula est vitae dui dapibus, vitae tempor ipsum lacinia.</p>
            <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 mt-4 rounded-full focus:outline-none focus:shadow-outline">View Details</button>
          </div>
        </div>

        {/* Product 3 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="/product3.jpg" alt="Product 3" className="w-full h-60 object-cover" />
          <div className="p-6">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Product 3</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula est vitae dui dapibus, vitae tempor ipsum lacinia.</p>
            <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 mt-4 rounded-full focus:outline-none focus:shadow-outline">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}
