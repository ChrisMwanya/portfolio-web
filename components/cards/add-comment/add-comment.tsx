'use client';

import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Pin, Dot } from 'lucide-react';
import { ProfileAvatar } from '@/components/avatar';
import { CommentForm, LoginForm } from '@/components/form';

export const AddComment: React.FC = () => {
  const dateFormated = DateTime.local().toFormat('DD ');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setShowCommentForm(true);
      setShowForm(true);
    }
  }, []);

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
            <button
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={() => setShowForm(!showForm)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowForm(!showForm);
                }
              }}
            >
              <p>Guestbook form</p>
              <div>
                <span className="icon-[ep--arrow-down-bold] text-2xl text-main" />
              </div>
            </button>
            {showForm && (
              <>{showCommentForm ? <CommentForm /> : <LoginForm />}</>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
