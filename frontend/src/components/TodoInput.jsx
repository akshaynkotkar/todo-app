// import React, { useState } from 'react';
// import { Plus, AlertCircle } from 'lucide-react';

// export function TodoInput({ onAdd }) {
//   const [title, setTitle] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [priority, setPriority] = useState('medium');
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};

//     if (!title.trim()) {
//       newErrors.title = 'Title is required';
//     } else if (title.length < 3) {
//       newErrors.title = 'Title must be at least 3 characters';
//     }

//     if (!startTime) {
//       newErrors.startTime = 'Start time is required';
//     }

//     if (!endTime) {
//       newErrors.endTime = 'End time is required';
//     } else if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
//       newErrors.endTime = 'End time must be after start time';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       onAdd(title.trim(), startTime, endTime, priority);
//       setTitle('');
//       setStartTime('');
//       setEndTime('');
//       setPriority('medium');
//       setErrors({});
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Add a new task..."
//           className={`w-full px-6 py-4 bg-white rounded-xl border ${
//             errors.title ? 'border-red-300' : 'border-gray-200'
//           } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
//           placeholder-gray-400 transition-all duration-200`}
//         />
//         {errors.title && (
//           <div className="flex items-center space-x-1 text-red-500 text-sm">
//             <AlertCircle className="w-4 h-4" />
//             <span>{errors.title}</span>
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Start Time</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className={`w-full px-4 py-2 bg-white rounded-lg border ${
//               errors.startTime ? 'border-red-300' : 'border-gray-200'
//             } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//             min={new Date().toISOString().slice(0, 16)}
//           />
//           {errors.startTime && (
//             <div className="flex items-center space-x-1 text-red-500 text-sm">
//               <AlertCircle className="w-4 h-4" />
//               <span>{errors.startTime}</span>
//             </div>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">End Time</label>
//           <input
//             type="datetime-local"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className={`w-full px-4 py-2 bg-white rounded-lg border ${
//               errors.endTime ? 'border-red-300' : 'border-gray-200'
//             } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//             min={startTime || new Date().toISOString().slice(0, 16)}
//           />
//           {errors.endTime && (
//             <div className="flex items-center space-x-1 text-red-500 text-sm">
//               <AlertCircle className="w-4 h-4" />
//               <span>{errors.endTime}</span>
//             </div>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Priority</label>
//           <select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 
//                  transition-colors flex items-center justify-center space-x-2
//                  shadow-sm hover:shadow-md active:scale-98 transform duration-200"
//       >
//         <Plus className="w-5 h-5" />
//         <span>Add Task</span>
//       </button>
//     </form>
//   );
// }

// export default TodoInput;
import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

export function TodoInput({ onAdd }) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!endTime) {
      newErrors.endTime = 'End time is required';
    } else if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (validateForm()) {
        await onAdd(title.trim(), startTime, endTime, priority);
        setTitle('');
        setStartTime('');
        setEndTime('');
        setPriority('medium');
        setErrors({});
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to add todo. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          disabled={isSubmitting}
          className={`w-full px-6 py-4 bg-white rounded-xl border ${
            errors.title ? 'border-red-300' : 'border-gray-200'
          } shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          placeholder-gray-400 transition-all duration-200 ${isSubmitting ? 'opacity-50' : ''}`}
        />
        {errors.title && (
          <div className="flex items-center space-x-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.title}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-white rounded-lg border ${
              errors.startTime ? 'border-red-300' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50' : ''}`}
            min={new Date().toISOString().slice(0, 16)}
          />
          {errors.startTime && (
            <div className="flex items-center space-x-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.startTime}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-white rounded-lg border ${
              errors.endTime ? 'border-red-300' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50' : ''}`}
            min={startTime || new Date().toISOString().slice(0, 16)}
          />
          {errors.endTime && (
            <div className="flex items-center space-x-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.endTime}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-white rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50' : ''}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {errors.submit && (
        <div className="flex items-center space-x-1 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{errors.submit}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 bg-indigo-600 text-white rounded-xl 
                   hover:bg-indigo-700 transition-colors flex items-center 
                   justify-center space-x-2 shadow-sm hover:shadow-md 
                   active:scale-98 transform duration-200
                   ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Plus className="w-5 h-5" />
        <span>{isSubmitting ? 'Adding...' : 'Add Task'}</span>
      </button>
    </form>
  );
}

export default TodoInput;
