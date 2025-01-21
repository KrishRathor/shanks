import ShineBorder from "@/components/ui/shine-border";
import { RainbowButton } from "../ui/rainbow-button";
import { NeonGradientCard } from "../ui/neon-gradient-card";
import { ShinyButton } from "../ui/shiny-button";

export const CampaignCard = () => {
  return (
    // <ShineBorder
    //   className="relative flex h-[300px] w-[300px] bg-[#000] flex-col items-center justify-center overflow-hidden rounded-lg border  md:shadow-xl"
    //   color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    // >
    //   <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
    //     Shine Border
    //   </span>
    //   <RainbowButton className="mt-4" >View Campaign</RainbowButton>
    // </ShineBorder>
    <NeonGradientCard className="w-[300px] h-[300px] items-center justify-center text-center">
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-1% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Neon Gradient Card
      </span>
      <ShinyButton className="mt-16" >View Campaign</ShinyButton>
    </NeonGradientCard>
  );
};
