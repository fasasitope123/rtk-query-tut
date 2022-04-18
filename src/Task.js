import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import {useDeleteTaskMutation} from './services/taskApi'
import {useUpdateTaskMutation} from './services/taskApi'


function Task({id, title, description, completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()


  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  const handleDeleteTask = (e) => {
    e.preventDefault()
    deleteTask(id)
    handleClose()
  }

  
const handleUpdateTask = (e) => {
  e.preventDefault()
  const task = {
    title,
    description,
    completed: checked,
    id
  }
  updateTask(task)
}

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked} 
          onChange={handleUpdateTask}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit: true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDeleteTask}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={title} 
          description={description} 
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditDescription={description} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task