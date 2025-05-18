import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utilis/constant';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const TaskBoard = ({ setPage, data, totalTasks, limit, page, refetchTasks}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalTasks / limit);

  const [columns, setColumns] = useState({
    High: [],
    Medium: [],
    Low: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null); // { id, priority }

  const priorities = {
    High: 'bg-red-100 border-red-400',
    Medium: 'bg-yellow-100 border-yellow-400',
    Low: 'bg-green-100 border-green-400'
  };

  const onDragStart = (e, taskId, sourcePriority) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourcePriority', sourcePriority);
  };

  const onDrop = async (e, targetPriority) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourcePriority = e.dataTransfer.getData('sourcePriority');

    if (sourcePriority === targetPriority) return;

    const taskToMove = columns[sourcePriority].find(task => task._id === taskId);
    const newSource = columns[sourcePriority].filter(task => task._id !== taskId);
    const newTarget = [...columns[targetPriority], { ...taskToMove, priority: targetPriority }];

    setColumns({
      ...columns,
      [sourcePriority]: newSource,
      [targetPriority]: newTarget
    });

    try {
      await axios.patch(
        `${BASE_URL}/api/task/admin/update-task/${taskId}`,
        { priority: targetPriority },
        { withCredentials: true }
      );
      toast.success("Priority updated");
    } catch (err) {
      toast.error("Failed to update task priority");
      setColumns({
        ...columns,
        [sourcePriority]: [...newSource, taskToMove],
        [targetPriority]: columns[targetPriority].filter(task => task._id !== taskId),
      });
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setColumns({
      High: data.filter(task => task.priority === 'High'),
      Medium: data.filter(task => task.priority === 'Medium'),
      Low: data.filter(task => task.priority === 'Low'),
    });
  }, [data]);

  const handleTaskItem = (id) => {
    navigate(`/task-edit/${id}`);
  };

  const confirmDeleteTask = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/task/admin/delet-task/${taskToDelete.id}`, {
        withCredentials: true,
      });

      toast.success("Task deleted successfully");

      // Refetch from API instead of updating local state
      refetchTasks();

      setShowModal(false);
      setTaskToDelete(null);
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      {/* Modal */}
      {showModal && (
   <div className="fixed inset-0 z-50 bg-opacity-80 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setTaskToDelete(null);
                }}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTask}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Columns */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(columns).map(([priority, tasks]) => (
          <div
            key={priority}
            onDrop={(e) => onDrop(e, priority)}
            onDragOver={onDragOver}
            className={`p-4 rounded-lg border-2 min-h-[300px] ${priorities[priority]}`}
          >
            <h2 className="text-xl font-bold capitalize mb-4">{priority} Priority</h2>
            {tasks.map(task => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => onDragStart(e, task._id, priority)}
                className="bg-white p-3 rounded shadow mb-2 cursor-move flex justify-between"
                onClick={() => handleTaskItem(task._id)}
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <MdDelete
                    size={30}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskToDelete({ id: task._id, priority });
                      setShowModal(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-sm">Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskBoard;
