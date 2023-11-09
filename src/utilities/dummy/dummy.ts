export const statusBar = [
  {
    title: "Post / Нийтлэл",
    bgColor: "#EFE4FF",
    color: "#8C7AC5",
    count: 10,
  },
  {
    title: "Comment /  Сэтгэгдэл",
    bgColor: "#CFF3F9",
    color: "#6EC4C8",
    count: 22,
  },
  {
    title: "Reaction / Хандлага",
    bgColor: "#D9E7FF",
    color: "#5E66BB",
    count: 42,
  },
  {
    title: "Share / Хуваалцах",
    bgColor: "#FFF2E2",
    color: "#E3C98A",
    count: 22,
  },
];

export const detailBar = [
  {
    title: "Нийтлэл",
    bgColor: "#EFE4FF",
    color: "#8C7AC5",
    count: 10,
  },
  {
    title: "Сэтгэгдэл",
    bgColor: "#CFF3F9",
    color: "#6EC4C8",
    count: 22,
  },
  {
    title: "Реакшион",
    bgColor: "#D9E7FF",
    color: "#5E66BB",
    count: 42,
  },
];



export const getCategoryColor = (category: any) => {
  switch (category) {
    case "neutral":
      return "#5D87FF";
    case "question":
      return "#EBEBEB";
    case "positive":
      return "#15D9B1";
    case "negative":
      return "#DA6E54";
    default:
      return "#000";
  }
};
