export type Task = {
  text: string;
  completed: boolean;
};

export type TasksByDateAndProfile = {
  [profile: string]: {
    [date: string]: Task[];
  };
};

export type TaskListProps = {
  selectedProfile: string;
};
