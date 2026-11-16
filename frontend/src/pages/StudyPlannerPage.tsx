import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { campusApi } from '../services/api';
import { StudyTask } from '../types';

export const StudyPlannerPage: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await campusApi.getStudyTasks();
      setTasks(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    try {
      const newTask = await campusApi.createStudyTask({
        title,
        subject,
        deadline: deadline || 'Tomorrow 5:00 PM',
        estimatedHours,
        priority,
      });

      setTasks((prev) => [newTask, ...prev]);
      setTitle('');
      setSubject('');
      setDeadline('');
      setFormOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleComplete = async (task: StudyTask) => {
    try {
      const updated = await campusApi.updateStudyTask(task.id, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await campusApi.deleteStudyTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (e) {
      console.error(e);
    }
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="academic-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#315B85] mb-1">
              <Calendar className="w-4 h-4" />
              <span>ACADEMIC TIMETABLE & DEADLINE PLANNER</span>
            </div>
            <h2 className="text-base font-semibold text-[#202938]">Course Deadlines & Study Schedule</h2>
            <p className="text-xs text-[#687386] mt-0.5">
              Organize upcoming assignment submissions, seminar rehearsals, and exam revision milestones.
            </p>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            className="academic-btn-primary text-xs flex items-center space-x-1.5 py-2 px-3 self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{formOpen ? 'Cancel' : 'Add Study Deadline'}</span>
          </button>
        </div>

        {/* Task Form Drawer */}
        {formOpen && (
          <form onSubmit={handleCreateTask} className="mt-4 pt-4 border-t border-[#E5E9EF] text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-medium text-[#202938] mb-1">Task Title / Assignment</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Solve Normalization Problem Set 3"
                  className="academic-input w-full"
                />
              </div>

              <div>
                <label className="block font-medium text-[#202938] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. DBMS"
                  className="academic-input w-full"
                />
              </div>

              <div>
                <label className="block font-medium text-[#202938] mb-1">Deadline Date/Time</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="e.g. Thursday, 11:59 PM"
                  className="academic-input w-full"
                />
              </div>

              <div>
                <label className="block font-medium text-[#202938] mb-1">Estimated Hours</label>
                <input
                  type="number"
                  min={1}
                  max={24}
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="academic-input w-full"
                />
              </div>

              <div>
                <label className="block font-medium text-[#202938] mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="academic-input w-full"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="academic-btn-primary text-xs w-full py-2 flex items-center justify-center space-x-1.5"
                >
                  <span>Save Assignment to Timetable</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="academic-card p-3.5">
          <div className="text-[11px] text-[#687386]">Pending Deliverables</div>
          <div className="text-xl font-bold text-[#202938] mt-1">{pendingCount}</div>
        </div>
        <div className="academic-card p-3.5">
          <div className="text-[11px] text-[#687386]">Completed Milestones</div>
          <div className="text-xl font-bold text-[#32845A] mt-1">{completedCount}</div>
        </div>
        <div className="academic-card p-3.5">
          <div className="text-[11px] text-[#687386]">Total Academic Tasks</div>
          <div className="text-xl font-bold text-[#315B85] mt-1">{tasks.length}</div>
        </div>
        <div className="academic-card p-3.5">
          <div className="text-[11px] text-[#687386]">Scheduled Workload</div>
          <div className="text-xl font-bold text-[#202938] mt-1">
            {tasks.filter((t) => !t.completed).reduce((acc, curr) => acc + (curr.estimatedHours || 0), 0)} Hours
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="academic-card p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#687386] mb-3">
          Scheduled Assignments & Study Blocks
        </h3>

        {tasks.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#687386]">
            No study tasks currently scheduled. Click 'Add Study Deadline' above.
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded border text-xs flex items-center justify-between transition-colors ${
                  task.completed ? 'bg-[#F8FAFC] border-[#E5E9EF] opacity-70' : 'bg-white border-[#E5E9EF]'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <button
                    onClick={() => handleToggleComplete(task)}
                    className="text-[#687386] hover:text-[#32845A] shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#32845A]" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  <div className="overflow-hidden">
                    <div className={`font-medium text-[#202938] truncate ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </div>
                    <div className="text-[11px] text-[#687386] flex items-center space-x-2 mt-0.5">
                      <span className="font-semibold text-[#315B85]">{task.subject}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{task.deadline}</span>
                      </span>
                      <span>•</span>
                      <span>{task.estimatedHours} hrs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      task.priority === 'High'
                        ? 'bg-[#FBEAE9] text-[#C45454]'
                        : task.priority === 'Medium'
                        ? 'bg-[#FEF7EC] text-[#C18A36]'
                        : 'bg-[#EAF1F8] text-[#315B85]'
                    }`}
                  >
                    {task.priority}
                  </span>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-[#687386] hover:text-[#C45454] p-1 rounded"
                    title="Delete task"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
