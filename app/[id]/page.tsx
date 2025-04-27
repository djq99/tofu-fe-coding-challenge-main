"use client";

import { useFetchContent } from "hooks/api/content";
import { useFetchContentGroup } from "hooks/api/contentGroup";
import { useFetchCampaign } from "hooks/api/campaign";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import {
  initialContentState,
  shapedContentData,
  shapedCampaignData,
  initialCampaignState,
} from "utils/factoryHelpers";

import Spinner from "components/core/spinner";

import FactoryBodySettingsWrapper from "components/factory/wrappers/factoryBodySettings/personalizationFactoryBodySettings";

export default function Content({ params }) {
  const searchParams = useSearchParams();
  const { id: pid } = params;

  const { contentData = initialContentState } = useFetchContent(parseInt(pid));
  const { contentGroup } = useFetchContentGroup(contentData?.content_group);
  const {
    campaign: campaignData = initialCampaignState,
    isLoading: fetchingCampaign,
  } = useFetchCampaign(contentData?.campaign);

  const content: any = useMemo(() => {
    if (!contentData || !contentGroup) return;
    return shapedContentData(contentData, contentGroup);
  }, [contentData, contentGroup, searchParams]);

  const campaign = useMemo(() => {
    if (!campaignData) return;
    return shapedCampaignData(campaignData);
  }, [campaignData]);

  return (
    <>
      {!content || fetchingCampaign ? (
        <div className="flex justify-center items-center h-[200px]">
          <Spinner />
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <FactoryBodySettingsWrapper content={content} campaign={campaign} />
        </div>
      )}
    </>
  );
}
