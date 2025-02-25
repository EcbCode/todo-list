import { Header } from './components/Header'
import { PlusCircle, Clipboard } from '@phosphor-icons/react'

import styles from './App.module.css'
import './global.css'
import { TaskHeader } from './components/TaskHeader'
import { Task } from './components/Task'
import { type ChangeEvent, type FormEvent, type InvalidEvent, useState } from 'react'

export function App() {
    const [tasks, setTasks] = useState<string[]>([])
    const [newTask, setNewTasks] = useState("")
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    function handleAddTask(event: FormEvent){
        event.preventDefault()

        setTasks((tasks) => [...tasks, newTask])
        setNewTasks('')        
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
        event.target.setCustomValidity('');
        setNewTasks(event.target.value)
    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function deleteTask(taskToDelete: string){
        const taskWithoutDeleteOne = tasks.filter(tasks => {
            return tasks !== taskToDelete
        })

        setTasks(taskWithoutDeleteOne)
        setCompletedTasks((completedTasks) => completedTasks.filter((task) => task !== taskToDelete));
    }

    function handleToggleComplete(taskDescription: string, isCompleted: boolean) {
        if (isCompleted) {
            setCompletedTasks((completedTasks) => [...completedTasks, taskDescription]);
        } else {
            setCompletedTasks((completedTasks) => completedTasks.filter((task) => task !== taskDescription));
        }
    }

    function renderTasks(){
        if (tasks.length > 0) {
            return tasks.map(task => (
                <Task
                    key={task}
                    taskDescription={task}
                    onDeleteTask={deleteTask}
                    onToggleComplete={handleToggleComplete}
                />
            ));
        }
        
        return (
            <div className={styles.noTasks}>
                <Clipboard size={56}/>
                <div className={styles.text}>
                    <strong>Você ainda não tem tarefas cadastradas</strong>
                    <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
            </div>
        );
    }

    const NewTaskIsEmpty = newTask.length === 0 

    return(
        <>
            <Header/>

            <div className={styles.wrapper}>
                <form onSubmit={handleAddTask} className={styles.taskInput}>
                    <input 
                        type="text" 
                        placeholder='Adicione uma nova tarefa' 
                        value={newTask} 
                        onChange={handleNewTaskChange} 
                        onInvalid={handleNewTaskInvalid} 
                        required={true}
                    />
                    
                    <button type='submit' disabled={NewTaskIsEmpty} >
                        Criar
                        < PlusCircle weight='bold'/>
                    </button>
                </form>

                <div className={styles.tasksTable}>
                    <TaskHeader
                        taskCount={tasks.length}
                        concludedTasks={completedTasks.length}
                    />

                    <main className={styles.main}>
                        { renderTasks() }
                    </main>
                </div>

            </div>
        </>
    )
}
