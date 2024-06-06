import React from 'react';
import { Button, Flex } from 'antd';

type TaskProps = {
  task: string;
  index: number;
};

export const TaskItem: React.FC<TaskProps> = ({ task, index }) => {
  const [isCompleted, setIsCompleted] = React.useState<boolean>(false);

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleRestore = () => {
    setIsCompleted(false);
  };

  return (
    <div className='task-item'>
      <ul>
        <li key={index}>
          <p className={isCompleted ? 'disabled' : ''}>{task}</p>
          <Flex gap='small' wrap>
            <Button onClick={handleComplete}>Готово</Button>
            <Button type='dashed' onClick={handleRestore}>
              Восстановить
            </Button>
          </Flex>
        </li>
      </ul>
    </div>
  );
};
