import { NextResponse } from "next/server";
import { setTimeout } from "timers/promises";

import type { Photo } from "@/types/photo.type";

export async function POST(request: Request) {
  await setTimeout(1000);

  const photo: Photo = await request.json();
  const newPhoto = { ...photo, favorite: !photo.favorite };
  return NextResponse.json(newPhoto);
}
