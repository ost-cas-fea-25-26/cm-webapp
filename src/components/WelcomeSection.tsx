import { Heading } from "@krrli/cm-designsystem";
import { tv } from "tailwind-variants";

const welcomeSectionStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-2"],
    title: ["text-violet-600"],
    subtitle: ["text-slate-500"],
  },
});

const WelcomeSection = () => {
  const { base, title, subtitle } = welcomeSectionStyles();
  return (
    <div className={base()}>
      <Heading as="h2" size="2" className={title()}>
        Welcome to Mumble
      </Heading>
      <Heading as="h4" size="4" className={subtitle()}>
        Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel
        repellat dicta.
      </Heading>
    </div>
  );
};

export default WelcomeSection;
