import { TodoList } from '../../../../modules/Todos'
import { CreateTodo } from '../CreateTodo/CreateTodo'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function TodoListPage() {
  const [showModal, setShowModal] = useState(false)
  const params = useParams()
  return (
    <div>
        <CreateTodo listName={params.listName!} setShowModal={setShowModal} showModal={showModal} />
        <TodoList setShowModal={setShowModal} />
    </div>
  )
}
