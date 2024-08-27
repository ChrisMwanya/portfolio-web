import { Feed } from '@/components/cards/feed';
import type { Feed as FeedType } from '@/components/cards/feed/type';

const feeds: FeedType[] = [
  {
    name: 'Chris',
    avatarLink: '/assets/images/profil.webp',
    status: "Feelin' myself",
    statusIcon: '🌴',
    title: 'Hello World',
    content:
      'At Kadea, I help learners level up their skills in fullstack development. My goal is to guide them in mastering both frontend and backend, so they become versatile developers ready to take on any challenge in the tech world. 💻🚀',
    isPinned: true,
    date: '2022-12-13',
    image: '/assets/images/kadea_class.webp',
  },
  {
    name: 'Chris',
    avatarLink: '/assets/images/profil.webp',
    status: "Making others' lives easier",
    statusIcon: '🚀',
    title: 'Community',
    content:
      'I also conducted web development basics training for 40 young people as part of the RESICODI program by Enabel RDC. The learners were able to build a landing page in less than a week, and some decided to pursue development as their profession. 😊🚀',
    isPinned: false,
    date: '2023-12-13',
    image: '/assets/images/resicodi.webp',
  },

  {
    name: "Chris's vibes",
    avatarLink: '/assets/images/profil.webp',
    status: '',
    statusIcon: '🎶😊',
    title: '',
    content: '',
    isPinned: false,
    date: '2023-12-13',
    spotify:
      'https://open.spotify.com/embed/playlist/3XIHtHwRHEZIl5t2YpeuKu?utm_source=generator',
    image: '/assets/images/resicodi.jpg',
  },
  {
    name: 'Chris working out',
    avatarLink: '/assets/images/profil.webp',
    status: 'Outside of work',
    statusIcon: '🚀',
    title: '',
    content: '',
    isPinned: false,
    date: '2023-12-13',
    image: '/assets/images/videoPoster.webp',
  },
];

const Home = () => {
  return (
    <div id="feed" className="">
      {feeds.map((feed) => (
        <Feed key={feed.title} feed={feed} />
      ))}
    </div>
  );
};

export default Home;
