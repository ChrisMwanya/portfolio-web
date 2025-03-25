export type Feed = {
  id: number;
  title: string;
  content: {
    date: string;
    isPinned: boolean;
    name: string;
    statusIcon: string;
    status: string;
    content: string;
    spotify?: string;
    image?: string;
  };
};
