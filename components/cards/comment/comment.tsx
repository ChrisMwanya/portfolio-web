import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Dot, Link, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GuestbookEntity } from '@/graphql/graphql';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';
import { DELETE_COMMENT } from './query';
import useAuthStore from '@/store/auth';
import { client } from '@/lib/graphql';

export const Comment: React.FC<GuestbookEntity> = ({ id, attributes }) => {
  const { name, role, company, comment, website, avatar, email, createdAt } =
    attributes ?? {};

  const dateFormated = DateTime.fromISO(createdAt ?? '').toFormat('DD');
  const { data: session } = useSession();
  const token = useAuthStore.getState().jwt;
  const { toast } = useToast();
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      setShowLoader(true);
      const { data, errors } = await client.mutate({
        mutation: DELETE_COMMENT,
        variables: { id },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (data?.deleteGuestbook) {
        toast({
          title: 'Guestbook',
          description: 'Comment Deleted!',
          variant: 'default',
        });
        return setShowLoader(false);
      }
      if (errors) {
        toast({
          title: 'Guestbook',
          description: 'Something went wrong',
          variant: 'destructive',
        });
        return setShowLoader(false);
      }
    } catch (error) {
      toast({
        title: 'Guestbook',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      <div className="flex justify-end">
        <Avatar>
          <AvatarImage src={avatar ?? ''} className="object-cover" />
          <AvatarFallback>{name ? name[0] : 'CM'}</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <Dot
              fontWeight={900}
              size={'2rem'}
              className="text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">{dateFormated}</p>
          </div>

          {session?.user?.email === email ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleDelete(id ?? '');
              }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="hover:bg-transparent hover:text-main"
                    >
                      {showLoader ? 'Wait ' : <Trash2 size={20} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete your comment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          ) : (
            ''
          )}
        </div>
        {role && company && (
          <p className="text-xs">{`${role} at ${company}`}</p>
        )}

        <div className="my-5 h-full w-full">
          <div className="rounded-md bg-muted p-5">
            <p>{comment}</p>
          </div>
          <div className="mt-5 flex justify-end text-muted-foreground">
            <a
              href={website ?? ''}
              target="_blank"
              rel="noreferrer"
              title="Link"
              className="hover:text-main"
            >
              <Link size={15} />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
