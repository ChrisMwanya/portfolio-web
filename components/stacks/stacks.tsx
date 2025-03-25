import React from 'react';
import { StacksProps } from './type';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Button } from '../ui/button';
import { getAllTechnos } from '@/lib/markdown-parser';

const Stacks = ({ className }: StacksProps) => {
  const data = getAllTechnos() as Record<
    string,
    { name: string; icon: string; description: string }[]
  >[];

  return (
    <div className={className}>
      {data[0].Technos.map(
        ({
          name,
          icon,
          description,
        }: {
          name: string;
          icon: string;
          description: string;
        }) => (
          <HoverCard key={name}>
            <HoverCardTrigger>
              <Button variant="link" className="px-0">
                {name}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={icon ?? ''} />
                  <AvatarFallback>{name ? name[0] : ''}</AvatarFallback>
                </Avatar>
                <div className="">
                  <h4 className="text-sm font-semibold">{name}</h4>
                  <p className="text-sm">{description} </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
      )}
    </div>
  );
};

export default Stacks;
