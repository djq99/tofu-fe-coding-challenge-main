export const tofuElementClass = "tofu-element";
export const tofuHoveredElement = "tofu-hovered-element";
export const selectDecorator = "tofu-selected-element";
export const hideTofuDecorator = "tofu-hide-element";

export const GenStatus = {
  None: "None", // Begin state. No results generated yet.
  Progress: "Progress", // User clicked on 'Generate' button, and generation is in progress
  Done: "Done", // Generated results have been returned from BE.
};

// content group fields which are related to content settings
export const p13nContentSettingsFields = ["components", "content_group_params"];
export const repurposeContentSettingsFields = ["content_group_params"];

export const CampaignKeys = {
  campaignName: "campaignName",
  campaignId: "campaignId",
  playbookId: "playbookId",
  campaignGoal: "campaignGoal",
  campaignStage: "campaignStage",
  contentGroups: "contentGroups",
  targets: "targets",
  assets: "assets",
  allSelectedTargets: "allSelectedTargets",
  foundationModel: "foundationModel",
  customInstructions: "customInstructions",
  genStatus: "genStatus",
  enableAutoSync: "enableAutoSync",
  inboundLandingPages: "inboundLandingPages",
};

// Must match the keys in 'gen' state below.
export const Keys = {
  genStatus: "genStatus",
  contentName: "contentName",
  contentId: "contentId",
  contentType: "contentType",
  contentSourceUploadMethod: "contentSourceUploadMethod",
  contentSourceFormat: "contentSourceFormat",
  contentSource: "contentSource",
  contentSourceCopy: "contentSourceCopy",
  repurposeTemplateContentSourceCopy: "repurposeTemplateContentSourceCopy",
  subjectLineOnlyContentSourceCopy: "subjectLineOnlyContentSourceCopy",
  slateRepurposeTemplateContentSourceCopy:
    "slateRepurposeTemplateContentSourceCopy",
  exportContentSourceCopy: "exportContentSourceCopy",
  subjectLineOnlyContnetSourceCopy: "subjectLineOnlyContnetSourceCopy",
  components: "components",
  targets: "targets",
  assets: "assets",
  customInstructions: "customInstructions",
  template_settings: "template_settings",
  results: "results",
  playbook: "playbook",
  foundationModel: "foundationModel",
  contentGroup: "contentGroup",
  contentGroupName: "contentGroupName",
  campaignId: "campaignId",
  initialSetup: "initialSetup",
  template: "template",
  contentCollection: "contentCollection",
  reviewedContentList: "reviewedContentList",
  hasAnalysisRun: "hasAnalysisRun",
  hubspotEmailId: "hubspotEmailId",
};

export const initialContentState = {
  genStatus: GenStatus.None,
  contentName: "",
  contentId: "",
  contentType: "",
  contentSourceUploadMethod: "",
  contentSourceFormat: "",
  contentSource: "",
  contentSourceCopy: "",
  components: {}, // components we want to change
  targets: {}, // targets we want to customize across
  assets: {}, // assets we want to reference for generation
  results: [], // results with variations
  customInstructions: [], // custom instructions we want to add for this content
  contentGroup: "", // optional content group
  contentGroupName: "",
  // TODO: playbook should be removed from here
  playbook: {},
  campaignId: "",
};

export const initialCampaignState = {
  campaignId: "",
  campaignName: "",
  campaignGoal: "",
  campaignStage: "",
  contentGroups: [],
  playbookId: "",
  customInstructions: [],
  foundationModel: "",
  assets: {},
  targets: [],
  genStatus: {},
  enableAutoSync: false,
};

export const shapedContentData = (content, contentGroup) => {
  const { content_params = {} } = content;
  const { content_group_params = {} } = contentGroup;
  const components = contentGroup.components;

  const shapedContent = {
    [Keys.contentId]: content.id,
    [Keys.contentGroup]: content?.content_group ?? "",
    [Keys.campaignId]: content?.campaign ?? "",
    [Keys.contentName]: content?.content_name ?? "",
    [Keys.contentGroupName]: contentGroup.content_group_name,
    [Keys.contentType]: content_group_params.content_type,
    [Keys.contentSourceUploadMethod]:
      content_group_params.content_source_upload_method,
    [Keys.contentSourceFormat]: content_group_params.content_source_format,
    [Keys.contentSource]: content_group_params.content_source ?? "",
    [Keys.contentSourceCopy]: content_group_params.content_source_copy ?? "",
    [Keys.repurposeTemplateContentSourceCopy]:
      content_group_params.repurpose_template_content_source_copy ?? "",
    [Keys.subjectLineOnlyContentSourceCopy]:
      content_group_params.subject_line_only_content_source_copy ?? null,
    [Keys.slateRepurposeTemplateContentSourceCopy]:
      content_group_params.slate_repurpose_template_content_source_copy ?? null,
    [Keys.targets]: content_params?.targets ?? {},
    [Keys.customInstructions]: content_group_params.custom_instructions ?? [],
    [Keys.template_settings]: content_group_params.template_settings ?? null,
    [Keys.components]: components,
    [Keys.results]: content.results,
    [Keys.initialSetup]: content_group_params.initialSetup ?? undefined,
    [Keys.template]: content_group_params.template ?? null,
    [Keys.contentCollection]: content_group_params.content_collection ?? null,
    [Keys.reviewedContentList]:
      content_group_params.reviewed_content_list ?? [],
    [Keys.hasAnalysisRun]: content_group_params.hasAnalysisRun,
  };

  return shapedContent;
};

export const shapedCampaignData = (campaign) => {
  const campaignParams = campaign.campaign_params;
  const campaignChange = {
    [CampaignKeys.campaignId]: campaign.id,
    [CampaignKeys.playbookId]: campaign?.playbook,
    [CampaignKeys.campaignName]: campaign?.campaign_name ?? "",
    [CampaignKeys.campaignGoal]: campaignParams?.campaign_goal ?? "",
    [CampaignKeys.contentGroups]: campaign?.content_groups ?? [],
    [CampaignKeys.campaignStage]: campaignParams?.campaign_stage ?? "",
    [CampaignKeys.targets]: campaignParams?.targets ?? [],
    [CampaignKeys.assets]: campaignParams?.assets ?? {},
    [CampaignKeys.foundationModel]: campaignParams?.foundation_model ?? "",
    [CampaignKeys.allSelectedTargets]: campaignParams?.allSelectedTargets,
    [CampaignKeys.customInstructions]:
      campaignParams?.custom_instructions ?? [],
    [CampaignKeys.genStatus]: campaign.campaign_status?.gen_status ?? {},
    [CampaignKeys.enableAutoSync]: campaignParams?.enable_auto_sync ?? false,
    [CampaignKeys.inboundLandingPages]: {
      enabled: campaignParams?.inbound_landing_pages?.enabled ?? false,
      selectedTargetField: campaignParams?.inbound_landing_pages?.target_field,
    },
  };

  return campaignChange;
};

export const calculateFixedButtonsPaddingRight = (panelWidth: number) => {
  const minWidth = 20;
  const maxWidth = 80;
  const minPadding = 58;
  const maxPadding = 87;

  const interpolatedPadding =
    minPadding +
    ((Math.max(minWidth, Math.min(maxWidth, panelWidth)) - minWidth) /
      (maxWidth - minWidth)) *
      (maxPadding - minPadding);

  return Math.round(interpolatedPadding);
};
