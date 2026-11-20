export type PostKind = "achievement" | "activity" | "announcement";
export type AuthorVariant = "child" | "system";

export type FeedPost = {
  id: string;
  kind: PostKind;
  authorName: string;
  authorInitials: string;
  authorVariant: AuthorVariant;
  time: string;
  audience: string;
  body: string;
  photoLabel?: string;
  likes: number;
  comments: number;
};

export const teacher = {
  name: "Caro Giménez",
  initials: "C",
  role: "Maestra · Soles",
  room: "Sala Soles",
  greeting: "Buenas, Caro",
  summary: "12 niños · martes 17 jun",
};

export const feedPosts: FeedPost[] = [
  {
    id: "post-achievement-mateo",
    kind: "achievement",
    authorName: "Mateo",
    authorInitials: "M",
    authorVariant: "child",
    time: "14:20",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-activity-mateo",
    kind: "activity",
    authorName: "Mateo",
    authorInitials: "M",
    authorVariant: "child",
    time: "09:40",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoLabel: "Foto · pintando con témperas",
    likes: 5,
    comments: 2,
  },
  {
    id: "post-announcement-general",
    kind: "announcement",
    authorName: "Anuncio general",
    authorInitials: "",
    authorVariant: "system",
    time: "07:50",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];