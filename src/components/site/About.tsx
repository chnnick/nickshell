import type React from 'react';
import { about } from '../../content';
import { Row, Section } from './Section';

export const About: React.FC = () => {
  const { education } = about;

  // Everything after the degree line: minor, GPA, honors, graduation.
  const educationDetail = [
    education.minor && `Minor ${education.minor}`,
    education.gpa && `GPA ${education.gpa}`,
    ...(education.honors ?? []),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Section label="about">
      <p>{about.greeting}</p>

      {about.blurb.map((line) => (
        <p key={line} className="mt-3">
          {line}
        </p>
      ))}

      <p className="mt-3">{about.seeking}</p>

      <dl className="mt-6 space-y-2">
        <Row label="education">
          {education.degree}, {education.school}
          {educationDetail && <span className="text-muted"> — {educationDetail}</span>}
        </Row>

        {about.skills.map((group) => (
          <Row key={group.label} label={group.label.toLowerCase()}>
            {group.items.join(', ')}
          </Row>
        ))}

        <Row label="interests">{about.interests.join(', ')}</Row>
      </dl>
    </Section>
  );
};
