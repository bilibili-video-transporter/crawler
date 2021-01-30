export interface WeiboItem {
  media_id: number;
  oid: string;
  mid: number;
  title: string;
  avatar: string;
  verified: boolean;
  verified_type: number;
  verified_type_ext: number;
  nickname: string;
  date: string;
  play_count: string;
  duration: string;
  cover_image: string;
  tags: null;
  recom_info: string;
}

export interface WeiboResponse {
  code: string;
  data: {
    Component_Home_Recommend: {
      list: Array<WeiboItem>;
      next_cursor: number;
    };
    m: null;
    n: null;
  };
  msg: string;
}

export interface Crawler<T> {
  get(url: string, formData: string): Promise<Array<T>>;
}
