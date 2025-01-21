import { RainbowButton } from "@/components/ui/rainbow-button";
import { MagicCard } from "@/components/ui/magic-card";
import { CampaignCard } from "./CampaignCard";
import { CreateCampaingForm } from "./CreateCampaingForm";
import { useState } from "react";

export const Campaign = () => {
  const [campaignForm, setCampaignForm] = useState<boolean>(false);

  return (
    <div className="w-[70vw]">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setCampaignForm(false)}>Campaigns</h1>
        <RainbowButton onClick={() => setCampaignForm(true)}>
          Create Campaign
        </RainbowButton>
      </div>
      {campaignForm && (
        <div>
          <CreateCampaingForm setCampaignForm={setCampaignForm} />
        </div>
      )}
      {!campaignForm && (
        <div className="flex mt-8 items-center justify-center flex-wrap gap-8">
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
          <CampaignCard />
        </div>
      )}
    </div>
  );
};
