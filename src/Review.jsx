// App.js
import React from 'react';

function App(props) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments</h1>
      <div className="space-y-4">
        {props.comments.map((comment, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center"
          >
            {/* User Image */}
            <img
              src={comment.image}
              alt={comment.username}
              className="w-12 h-12 rounded-full mr-4 mb-2 md:mb-0"
            />
            {/* Comment Content */}
            <div className="flex flex-col">
              <span className="font-bold text-lg">{comment.username}</span>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
