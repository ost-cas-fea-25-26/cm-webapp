"use cache";

import { Heading } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";

const welcomeSectionStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-2"],
    title: ["text-violet-600"],
    subtitle: ["text-slate-500"],
  },
});

const WelcomeSection = async () => {
  const { base, title, subtitle } = welcomeSectionStyles();
  return (
    <div className={base()}>
      <Heading as="h1" size="2" className={title()}>
        Welcome to Mumble
      </Heading>
      <Heading as="h2" size="4" className={subtitle()}>
        Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel
        repellat dicta.
      </Heading>
    </div>
  );
};

export default WelcomeSection;
