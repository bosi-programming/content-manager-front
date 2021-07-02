export enum EnumMedia {
  BOOK = "BOOK",
  ARTICLE = "ARTICLE",
  BLOGPOST = "BLOGPOST",
  MOVIE = "MOVIE",
  WEBVIDEO = "WEBVIDEO",
}

export interface IMedia {
  _id: string;
  mediaName: string;
  authorId: string;
  publisher?: string;
  dateOfPublication: Date;
  typeOfMedia: EnumMedia;
  link?: string;
}

