// import React from 'react';
// import { Check, Trash2, Clock } from 'lucide-react';

// export function TodoList({ todos, onToggle, onDelete }) {
//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'high':
//         return 'text-red-500 bg-red-50';
//       case 'medium':
//         return 'text-yellow-500 bg-yellow-50';
//       default:
//         return 'text-green-500 bg-green-50';
//     }
//   };

//   const formatDateTime = (dateStr) => {
//     return new Date(dateStr).toLocaleString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="space-y-3">
//       {todos.map((todo) => (
//         <div
//           key={todo.id}
//           className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl transition-all duration-200
//                      ${todo.completed 
//                        ? 'bg-green-50 border border-green-100' 
//                        : 'bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-sm'}`}
//         >
//           <div className="flex items-start space-x-4">
//             <button
//               onClick={() => onToggle(todo.id, !todo.completed)}
//               className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
//                 transition-colors duration-200 hover:scale-110 transform mt-1
//                 ${
//                   todo.completed
//                     ? 'bg-green-500 border-green-500 hover:bg-green-600'
//                     : 'border-gray-300 hover:border-indigo-500'
//                 }`}
//             >
//               {todo.completed && <Check className="w-4 h-4 text-white" />}
//             </button>
//             <div className="space-y-1">
//               <span
//                 className={`text-gray-800 transition-all duration-200 block
//                   ${todo.completed ? 'line-through text-gray-400' : ''}`}
//               >
//                 {todo.title}
//               </span>
//               <div className="flex flex-wrap gap-2 items-center text-sm">
//                 <span className="flex items-center text-gray-500">
//                   <Clock className="w-4 h-4 mr-1" />
//                   {formatDateTime(todo.startTime)} - {formatDateTime(todo.endTime)}
//                 </span>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
//                   {todo.priority}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={() => onDelete(todo.id)}
//             className="text-gray-400 hover:text-red-500 transition-colors duration-200
//                      sm:opacity-0 group-hover:opacity-100 transform hover:scale-110 mt-2 sm:mt-0"
//           >
//             <Trash2 className="w-5 h-5" />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default TodoList;
import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';

export function TodoList({ todos, onToggle, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      default:
        return 'text-green-500 bg-green-50';
    }
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleToggle = async (id, completed) => {
    try {
      await onToggle(id, completed);
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo._id} // Changed from todo.id to todo._id for MongoDB
          className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl transition-all duration-200
                     ${todo.completed 
                       ? 'bg-green-50 border border-green-100' 
                       : 'bg-white border border-gray-100 hover:border-indigo-100 hover:shadow-sm'}`}
        >
          <div className="flex items-start space-x-4">
            <button
              onClick={() => handleToggle(todo._id, !todo.completed)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                transition-colors duration-200 hover:scale-110 transform mt-1
                ${
                  todo.completed
                    ? 'bg-green-500 border-green-500 hover:bg-green-600'
                    : 'border-gray-300 hover:border-indigo-500'
                }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <div className="space-y-1">
              <span
                className={`text-gray-800 transition-all duration-200 block
                  ${todo.completed ? 'line-through text-gray-400' : ''}`}
              >
                {todo.title}
              </span>
              <div className="flex flex-wrap gap-2 items-center text-sm">
                <span className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatDateTime(todo.startTime)} - {formatDateTime(todo.endTime)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                  {todo.priority}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleDelete(todo._id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200
                     sm:opacity-0 group-hover:opacity-100 transform hover:scale-110 mt-2 sm:mt-0"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;