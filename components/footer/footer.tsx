import React from 'react';

import { Github, Linkedin } from 'lucide-react';
import { IconButtonLink } from '../custom-button';

const Footer = () => {
  return (
    <footer className="py-10 text-center">
      <div className="mb-3 flex justify-center gap-3">
        <IconButtonLink link="https://www.linkedin.com/in/christianmwanya/">
          <Linkedin className="h-[1.2rem] w-[1.2rem]" />
        </IconButtonLink>

        <IconButtonLink link="https://github.com/ChrisMwanya">
          <Github className="h-[1.2rem] w-[1.2rem]" />
        </IconButtonLink>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">
          Made with <span aria-label="love">❤️</span> by Chris Mwanya © 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
