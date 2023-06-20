import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import { v4 as uuidv4 } from 'uuid'

import { Card } from './Card';
import { Task } from './Task';

import styles from './Content.module.css';

export interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
}

const stateTask: TaskProps[] = [];

export function Content() {
  /* States */
  const [task, setTask] = useState<TaskProps[]>(stateTask);
  const [newTask, setNewTask] = useState('');

  /* Função responsável por adicionar nova tarefa */
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newCreatedTask = {
      /* gerando o id aleatoriamente */
      id: uuidv4(),
      content: newTask,
      isCompleted: false,
    }

    setTask([...task, newCreatedTask]);
    setNewTask('');
  }  

  /* Função responsável por armazenar o valor digitado no input */
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');

    setNewTask(event.target.value);
  }

  /* Função responsável por excluir uma tarefa */
  function handleDeleteTask(id: string) {
   if(confirm('Tem certeza que deseja excluir esta tarefa?') === true) {
    const taskFilter = task.filter(index => index.id !== id);

    setTask(taskFilter);
   } else {
    return;
   }   
  }

  /* Função responsável por atualizar alguma tarefa */
  function handleUpdateTask(id: string) {
    const taskUpdate = task.map(index => {
      if (index.id === id) {
        index.isCompleted = !index.isCompleted;
      }

      return index;
    });

    setTask(taskUpdate);
  }

  const isNewTaskEmpty = newTask.length === 0;

  const completedTasks = `${task.filter(i => i.isCompleted).length} de ${task.length}`;

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={handleCreateNewTask}>
        <input 
          required
          type="text" 
          value={newTask}
          className={styles.input}
          onChange={handleNewTaskChange}
          placeholder='Adicione uma nova tarefa'
        />

        <button
          type="submit"
          className={styles.button}
          disabled={isNewTaskEmpty}
        >
          Criar

          <PlusCircle size={26} />
        </button>
      </form>

      <section>
        <div className={styles.task}>
          <p>Tarefas criadas
            <span>{task.length}</span>
          </p>

          <p>Concluídas
            <span>{task.length === 0 ? 0 : completedTasks}</span>
          </p>
        </div>
      </section>

      {task.length === 0 ? 
        <Card />
      :
      <div>
        {task.map(index => {
          return (
            <Task 
              key={index.id}
              task={index}
              handleDeleteTask={() => handleDeleteTask(index.id)}
              handleUpdateTask={() => handleUpdateTask(index.id)}
            />
          )
        })}
      </div>
      }
    </div>         
  );
}
