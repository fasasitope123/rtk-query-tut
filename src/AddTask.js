import Modal from "./Modal"
import {useState} from 'react'
import {useAddTaskMutation} from './services/taskApi'

function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [addTask] = useAddTaskMutation()

  const handleAddTask = (e) => {
    e.preventDefault()
    const task = {
      title,
      description,
      completed: false,
      id: Math.random()
    }
    addTask(task)
    onClose()
  }

  return (
    <Modal modalLable='Add Task' onClose={onClose} open={open}>
      <form className='addTask' name='addTask' onSubmit={handleAddTask}>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Enter title'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
