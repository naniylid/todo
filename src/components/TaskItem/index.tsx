import React from 'react';
import { Button, Flex } from 'antd';

type TaskProps = {
  task: string;
  index: number;
  completed: boolean;
  onToggleComplete: () => void;
};

export const TaskItem: React.FC<TaskProps> = ({ task, index, completed, onToggleComplete }) => {
  return (
    <div className='task-item'>
      <ul>
        <li key={index}>
          <p className={completed ? 'disabled' : ''}>{task}</p>
          <Flex gap='small' wrap>
            <Button onClick={onToggleComplete} disabled={completed}>
              Готово
            </Button>
            <Button type='dashed' onClick={onToggleComplete} disabled={!completed}>
              Восстановить
            </Button>
          </Flex>
        </li>
      </ul>
    </div>
  );
};
