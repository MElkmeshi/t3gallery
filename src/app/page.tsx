// import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/3ef66633-e33a-40dc-a9e7-8411eb9bae08-e7sy1c.jpg",
  "https://utfs.io/f/9b150bd1-4a40-4abe-ab7c-73ed827a6334-2b7dke.jpg",
  "https://utfs.io/f/bdbc2266-3e5a-419a-81da-eee372791a08-2dkq.jpg",
  "https://utfs.io/f/e911eea3-a552-43e5-9afd-50007f7e5437-1u33b.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index,
  url: url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="" />
          </div>
        ))}
      </div>
    </main>
  );
}
