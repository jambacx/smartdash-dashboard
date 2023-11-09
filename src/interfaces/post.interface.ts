export interface Post {
  id: string;
  page_id: string;
  category: string;
  message: string;
  created_time: Date;
  expire_time: Date;
  share_count: number;
  WOW: number;
  ANGRY: number;
  CARE: number;
  HAHA: number;
  LOVE: number;
  SAD: number;
}
