export interface IGroup {
  name: string;
  flag: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  group: string;
}

export interface IMatch {
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  group: string;
  status: string;
  channel: string;
}

export interface INews {
  title_en: string;
  title_ar: string;
  title_fr: string;
  category: string;
  image: string;
  date: string;
  content_en: string;
  content_ar: string;
  content_fr: string;
}