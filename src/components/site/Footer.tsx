import type React from 'react';
import { contact } from '../../content';

export const Footer: React.FC = () => (
  <footer className="mt-16 border-t border-rule pb-16 pt-6 text-[13px] text-muted">
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {contact.map((c) => (
        <a
          key={c.kind}
          href={c.href}
          {...(c.kind === 'email' ? {} : { target: '_blank', rel: 'noreferrer' })}
        >
          {c.display}
        </a>
      ))}
    </div>

    <p className="mt-3">
      Built by Nick Chen. There's a{' '}
      <a href="/terminal">terminal version</a> of this site too.
    </p>
  </footer>
);
