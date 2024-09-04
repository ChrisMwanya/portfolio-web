'use client';

import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Pin, Dot } from 'lucide-react';
import { ProfileAvatar } from '@/components/avatar';
import { LoginForm } from '@/components/form';
export const AddComment: React.FC = () => {
  const dateFormated = DateTime.local().toFormat('DD ');
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      <div className="flex justify-end">
        <Pin fontWeight={900} size={'1rem'} className="text-muted-foreground" />
      </div>
      <p className="text-xs text-muted-foreground">Pinned Cheep</p>

      <div className="flex justify-end">
        <ProfileAvatar />
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{'Chris'} ✨</h3>
          <Dot
            fontWeight={900}
            size={'2rem'}
            className="text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">{dateFormated}</p>
        </div>
        <p>
          {'Want to say something about me ? Fill this form'} {'💬'}
        </p>

        <div className="my-5 h-full w-full">
          <div className="rounded-md bg-muted p-5">
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => setShowForm(!showForm)}
            >
              <p>Guestbook form</p>
              <div>
                <span className="icon-[ep--arrow-down-bold] text-2xl text-main" />
              </div>
            </div>
            {showForm && <LoginForm />}
          </div>
        </div>
      </div>
    </article>
  );
};
