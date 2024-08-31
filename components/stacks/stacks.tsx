'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TECHNOS } from './getData';
import { StacksProps } from './type';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Button } from '../ui/button';

const Stacks = ({ className }: StacksProps) => {
  const { loading, error, data } = useQuery(GET_TECHNOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className={className}>
      {data?.technos.data.map(({ attributes }) => (
        <HoverCard key={attributes?.name}>
          <HoverCardTrigger>
            <Button variant="link" className="px-0">
              .{attributes?.name}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={attributes?.logo ?? ''} />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div className="">
                <h4 className="text-sm font-semibold">{attributes?.name}</h4>
                <p className="text-sm">
                  {attributes?.description}{' '}
                  <a
                    href={attributes?.link ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-main"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};

export default Stacks;
