import type React from 'react';

interface Props {
  /** Lowercase label shown above the section, e.g. "experience". */
  label: string;
  children: React.ReactNode;
}

/** Shared section wrapper: muted lowercase label + consistent vertical rhythm. */
export const Section: React.FC<Props> = ({ label, children }) => (
  <section className="mt-14">
    <h2 className="mb-4 text-[13px] text-muted">{label}</h2>
    {children}
  </section>
);

/** Label/value row used by the about section. Stacks on narrow screens. */
export const Row: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-col gap-x-4 sm:flex-row">
    {/* w-36 fits the longest label ("tools/frameworks") without clipping. */}
    <dt className="shrink-0 text-muted sm:w-36">{label}</dt>
    <dd className="min-w-0">{children}</dd>
  </div>
);

/** The +/- affordance on a <details> summary. Toggled purely in CSS. */
export const Marker: React.FC = () => (
  <span aria-hidden className="disclosure ml-3 shrink-0 select-none text-muted" />
);
