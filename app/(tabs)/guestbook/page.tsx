import { AddComment } from '@/components/cards/add-comment/add-comment';
import { CommentType, Comment } from '@/components/cards/comment';

const comments: CommentType[] = [
  {
    message: 'This is a test message',
    date: '2022-01-01',
    fullName: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'johndoe@gmail.com',
    company: 'Kadea Academy',
    website: 'https://kadea.academy',
    role: 'Software Engineer',
  },
  {
    message: 'Great job on the project!',
    date: '2023-03-15',
    fullName: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    email: 'janesmith@example.com',
    company: 'Tech Innovations',
    website: 'https://techinnovations.io',
    role: 'Product Manager',
  },
  {
    message: 'I have some suggestions for improvement.',
    date: '2023-05-10',
    fullName: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'alice.johnson@outlook.com',
    company: 'Creative Solutions',
    website: 'https://creativesolutions.com',
    role: 'UI/UX Designer',
  },
  {
    message: 'Amazing work, keep it up!',
    date: '2023-07-22',
    fullName: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    email: 'michael.brown@gmail.com',
    company: 'Brown Technologies',
    website: 'https://browntech.com',
    role: 'CTO',
  },
  {
    message: 'Can we discuss further collaboration?',
    date: '2023-09-05',
    fullName: 'Emily Davis',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    email: 'emily.davis@gmail.com',
    company: 'Future Solutions',
    website: 'https://futuresolutions.com',
    role: 'Business Analyst',
  },
];
const GuestBook = () => {
  return (
    <div>
      <AddComment />
      <div className="mt-2">
        {comments.map((comment) => (
          <Comment key={comment.email} {...comment} /> // Use a unique key for each Comment element
        ))}
      </div>
    </div>
  );
};

export default GuestBook;
