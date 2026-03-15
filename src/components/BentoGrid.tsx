"use client";

import { motion, type Variants } from "framer-motion";
import { HeroCard } from "./HeroCard";
import { SkillsCard } from "./SkillsCard";
import { AvailabilityCard } from "./AvailabilityCard";
import { ContactCard } from "./ContactCard";
import { AboutCard } from "./AboutCard";
import { WorksCard } from "./WorksCard";
import { ProcessCard } from "./ProcessCard";
import { WorkingOnCard } from "./WorkingOnCard";
import { PricingCard } from "./PricingCard";

const row: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cell: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Row({
  children,
  className,
  inView = false,
}: {
  children: React.ReactNode;
  className?: string;
  inView?: boolean;
}) {
  return (
    <motion.div
      variants={row}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-80px" } }
        : { animate: "show" })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Cell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={cell} className={className}>
      {children}
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <div className="flex flex-col gap-3">
      {/* Row 1 — above fold, mount-triggered */}
      <Row className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <Cell className="md:col-span-5">
          <HeroCard />
        </Cell>
        <Cell className="md:col-span-4">
          <SkillsCard />
        </Cell>
        <Cell className="md:col-span-3 flex flex-col gap-3">
          <AvailabilityCard />
          <ContactCard />
        </Cell>
      </Row>

      {/* Row 2 — scroll-triggered */}
      <Row inView className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
        <Cell className="md:col-span-3">
          <AboutCard />
        </Cell>
        <Cell className="md:col-span-6">
          <WorksCard />
        </Cell>
        <Cell className="md:col-span-3">
          <ProcessCard />
        </Cell>
      </Row>

      {/* Row 3 — scroll-triggered */}
      <Row inView>
        <Cell>
          <WorkingOnCard />
        </Cell>
      </Row>

      {/* Row 4 — scroll-triggered */}
      <Row inView>
        <Cell>
          <PricingCard />
        </Cell>
      </Row>
    </div>
  );
}
