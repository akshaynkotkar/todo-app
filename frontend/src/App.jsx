// import React, { useEffect, useState } from 'react';
// import { TodoList } from './components/TodoList';
// import { TodoInput } from './components/TodoInput';
// // import { Todo } from './types';
// import toast, { Toaster } from 'react-hot-toast';
// import { CheckCircle2 } from 'lucide-react';

// function App() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     const savedTodos = localStorage.getItem('todos');
//     if (savedTodos) {
//       setTodos(JSON.parse(savedTodos));
//     }
//   }, []);

//   // Check for expired tasks every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       let updated = false;

//       const updatedTodos = todos.map(todo => {
//         if (!todo.completed && new Date(todo.endTime) < now) {
//           updated = true;
//           return { ...todo, completed: true };
//         }
//         return todo;
//       });

//       if (updated) {
//         saveTodos(updatedTodos);
//         toast.success('Tasks have been automatically marked as completed');
//       }
//     }, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, [todos]);

//   const saveTodos = (newTodos) => {
//     localStorage.setItem('todos', JSON.stringify(newTodos));
//     setTodos(newTodos);
//   };

//   const addTodo = (title, startTime, endTime, priority) => {
//     const newTodo = {
//       id: crypto.randomUUID(),
//       title,
//       completed: false,
//       createdAt: new Date().toISOString(),
//       startTime,
//       endTime,
//       priority
//     };
//     const newTodos = [newTodo, ...todos];
//     saveTodos(newTodos);
//     toast.success('Todo added successfully');
//   };

//   const toggleTodo = (id, completed) => {
//     const newTodos = todos.map((todo) =>
//       todo.id === id ? { ...todo, completed } : todo
//     );
//     saveTodos(newTodos);
//     toast.success('Todo updated successfully');
//   };

//   const deleteTodo = (id) => {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     saveTodos(newTodos);
//     toast.success('Todo deleted successfully');
//   };

//   const completedTodos = todos.filter(todo => todo.completed).length;
//   const totalTodos = todos.length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8">
//       <div className="max-w-3xl mx-auto px-4">
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
//           <div className="flex flex-col items-center mb-8">
//             <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
//               <CheckCircle2 className="w-8 h-8 text-indigo-600" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
//             <p className="text-gray-600">
//               {totalTodos === 0 ? (
//                 "Let's get started!"
//               ) : (
//                 `Completed ${completedTodos} of ${totalTodos} tasks`
//               )}
//             </p>
//           </div>
//           <TodoInput onAdd={addTodo} />
//           <div className="mt-8">
//             {todos.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No todos yet. Add one above!</p>
//               </div>
//             ) : (
//               <TodoList
//                 todos={todos}
//                 onToggle={toggleTodo}
//                 onDelete={deleteTodo}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoInput } from './components/TodoInput';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Check for expired tasks every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        if (!todo.completed && new Date(todo.endTime) < now) {
          toggleTodo(todo._id, true);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = async (title, startTime, endTime, priority) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title,
        startTime,
        endTime,
        priority
      });
      setTodos([response.data, ...todos]);
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Failed to add todo');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/todos/${id}`, {
        completed
      });
      setTodos(todos.map((todo) =>
        todo._id === id ? response.data : todo
      ));
      toast.success('Todo updated successfully');
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo List</h1>
            <p className="text-gray-600">
              {totalTodos === 0 ? (
                "Let's get started!"
              ) : (
                `Completed ${completedTodos} of ${totalTodos} tasks`
              )}
            </p>
          </div>
          <TodoInput onAdd={addTodo} />
          <div className="mt-8">
            {todos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No todos yet. Add one above!</p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;