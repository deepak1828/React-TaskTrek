import React, {useState} from "react";
import "./TaskForm.css";
import Tag from "./Tag";

function TaskForm({setTasks}) {
    const [taskData, setTaskData] = useState({
        task: "",
        status: "todo",
        tags: []
    });

    const checkTag = (tag) => {
        return taskData.tags.some(item => item === tag);
    }

    const selectTag = (tag) => {
        if(taskData.tags.some(item => item === tag)){
            const filterTags = taskData.tags.filter(item => item !== tag);
            setTaskData(prev => {
                return {...prev, tags: filterTags};
            })
        } else {
            setTaskData(prev => {
                return {...prev, tags: [...prev.tags, tag]};
            })
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setTaskData((prev) => {
            return {...prev, [name]:value};
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks(prev => {
            return [...prev, taskData];
        })
        setTaskData({
            task: "",
            status: "todo",
            tags: []
        });
    }

    return(
        <header className='app_header'>
            <form onSubmit={handleSubmit}>
                <input type="text" className="task_input" 
                value={taskData.task} placeholder="Enter your task"
                name="task" onChange={handleChange}/>

                <div className="task_form_bottom_line">
                    <div>
                        <Tag tagName="HTML" selectTag={selectTag} selected={checkTag("HTML")} />
                        <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")} />
                        <Tag tagName="JavaScript" selectTag={selectTag} selected={checkTag("JavaScript")} />
                        <Tag tagName="React" selectTag={selectTag} selected={checkTag("React")} />
                    </div>

                    <div>
                        <select className="task_status" value={taskData.status}
                        name="status" onChange={handleChange}>
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>

                        <button type="submit" className="task_submit">+ Add Task</button>
                    </div>
                </div>
            </form>
        </header>
    )
}

export default TaskForm;