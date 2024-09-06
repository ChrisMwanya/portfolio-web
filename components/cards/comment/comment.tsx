import React from 'react';
import { DateTime } from 'luxon';
import { Dot, Link } from 'lucide-react';
import type { CommentType } from './type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Comment: React.FC<CommentType> = ({
  company,
  message,
  fullName,
  website,
  avatar,
  role,
  date,
}) => {
  const dateFormated = DateTime.fromFormat(date, 'yyyy-MM-dd').toFormat(
    'LLL yyyy',
  );

  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      <div className="flex justify-end">
        <Avatar>
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback>UR</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{fullName}</h3>
          <Dot
            fontWeight={900}
            size={'2rem'}
            className="text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{dateFormated}</p>
        </div>
        {role && company && (
          <p className="text-xs">{`${role} at ${company}`}</p>
        )}

        <div className="my-5 h-full w-full">
          <div className="rounded-md bg-muted p-5">
            <p>{message}</p>
          </div>
          <div className="mt-5 flex justify-end text-muted-foreground">
            <a
              href={website}
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
