import { Feed } from '@/components/cards/feed';
import { getAllFeeds } from '@/lib/markdown-parser';

export const Home = async () => {
  const data = getAllFeeds();
  const feeds = Array.isArray(data) ? data : [];

  return (
    <div>
      {feeds.map((item) => {
        return (
          <Feed
            key={item.id}
            title={item.title}
            content={item.content}
            id={item.id}
          />
        );
      })}
    </div>
  );
};
