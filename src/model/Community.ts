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

  created_by: string;
  updated_by: string;
  // 创建时间
  created_at: string;
  // 更新时间
  updated_at: string;
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

  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
}
