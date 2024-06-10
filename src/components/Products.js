import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  {
    name: 'Market research module',
    digitalService: 'Market research and benchmarking',
    description: 'The Market Research Module will permit you to research potential market for your new developed product, adding Rockwell’s Market Research and Benchmarking Plan will help you identify opportunities, market practices and areas of improvement of your product, overall making your benchmarking plan a total success.',
    cost: '100 coins, service 50 coins',
    production: '50 per month',
    range: '-2% to 2% (default) 0% to 5% (upgrade)',
    images: ['../images/product1.png']
  },
  {
    name: 'Innovation research module',
    digitalService: 'Innovation management consulting',
    description: 'The Innovation Research Module will make your product more innovative, meaning that it will be more appealing to the customers. Adding a Rockwell service will improve your innovation team by giving them an Innovation management consultant, improving the appeal to your product even more!',
    cost: '200 coins, service 110 coins',
    production: '80 per month',
    range: '-3% to 3% (default) -1% to 7% (upgrade)',
    images: ['../images/product2.png']
  },
  {
    name: 'Product design module',
    digitalService: 'Digital Product design using simulations',
    description: 'The Product Design Module will upgrade the design of your product making it more attractive to the customers. Adding Rockwell ‘s digital service will improve its design by using CAD and simulations! Making your product really appealing to the customers!',
    cost: '350 coins, service 200 coins',
    production: '150 per month',
    range: '-2% to 2% (default) 0% to 3% (upgrade) ',
    images: ['../images/product3.png']
  },
  {
    name: 'Product development plan module',
    digitalService: 'Product lifecycle intelligence',
    description: 'The Product Development Plan Module will help your employees develop a life cycle for your product, helping you improve your sales. Adding a Rockwell lifecicle intelligence program will make your plan even better, determining your adverticing schedules, price points, and even the expansion to new markets! This will improve your planning and income!',
    cost: '380 coins, service 220 coins',
    production: '180 per month',
    range: '-3% to 1% (default) -2% to 4% (upgrade)',
    images: ['../images/product4.png']
  },
  {
    name: 'Advanced computing module ',
    digitalService: 'Process and production planning',
    description: 'The Computing Module will improve the overall development and efficiency of the employees. Adding Rockwell’s Simulation method will let the employees simulate the production, planning, and design, of your product, improving the quality of the product and your income!',
    cost: '500 coins, service 300 coins',
    production: '280 per month',
    range: '-4% to 3% (default) -3% to 8% (upgrade) ',
    images: ['../images/product5.png']
  },
  {
    name: 'VR training kit',
    digitalService: 'Virtual reality training',
    description: 'Rockwell Automations VR Training Kit enhances employee training by simulating real-world scenarios, ideal for safely teaching complex machinery operations in shoe factories. Adding the digital service leads to improved safety and productivity.',
    cost: '700 coins, service 350 coins',
    production: '360 per month',
    range: '-10% to 10% (default) -5% to 20% (upgrade)',
    images: ['../images/product6.png']
  },
  {
    name: 'Production line and management equipment (Robotic arm, pallet car, storage racks, shoe processing machine)',
    digitalService: 'Production line monitoring and traceability',
    description: 'The equipment, including robotic arms , pallets cars, storage racks and shoe processing machines, is enhanced with monitoring and traceability services, therefore adding the digital service offers real-time data tracking and analytics to optimize efficiency and quality control.',
    cost: '1000 coins, service 550 coins',
    production: '450 per month',
    range: '-7% to 5% (default) -5% to 15% (upgrade)',
    images: ['../images/product7(1).png', '../images/product7(2).png', '../images/product7(3).png', '../images/product7(4).png']
  },
  {
    name: 'Reparation and machine maintenance kit',
    digitalService: 'Predictive maintenance on factory assets to prevent production downtime',
    description: 'The Reparation and Machine Maintenance Kit benefits from predictive maintenance services, using advanced analytics to forecast and prevent equipment failures, thus adding the digital service minimizes downtime and ensures smooth operations.',
    cost: '850 coins, service 400 coins',
    production: '400 per month',
    range: '-15% to 10% (default) -7% to 25% (upgrade) ',
    images: ['../images/product8.png']
  },
  {
    name: 'Machine vision scan machine',
    digitalService: 'Quality inspections and alerts using machine vision and AI',
    description: 'The Machine Vision Scan Machine, enhanced with AI-powered quality inspections, automates defect detection and improves product quality, adding the digital service ensures high-precision inspections and increased production efficiency. To avoid possible production costs from machine malfunctioning. ',
    cost: '2000 coins, service 1000 coins',
    production: '750 per month',
    range: '-20% to 10% (default) -5% to 30% (upgrade)',
    images: ['../images/product9.png']
  },
  {
    name: 'Product management and supply chain buildings (Product distribution facility, storage facility, product customer support facility, public management facility)',
    digitalService: 'Supply chain management software consulting',
    description: 'Rockwell Automation optimizes product management and supply chains with advanced facilities and services. The Product Distribution Facility ensures timely deliveries and reduces bottlenecks, while the Storage Facility provides secure, real-time inventory management for efficient operations. The Product Customer Support Facility enhances satisfaction with comprehensive support services, and the Public Management Facility oversees large-scale public projects efficiently. Additionally, their Supply Chain Management Software Consulting helps businesses implement advanced solutions, improving efficiency and reducing costs through data analytics and automation. These integrated offerings ensure comprehensive supply chain and product management optimization.',
    cost: '3000 coins, service 1800 coins',
    production: '1400 per month',
    range: '-30% to 40% (default) -15% to 60% (upgrade)',
    images: ['../images/product10(3).png', '../images/product10(2).png', '../images/product10(1).png', '../images/product10(4).png']
  },
  {
    name: 'Sustainable development facility',
    digitalService: 'Sustainability',
    description: 'The Sustainable Development Facility is dedicated to promoting environmentally friendly practices in production and operations. It focuses on reducing waste, conserving energy, and implementing sustainable technologies. This facility supports Rockwell Automations commitment to sustainability and helps clients achieve their environmental goals. Adding the digital service ensures that lifecycle assessments, eco-design strategies, and sustainability reporting are done which reduce environmental impact.',
    cost: '4000 coins, service 2200 coins',
    production: '1750 per month',
    range: '-45% to 50% (default) -25% to 80% (upgrade)',
    images: ['../images/product11.png']
  },
];

const animationSettings = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: 'auto' },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

export default function Products() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleLearnMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-gray-800 text-5xl font-bold mb-4">Discover Our Products</h1>
        <p className="text-gray-600 text-lg">Explore our wide range of products designed to enhance your business operations and efficiency.</p>
      </div>
      <div className="space-y-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 flex flex-col space-y-2 md:w-1/3">
                <img src={product.images[0]} alt={product.name} className="w-48 h-auto object-cover rounded-md mx-auto" />
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div {...animationSettings} className="grid grid-cols-1 gap-2 mt-4">
                      {product.images.slice(1).map((image, imgIndex) => (
                        <img key={imgIndex} src={image} alt={product.name} className="w-48 h-auto object-cover rounded-md mx-auto" />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="p-6 flex-1">
                <h2 className="text-gray-800 text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2"><strong>Associated digital service:</strong> {product.digitalService}</p>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div {...animationSettings}>
                      <p className="text-gray-600 mb-2"><strong>Description:</strong> {product.description}</p>
                      <p className="text-gray-600 mb-2"><strong>Cost:</strong> {product.cost}</p>
                      <p className="text-gray-600 mb-2"><strong>Base production:</strong> {product.production}</p>
                      <p className="text-gray-600 mb-2"><strong>Range:</strong> {product.range}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => handleLearnMore(index)}
                  className="mt-4 text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                >
                  {expandedIndex === index ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}