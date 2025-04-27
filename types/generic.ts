export type CreateCampaignPayload = {
  playbook: string;
  campaign_params: {
    campaign_stage: string;
    targets: never[];
    assets: {};
  };
};

export type CampaignTarget = {
  [key: string]: Array<string>;
};

export type UpdateParams = {
  id: number;
  payload?: any;
  invalidateCache?: boolean;
  skipOptimisticUpdate?: boolean;
  updateCacheOnly?: boolean;
};

export type UpdateContext = {
  previous: any;
};
