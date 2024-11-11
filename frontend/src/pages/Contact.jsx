import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Contact Us</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
              <input type="text" id="name" className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" className="border border-gray-300 rounded-md p-2 w-full focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
              <textarea id="message" className="border border-gray-300 rounded-md p-2 w-full h-24 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;


