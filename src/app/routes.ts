import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Diary } from "./components/Diary";
import { TextEditor } from "./components/TextEditor";
import { DiaryEntry } from "./components/DiaryEntry";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "diary", Component: Diary },
      { path: "diary/:id", Component: DiaryEntry },
      { path: "editor", Component: TextEditor },
    ],
  },
]);
