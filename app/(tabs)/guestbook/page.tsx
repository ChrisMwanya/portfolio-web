import { AddComment } from '@/components/cards/add-comment/add-comment';
//import { Comment, GuestbookSkeleton } from '@/components/cards/comment';

const GuestBook = () => {
  return (
    <div>
      <AddComment />
      <div className="mt-2">
        {/* {data.guestbooks?.data?.map(({ id, attributes }: GuestbookEntity) => (
          <Comment key={id} attributes={attributes} id={id} />
        ))} */}
      </div>
    </div>
  );
};

export default GuestBook;
