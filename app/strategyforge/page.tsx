import type { Metadata } from "next";
import { Suspense } from "react";
import { HERO_SUB } from "./content";
import { sfMono, sfSans } from "./fonts";
import { SuccessBanner } from "./SuccessBanner";
import { CantDo } from "./_sections/CantDo";
import { Faq } from "./_sections/Faq";
import { Hero } from "./_sections/Hero";
import { HowItWorks } from "./_sections/HowItWorks";
import { JoinForm } from "./_sections/JoinForm";
import { Pillars } from "./_sections/Pillars";
import { Plans } from "./_sections/Plans";
import { Venues } from "./_sections/Venues";
import "./sf-theme.css";

const TITLE = "StrategyForge: your trading agent on Canton";

export const metadata: Metadata = {
  title: TITLE,
  description: HERO_SUB,
  openGraph: { title: TITLE, description: HERO_SUB },
};

export default function StrategyForgePage() {
  return (
    <div className={`sf-theme ${sfSans.variable} ${sfMono.variable}`}>
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>
      <Hero />
      <hr className="sf-rule" />
      <Pillars />
      <HowItWorks />
      <Plans />
      <CantDo />
      <Venues />
      <Faq />
      <JoinForm />
    </div>
  );
}
