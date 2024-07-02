import { render, screen } from '../../utils/test-utils';
import '@testing-library/jest-dom';

import { TaskList } from './index';

describe('TaskList', () => {
  it('рендер даты задачи', async () => {
    const selectedProfile = 'profile1';
    render(<TaskList selectedProfile={selectedProfile} />);

    const dateHeader = await screen.findByText(
      `Список задач на ${new Date().toISOString().slice(0, 10)}`,
    );
    expect(dateHeader).to.exist;
  });
});
