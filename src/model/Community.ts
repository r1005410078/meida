export interface CommunityFrom {
  community_name: string;
  region: string[];
  year_built: number;
  community_type: string;
  property_management_company: string;
  description: string;
  city?: string;
  state?: string;
  postal_code?: string;
}

export interface Community {
  community_name: string;
  region: string;
  city: string;
  state: string;
  postal_code: string;
  year_built: number;
  community_type: string;
  property_management_company: string;
  description?: string;
  created_at: string;
  updated_at: string;
}
