import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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
          >
            <span className="text-lg text-primary-600 font-medium mb-2 inline-block">👋 Hello</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              I'm Samarth Patel
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-700 mb-8">
              Web Developer | App Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-600 leading-relaxed mb-6">
              I'm a passionate web developer and engineering student who loves building innovative web applications. 
              My expertise lies in front-end and back-end development, working with modern technologies to create 
              seamless user experiences.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I enjoy learning new technologies, optimizing web performance, and Now i start learning the Flutter to builds mobile apps.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              On this website, you'll find my latest projects on web development, App development. 
              and software engineering. Feel free to connect with me and explore my work!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8"
          >
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Learn more about me
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;