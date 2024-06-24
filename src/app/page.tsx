import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            width={250}
            height={250}
            alt={image.name}
          />
        ))}
      </div>
    </main>
  );
}
