import { getAllPoems } from "@/lib/poems";
import PoemList from "@/components/PoemList";

export default async function Home() {
  const poems = await getAllPoems();
  return <PoemList poems={poems} />;
}
