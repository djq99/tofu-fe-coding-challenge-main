type DocRetrievedByKey<T> = {
  id: string;
  type: string;
  keyword: string;
  isNew?: boolean;
  value: T;
  position: number;
};

type SearchResult = {
  site_name: string;
  url: string;
  title: string;
  description: string;
  type: string;
  checked: boolean;
};

export type DefaultDocType = DocRetrievedByKey<string>;
export type SearchResultDocType = DocRetrievedByKey<SearchResult[]>;

export type TargetInfoRetrievedByKey = {
  id: number;
  docs: Record<string, DefaultDocType | SearchResultDocType>;
  meta: {
    brief: string;
    marketo: {};
    position: number;
    last_edited_at: string;
    last_edited_by?: string;
  };
  summary: string | null;
  index: null;
  docs_last_build: TargetInfoRetrievedByKey["docs"];
  docs_build_status?: unknown | null;
  target_key: string;
  value_prop: string;
};

export type TargetInfoExtractedExternalResults = {
  links: Omit<SearchResult, "checked">[];
};

export type TargetInfoExternalResultsPayload = {
  keyword: string;
  num_links: number;
  include_sitelinks: boolean;
};
