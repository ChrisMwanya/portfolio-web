'use client';

import { IconButton } from '../custom-button';

export const LoginForm = () => {
  return (
    <div className="mt-6 flex flex-col items-center">
      <h6 className="font-semibold">Login </h6>
      <p className="mb-4 text-sm">Just log in and leave a quick note.</p>
      <div className="flex items-center gap-2 rounded-lg border-2 border-muted-foreground p-4">
        <form action="" method="post">
          <IconButton type="">
            <span className="icon-[bi--linkedin] text-2xl" />
          </IconButton>
        </form>
        <form action="" method="post">
          {' '}
          <IconButton type="">
            <span className="icon-[bi--google] text-2xl" />
          </IconButton>
        </form>
        <form action="" method="post">
          {' '}
          <IconButton type="">
            <span className="icon-[bi--github] text-2xl" />
          </IconButton>
        </form>
      </div>
    </div>
  );
};
