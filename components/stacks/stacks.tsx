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
              <Button
                variant="link"
                className="group relative overflow-hidden rounded-full border border-main/20 bg-main/5 px-3 py-1 text-xs font-medium text-main backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-main/40 hover:bg-main/10 hover:shadow-lg dark:text-amber-400"
              >
                <span className="relative z-10">{name}</span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="animate-scale-in border-white/20 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/80">
              <div className="flex justify-between space-x-4">
                <div className="transition-transform duration-300 hover:scale-110">
                  <Avatar className="border-2 border-main/20">
                    <AvatarImage src={icon ?? ''} />
                    <AvatarFallback className="bg-main/10 text-main">
                      {name ? name[0] : ''}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="">
                  <h4 className="mb-1 text-sm font-semibold text-main">
                    {name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{description}</p>
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
