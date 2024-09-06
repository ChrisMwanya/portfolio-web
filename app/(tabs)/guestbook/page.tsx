'use client';
import { useQuery } from '@apollo/client';
import { AddComment } from '@/components/cards/add-comment/add-comment';
import { Comment } from '@/components/cards/comment';
import { GET_COMMENTS } from './getData';
import { GuestbookEntity } from '@/graphql/graphql';

const GuestBook = () => {
  const { loading, error, data } = useQuery(GET_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return (
    <div>
      <AddComment />
      <div className="mt-2">
        {data.guestbooks?.data?.map(
          (comment: GuestbookEntity) =>
            comment?.attributes && (
              <Comment
                key={comment?.attributes?.email}
                {...comment?.attributes}
              />
            ), // Use a unique key for each Comment element
        )}
      </div>
    </div>
  );
};

export default GuestBook;
