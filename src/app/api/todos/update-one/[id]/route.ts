import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  console.log(id);
  return NextResponse.json({ message: "Update one" });
}
