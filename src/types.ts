export type Frontmatter = {
  title: string;
  date: string;
  isHiddenFromPosts?: boolean;
  thumbnail?: {
    childImageSharp: {
      sizes: {
        src: string;
      };
    };
  };
};
