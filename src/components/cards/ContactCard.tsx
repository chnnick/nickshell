import React from 'react';
import { contact } from '../../content';
import { TerminalPanel } from '../ui/TerminalPanel';

const cmdForKind: Record<string, string> = {
  email: 'mailto',
  linkedin: 'open linkedin',
  github: 'open github',
};

export const ContactCard: React.FC = () => (
  <TerminalPanel header="~/contact" accent="yellow">
    <div className="space-y-2 text-sm text-green-200">
      <p className="text-yellow-300">// reach me at</p>
      <ul className="space-y-2">
        {contact.map((c) => (
          <li key={c.kind}>
            <a
              href={c.href}
              target={c.kind === 'email' ? undefined : '_blank'}
              rel="noreferrer"
              className="group inline-flex items-center gap-3 text-cyan-300 hover:text-cyan-200"
            >
              <span className="text-yellow-300 group-hover:text-yellow-200">
                $ {cmdForKind[c.kind]}
              </span>
              <span className="underline underline-offset-2">{c.display}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </TerminalPanel>
);
