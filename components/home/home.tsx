'use client';
import { useQuery } from '@apollo/client';
import { GET_FEEDS } from './getData';
import { Feed } from '@/components/cards/feed';
import { FeedEntity } from '@/graphql/graphql';

import { FeedSkeleton } from '../cards/feed';

export const Home = () => {
  const { loading, error, data } = useQuery(GET_FEEDS);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div id="feed" className="">
      {loading ? (
        <div className="gap-y-4">
          <FeedSkeleton />
          <FeedSkeleton />
        </div>
      ) : (
        data.feeds.data.map(({ attributes }: FeedEntity) => (
          <Feed
            key={attributes?.title}
            feed={attributes ?? { title: '', description: {} }}
          />
        ))
      )}
    </div>
  );
};
