import { baseUrl } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { href } = request.nextUrl;
  // console.log("job id:", userId);

  let query = "";

  // console.log("params dId: ", params.id);
  
  if (!params.id) {
    return NextResponse.json(
      {
        error: "User Not Found",
      },
      { status: 404 }
    );
  }

  if (href.includes("?")) {
    query = href.split("?").pop() || "";
  }

  let detailUserUrl = baseUrl + `/user/${params.id}`;

  if (query) {
    detailUserUrl += `?${query}`;
  }

  // console.log(detailJobUrl);

  const res = await fetch(detailUserUrl);

  const data: JobVacancy = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      {
        message: "No Data",
      },
      { status: res.status || 500 }
    );
  }

  return NextResponse.json(data);
}