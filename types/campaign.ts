export type ComponentInReviewProps = {
  text: string;
  meta: {
    order: number;
    component_type: string;
    precedingContent: string;
    succeedingContent: string;
    template_field_name: string;
    time_added: number;
    isEmailSubject: boolean;
  };
};

export type ComponentInReviewGroup = {
  [key: string]: ComponentInReviewProps;
}[];

export type ComponentVariation = {
  request_id: string;
  label: 'Current' | 'Original' | number;
  selected: boolean;
  value: string;
};

type TemplateSettings = {
  follow_tone: boolean;
  follow_length: boolean;
  tone_reference: string | null;
  follow_core_message_and_key_point: boolean;
};

type ContentGroupParams = {
  targets: Record<string, string>;
  content_type: string;
  initialSetup: boolean;
  content_source: string;
  hubspotEmailId: string | null;
  no_rename_alert: boolean;
  template_settings: TemplateSettings;
  content_source_copy: string;
  custom_instructions: any[]; // Replace `any` with a more specific type if known
  content_source_format: string;
  export_content_source_copy: string;
  content_source_upload_method: string;
};

type ComponentMeta = {
  time_added: number;
  component_type: string | null;
  isEmailSubject: boolean;
  precedingContent: string;
  succeedingContent: string;
};

type Component = {
  meta: ComponentMeta;
  text: string;
};

type ContentParams = {
  targets: Record<string, string>;
  content_source: string;
  no_rename_alert: boolean;
  content_source_copy: string;
  content_type?: string; // Optional, as it may not be present in all cases
  content_source_format?: string; // Optional
  content_source_upload_method?: string; // Optional
};

type Content = {
  id: number;
  content_name: string;
  content_params: ContentParams;
  updated_at: string;
  created_at: string;
};

type GenStatusContent = {
  status: string;
  update_time?: string;
};

type GenStatus = {
  status: string;
  contents: Record<number, GenStatusContent>;
};

type ContentGroupStatus = {
  status: string;
  gen_status: GenStatus;
};

type ContentGroup = {
  id: number;
  creator: number;
  campaign: number;
  content_group_name: string;
  content_group_params: ContentGroupParams;
  content_group_status: ContentGroupStatus;
  components: Record<string, Component>;
  contents: Content[];
  updated_at: string;
  created_at: string;
};

type GenStatusByGroup = {
  status: string;
  contents: Record<number, GenStatusContent>;
};

type GenStatusOverall = {
  status: string;
  content_groups: Record<number, GenStatusByGroup>;
};

type Target = {
  [key: string]: string[];
};

export type AppCampaign = {
  campaignId: number;
  playbookId: number;
  campaignName: string;
  campaignGoal: 'Personalization' | 'Repurpose Content';
  contentGroups: ContentGroup[];
  campaignStage: string;
  targets: Target[];
  assets: Record<string, unknown>; // Assuming it's an empty object or can have other shapes
  foundationModel: string;
  allSelectedTargets: any[]; // Replace `any` with a more specific type if known
  customInstructions: any[]; // Replace `any` with a more specific type if known
  genStatus: GenStatusOverall;
  enableAutoSync: boolean;
};
