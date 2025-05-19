import React from 'react';
import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto py-16 md:py-24">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">About Me</h1>
            <h2 className="text-xl md:text-2xl font-medium text-primary-600 mb-6">Samarth Patel</h2>
            
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                alert('Resume download functionality would be implemented here');
              }}
            >
              <FileDown size={16} />
              📄 Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">👋 Hello, I'm Samarth Patel</h3>
              <p className="text-gray-700 font-medium mb-6">Web Developer | App Developer | DevOps Learner</p>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  My expertise includes front-end and back-end development, working with React, Express.js, Node.js, 
                  and more. I focus on delivering seamless user experiences and high-performance applications.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  I'm also diving into Flutter, Dart, and FireBase to build the Mobile Apps.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Let's connect and build something amazing together!
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 md:p-8 border border-primary-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900">React.js</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900">Node.js</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900">Express.js</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900">TypeScript</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900">Tailwind CSS</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-900">Flutter</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;