import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import { baseUrl, generateId } from "@/utils";

// // /api/job-vacancy?query=<value>&category=<value>...

export async function GET (request: NextRequest) {
  const {href} = request.nextUrl
  
  let query = ""

  //Ini harus dari sisi client
  // let startPage = 0
  // let endPage = 9
  // let offset = 10

  if(href.includes("?")) {
    query = href.split('?').pop() || ""
  }

  let getJobVacancyUrl = baseUrl + `/job-vacancy`

  if(query) {
    getJobVacancyUrl += `?${query}`
  }

  // getJobVacancyUrl += `${query ? '&' : '?'}_start=${startPage}&_end=${endPage}`

  // console.log(getJobVacancyUrl);

  const res = await fetch(getJobVacancyUrl)
  
  const data: JobVacancy[] = await res.json()

  if(!res.ok || data.length < 1) {
    return NextResponse.json({
      message: "No Data"
    }, {status: res.status || 500 });
  }

  return NextResponse.json(data)
}

export async function POST (request: NextRequest) {

  const session = await getServerSession(options)
  // console.log(session);
  
  const req = await request.json()
  
  const jobVacancyUrl = baseUrl + "/job-vacancy";

  if(session?.user?.role !== "company" ) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }

  const newData: JobVacancy = {
    ...req,
    id: generateId(),
    userId: session.user.id,
    // isActive: true,
    // createdAt: new Date().toISOString(),
    // updatedAt: new Date().toISOString(), 
  }

  try {

    const res = await fetch(jobVacancyUrl, {
      method: 'post',
      body: JSON.stringify(newData),
    })

    if(!res.ok) {
      return NextResponse.json({
        error: "Failed",
        message: "Something went wrong", 
  
      }, {status: res.status || 500});
    }

    return NextResponse.json({
      message: "Job successfully added"
    }, {status: 201})

  } catch (error) {
    console.error(error)
  } 
}

