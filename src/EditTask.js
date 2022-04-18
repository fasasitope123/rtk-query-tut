import Modal from "./Modal"
import {useState} from 'react'
import {useUpdateTaskMutation} from './services/taskApi'

function EditTask({open, onClose, toEditTitle, toEditDescription, id}) {

  const [title, setTitle] = useState(toEditTitle)
  const [description, setDescription] = useState(toEditDescription)
  const [updateTask] = useUpdateTaskMutation()

  const handleUpdateTask = (e) => {
    e.preventDefault()
    const task = {
      title,
      description,
      completed: false,
      id
    }
    updateTask(task)
    onClose()
  }

  return (
    <Modal modalLable='Edit Task' onClose={onClose} open={open}>
      <form className='editTask' name='updateTask' onSubmit={handleUpdateTask}>
        <input
          type='text'
          name='title'
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}/>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <button type='submit'>Edit</button>
      </form>
    </Modal>
  )
}

export default EditTask
