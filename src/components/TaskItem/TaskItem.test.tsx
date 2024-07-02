import { describe, it, expect } from 'vitest';
import { render } from '../../utils/test-utils';

import { TaskItem } from './index';

describe('TaskItem', () => {
  it('Компонент отображается корректно', () => {
    const mockTask = 'Mock Task';
    const mockIndex = 0;
    const mockCompleted = false;
    const mockToggleComplete = () => {};

    const { getByText } = render(
      <TaskItem
        task={mockTask}
        index={mockIndex}
        completed={mockCompleted}
        onToggleComplete={mockToggleComplete}
      />,
    );

    // Проверяем, что текст задачи отображается правильно
    expect(getByText(mockTask)).toBeTruthy();

    // Проверяем, что кнопки "Готово" и "Восстановить" отображаются
    expect(getByText('Готово')).toBeTruthy();
    expect(getByText('Восстановить')).toBeTruthy();
  });
});
