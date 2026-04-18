export type MediaItem =
  | {
      id: string;
      kind: "image";
      title: string;
      src: string;
      width: number;
      height: number;
    }
  | {
      id: string;
      kind: "video";
      title: string;
      src: string;
      poster?: string;
      width: number;
      height: number;
    };

// Demo list wired to assets you already have under /public/images/...
// You can expand this anytime (just keep ids unique).
export const demoMedia: MediaItem[] = [
  {
    id: "featured-1",
    kind: "image",
    title: "Featured 1",
    src: "/images/featured/GIDO8549-1-min.jpg",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-2",
    kind: "image",
    title: "Featured 2",
    src: "/images/featured/IMG_1736-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-3",
    kind: "image",
    title: "Featured 3",
    src: "/images/featured/GIDO_7785-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-4",
    kind: "image",
    title: "Featured 4",
    src: "/images/featured/IMG_0089-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-5",
    kind: "image",
    title: "Featured 5",
    src: "/images/featured/IMG_5891-min.jpg",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-6",
    kind: "image",
    title: "Featured 6",
    src: "/images/featured/IMG_3150-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-7",
    kind: "image",
    title: "Featured 7",
    src: "/images/featured/IMG_4149-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-8",
    kind: "image",
    title: "Featured 8",
    src: "/images/featured/IMG_4244-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-9",
    kind: "image",
    title: "Featured 9",
    src: "/images/featured/IMG_4306-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-10",
    kind: "image",
    title: "Featured 10",
    src: "/images/featured/IMG_4307-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-11",
    kind: "image",
    title: "Featured 11",
    src: "/images/featured/IMG_5336-min.JPG",
    width: 1600,
    height: 1067,
  },
  {
    id: "featured-12",
    kind: "image",
    title: "Featured 12",
    src: "/images/featured/GIDO00281-min.JPG",
    width: 1600,
    height: 1067,
  },
];


