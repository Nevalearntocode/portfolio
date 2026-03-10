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

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Cell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

export function BentoGrid() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-3"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
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
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
        <Cell className="md:col-span-3">
          <AboutCard />
        </Cell>
        <Cell className="md:col-span-6">
          <WorksCard />
        </Cell>
        <Cell className="md:col-span-3">
          <ProcessCard />
        </Cell>
      </div>

      {/* Row 3 */}
      <Cell className="col-span-12">
        <WorkingOnCard />
      </Cell>

      {/* Row 4 */}
      <Cell className="col-span-12">
        <PricingCard />
      </Cell>
    </motion.div>
  );
}
