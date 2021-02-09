export interface IBlog {
  name: String;
  description: String;
  startDate: Date;
  likes:[any];
  rating:Number;
  endDate: Date;
  image: String;
  images: [String];
  isFeatured: Boolean;
  isMainFeatured: Boolean;
  createdAt: String;
  updatedAt: String;
  youtubeUri: String;
}
