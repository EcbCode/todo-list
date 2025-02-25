import styles from './TaskHeader.module.css'

interface TaskHeaderProps{
    taskCount: number
    concludedTasks: number
}

export function TaskHeader({taskCount, concludedTasks}:TaskHeaderProps) {
    return (
        <header className={styles.header}>
        <div className={styles.createdTasks}>
            <strong>Tarefas Criadas </strong>
            <span>{taskCount}</span>
        </div>
        <div className={styles.concludedTasks}>
            <strong>Concluídas</strong>
            <span>{concludedTasks} de {taskCount}</span>
        </div>
    </header>
    )
}