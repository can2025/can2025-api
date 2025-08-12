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
  id: number;
  homeTeam_en: string;
  homeTeam_ar: string;
  homeTeam_fr: string;
  awayTeam_en: string;
  awayTeam_ar: string;
  awayTeam_fr: string;
  homeFlag: string;
  awayFlag: string;
  date_en: string;
  date_fr: string;
  date_ar: string;
  time: string;
  venue_en: string;
  venue_ar: string;
  venue_fr: string;
  city_en: string;
  city_ar: string;
  city_fr: string;
  group_en: string;
  group_ar: string;
  group_fr: string;
  status: string;
  channel_en: string;
  channel_ar: string;
  channel_fr: string;
  scoreHomeTeam : Number;
  scoreAwayTeam : Number;
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

export interface ICity {
  id: number;
  name_en: string;
  name_ar: string;
  name_fr: string;
  title1_en: string;
  title1_ar: string;
  title1_fr: string;
  content1_en: string;
  content1_ar: string;
  content1_fr: string;
  title2_en: string;
  title2_ar: string;
  title2_fr: string;
  content2_en: string;
  content2_ar: string;
  content2_fr: string;
  image1: string;
  image2: string;
  stadiumname_en: string;
  stadiumname_ar: string;
  stadiumname_fr: string;
  stadiumcapacity : number;
  stadiumlocation: string;
}