import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { country: string } }
) {
  await sleep1Second();

  const country = params.country;

  if (country === "Italy") {
    return NextResponse.json(
      { message: "Sorry Italian friends :)" },
      { status: 500 }
    );
  }

  if (country === "France") {
    return NextResponse.json(
      ["Peugeot", "Citroen", "Renault", "Alpine", "etc..."],
      { status: 200 }
    );
  }

  if (country === "Germany") {
    return NextResponse.json(
      ["Mercedes", "BMW", "Audi", "Porsche", "VW", "etc..."],
      { status: 200 }
    );
  }
}

function sleep1Second() {
  return new Promise((res) => {
    setTimeout(res, 1000);
  });
}
