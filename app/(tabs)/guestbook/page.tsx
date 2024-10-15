'use client';
import { useQuery } from '@apollo/client';
import { AddComment } from '@/components/cards/add-comment/add-comment';
import { Comment, GuestbookSkeleton } from '@/components/cards/comment';
import { GET_COMMENTS } from './getData';
import { GuestbookEntity } from '@/graphql/graphql';

const GuestBook = () => {
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <AddComment />
      <div className="mt-2">
        {loading ? (
          <>
            <GuestbookSkeleton />
            <GuestbookSkeleton />
            <GuestbookSkeleton />
          </>
        ) : (
          data.guestbooks?.data?.map(({ id, attributes }: GuestbookEntity) => (
            <Comment key={id} attributes={attributes} id={id} />
          ))
        )}
      </div>
    </div>
  );
};

export default GuestBook;
