import styles from './Card.module.css';

import Clipe from '../assets/clipe.svg';

export function Card() {
  return (
    <div className={styles.card}>
      <img src={Clipe} alt="Imagem do Clipe" />

      <strong>Você ainda não tem tarefas cadastradas</strong>
      
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
