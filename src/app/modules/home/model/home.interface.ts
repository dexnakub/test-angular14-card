// import { Posts } from "./posts.interface";

// export interface Authors {
//     posts: Posts[];
//     id: number;
//     name: string;
//     role: string;
//     place: string;
//     avatar_url: string;
//   }

export interface Authors {
  id: number;
  name: string;
  avatar_url: string;
  role: string;
  place: string;
}

export interface Posts {
  id: number
  author_id: number;
  title: string;
  body: string;
  image_url: string
  created_at: string;
}

export interface AuthorWithPosts {
  id: number;
  avatar_url: string;
  name: string;
  role: string;
  place: string;
  created_at: Date;
  image_url: string;
  title: string;
  body: string;
}

export interface Timezone {
  name?: string;
  offset: number;
}