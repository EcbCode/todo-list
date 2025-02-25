import { Check, Trash } from '@phosphor-icons/react'
import styles from './Task.module.css'
import { useState } from 'react'

interface TaskProps{
    key: string;
    taskDescription: string
    onDeleteTask: (task: string) => void
    onToggleComplete: (taskDescription: string, isCompleted: boolean) => void;
}

export function Task({taskDescription, onDeleteTask, onToggleComplete}: TaskProps){
    const [ isCompleted, setIsCompleted ] = useState(false)

    function handleToggleTaskStatus() {
        const newStatus = !isCompleted;
        setIsCompleted(newStatus);
        onToggleComplete(taskDescription, newStatus);
    }

    function handleDeleteComment(){
        onDeleteTask(taskDescription)
    }

    return (
        <div className={styles.task}>
            <button className={`${styles.circleButton} ${ isCompleted ? styles.selectedButton : ""}`} type='button' onClick={handleToggleTaskStatus}>
                <Check weight='bold' size={12}/>
            </button>
            <p className={isCompleted ? styles.completedTask : ''}>{taskDescription}</p>
            <button className={styles.trash} onClick={handleDeleteComment} type='button'>
                <Trash width={14} height={14}/>
            </button>
        </div>
    )
}