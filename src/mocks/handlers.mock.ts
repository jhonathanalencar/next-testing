import { Photo } from "@/types/photo.type";
import { HttpResponse, http } from "msw";

const mockGetPhotosResponse = [
  {
    id: 1,
    thumbnailUrl: "/photo1.png",
    title: ": Hello World",
    favorite: false,
  },
];

export const handlers = [
  http.get("/api/photos", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") || "Unknown";

    const response = mockGetPhotosResponse;

    response[0].title = `${name}${response[0].title}`;

    return HttpResponse.json(response, { status: 200 });
  }),
  http.post<{}, Photo>("/api/favorite", async ({ request }) => {
    const photo = await request.json();

    return HttpResponse.json(
      { ...photo, favorite: !photo.favorite },
      { status: 201 }
    );
  }),
];
