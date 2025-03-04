'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const onAdd = () => {
    if (task.trim() !== '') {
      setTasks(prevTasks => [...prevTasks, task]);
      setTask('');
    }
  };

  const onDelete = (index: number) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd();
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[30px] items-center">
        <input 
          type="text" 
          value={task}
          onChange={onChange} 
          onKeyDown={onKeyDown} 
          placeholder="Add a new task"
          aria-label="Add new task"
          className="border-[1px] rounded-md w-[400px] h-[40px] border-inherit"
        />
        <button
          onClick={onAdd}
          className="bg-blue-500 ml-2 p-2 rounded-md cursor-pointer active:bg-blue-700 hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    
      <div className="flex justify-center w-full">
        <div className="w-[450px] mt-[5px] rounded-md flex justify-center">
          <ul className="flex flex-col gap-y-2">
            {
              tasks.map((task, index) => 
                <li 
                  className="odd:bg-[#107361] even:bg-[#014034] rounded-md p-2 w-[450px] flex justify-between items-center" 
                  key={index}
                >
                  {task} 
                  <img 
                    className="cursor-pointer" 
                    onClick={() => onDelete(index)} 
                    alt="Delete" 
                    src="/trash-can-regular.svg"  
                    width={20} 
                  />
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </>
  );
}
