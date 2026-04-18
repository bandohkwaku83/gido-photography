import { GalleryItemClient } from "./GalleryItemClient";
import { demoMedia } from "../../components/demoMedia";

export default async function GalleryItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GalleryItemClient id={id} items={demoMedia} />;
}


