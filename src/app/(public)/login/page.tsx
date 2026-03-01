import WelcomeSection from "@/components/section/WelcomeSection";
import { tv } from "tailwind-variants";

const timelineStyles = tv({
  slots: {
    base: ["flex", "flex-col", "gap-8", "pt-8"],
  },
});

export default async function LoginPage() {
  const { base } = timelineStyles();

  return (
    <div className={base()}>
      <WelcomeSection />
    </div>
  );
}
