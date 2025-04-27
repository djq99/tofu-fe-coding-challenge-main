import { ContentTypeValues } from 'utils/sharedTypes';

type Meta = {
  precedingContent: string;
  succeedingContent: string;
  time_added: number;
  order?: number;
  component_type: string;
  isEmailSubject: boolean;
};

type Component = {
  text: string;
  meta: Meta;
};

type TemplateSettings = {
  follow_tone: boolean;
  follow_length: boolean;
  tone_reference: string | null;
  follow_core_message_and_key_point: boolean;
};

type Result = {
  id: number;
  params: {
    targets: any;
    num_of_variations: number;
  };
  variations: Record<
    string,
    {
      meta: {
        time_added: number;
        variations: {
          meta: {
            request_id: string;
            gen_runtime: number;
            runtime_seconds: number;
            postprocess_runtime: number;
          };
          text: string;
        }[];
        component_type: string;
        isEmailSubject: boolean;
        current_version: {
          text: string;
          request_id: string;
        };
        precedingContent: string;
        succeedingContent: string;
        current_variation_index: number;
      };
      text: string;
    }
  >;

  updated_at: string;
  created_at: string;
  content: number;
};

export type AppContent = {
  contentId: number;
  contentGroup: number;
  campaignId: number;
  contentName: string;
  contentGroupName: string;
  contentType: ContentTypeValues;
  contentSourceUploadMethod: string;
  contentSourceFormat: string;
  contentSource: string;
  contentSourceCopy: string;
  repurposeTemplateContentSourceCopy: string;
  subjectLineOnlyContentSourceCopy: string | null;
  slateRepurposeTemplateContentSourceCopy: string | null;
  subjectLineOnlyContnetSourceCopy: any; // Assuming it's an empty object or can have other shapes
  targets: Record<string, unknown>; // Assuming it's an empty object or can have other shapes
  assets: Record<string, unknown>; // Assuming it's an empty object or can have other shapes
  customInstructions: any[]; // Assuming an array of custom instructions, type `any` can be replaced with a more specific type if needed
  template_settings: TemplateSettings;
  components: any;
  results: Result[];
  initialSetup: boolean;
  template: any | null; // Replace `any` with a more specific type if known
  contentCollection: any | null; // Replace `any` with a more specific type if known
  reviewedContentList: any[]; // Assuming an array of reviewed content, type `any` can be replaced with a more specific type if needed
  hubspotEmailId?: string;
};
