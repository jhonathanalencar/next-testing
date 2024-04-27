import { type NextRequest, NextResponse } from "next/server";
import { setTimeout } from "timers/promises";

export async function GET(request: NextRequest) {
  await setTimeout(1000);

  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");

  // return new Response("This is a message from my server about the error", {
  //   status: 500,
  // });

  return NextResponse.json([
    {
      id: 1,
      title: `${
        name || "Unknown"
      }: accusamus beatae ad facilis cum similique qui sunt`,
      thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
      favorite: false,
    },
    {
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
      favorite: false,
    },
    {
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
      favorite: false,
    },
    {
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
      favorite: false,
    },
    {
      id: 5,
      title: "natus nisi omnis corporis facere molestiae rerum in",
      thumbnailUrl: `https://picsum.photos/150/150?${Math.random()}`,
      favorite: false,
    },
  ]);
}
