import { Trash } from 'phosphor-react';

import { TaskProps } from './Content';

import styles from './Task.module.css';

interface TaskCard {
  task: TaskProps;

  handleDeleteTask: () => void;
  handleUpdateTask: () => void;
}

export function Task({ task, handleDeleteTask, handleUpdateTask }: TaskCard) {
  return(
    <div className={styles.task}>
      <label className={styles.label}>
        <input 
          type="checkbox" 
          onClick={handleUpdateTask} 
          defaultChecked={task.isCompleted} 
        />

        <span className={styles.span}></span>
      </label>

      <p 
        className={task.isCompleted ? styles.isCompleted : ''}
      >
        {task.content}
      </p>

      <button>
        <Trash 
          size={28}
          onClick={handleDeleteTask}
        />
      </button>
    </div>
  );
}
