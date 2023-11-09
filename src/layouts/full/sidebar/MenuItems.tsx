import {
  IconBrandMessenger,
  IconArticle,
  IconSmartHome,
  IconSettings,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Цэс'
  },
  {
    id: uniqueId(),
    title: "Нүүр хуудас",
    icon: IconSmartHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Нийтлэл",
    icon: IconArticle,
    href: "/posts",
  },
  {
    id: uniqueId(),
    title: "Сэтгэгдэл",
    icon: IconBrandMessenger,
    href: "/comments",
  },
  {
    id: uniqueId(),
    title: "Тохиргоо",
    icon: IconSettings,
    href: "/config",
  },
  // {
  //   id: uniqueId(),
  //   title: "Тайлан",
  //   icon: IconClipboardData,
  //   href: "/report",
  // },
];

export default Menuitems;
