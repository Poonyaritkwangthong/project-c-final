import Image from "next/image";
import Appbar from "./components/appbar";
import Picture from "./components/picture";
import Content from "./components/content";
import LayoutApp from "@/layouts/LayoutApp";

export default function Home() {
  return (
    <LayoutApp>
      <Appbar/>
      <Picture/>
      <Content/>
    </LayoutApp>
  );
}
