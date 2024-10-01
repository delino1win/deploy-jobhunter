import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { baseUrl, generateId } from "@/utils";
import { options } from "../../auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";

export async function GET (request: NextRequest) {
  const {href} = request.nextUrl
  const jobId = href.split('/').pop()
  // console.log("job id:", jobId);
  
  let query = ""

  if(!jobId) {
    return NextResponse.json({
      error: "Resource Not Found",
    }, {status: 404 });
  }

  if(href.includes("?")) {
    query = href.split('?').pop() || ""
  }

  let detailJobUrl = baseUrl + `/job-vacancy/${jobId}`

  if(query) {
    detailJobUrl += `?${query}`
  }

  // console.log(detailJobUrl);

  const res = await fetch(detailJobUrl)
  
  const data: JobVacancy = await res.json()

  if(!res.ok) {
    return NextResponse.json({
      message: "No Data"
    }, {status: res.status || 500 });
  }

  return NextResponse.json(data)
}

export async function PUT (request: NextRequest) {

  const session = await getServerSession(options)
  const {href} = request.nextUrl
  const jobId = href.split("/").pop()
  
  const req: JobVacancy = await request.json()

  if(!session?.user || session?.user?.role !== "company" ) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }

  if(!jobId) {
    return NextResponse.json({
      error: "Resource Not Found",
    }, {status: 404 });
  }

  const deleteJobUrl = baseUrl + "/job-vacancy" + `/${jobId}`;

  const updatedData: JobVacancy = {
    ...req,
    updatedAt: new Date().toISOString()
  }

  try {

    const res = await fetch(deleteJobUrl, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })

    if(!res.ok) {
      return NextResponse.json({
        error: "Failed",
        message: "Update Failed", 
  
      }, {status: res.status || 500});
    }

    return NextResponse.json({
      message: "Job successfully Updated"
    }, {status: 201})

  } catch (error) {
    console.error(error)
  } 
}

export async function DELETE (request: NextRequest, {params} : {params: {jobId: string}}) {

  const session = await getServerSession(options)

  // console.log(session);

  if(!session?.user || session?.user?.role !== "company" ) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }

  const {href} = request.nextUrl
  // const jobId = href.split("/").pop()

  // console.log(!jobId);

  if(!params.jobId) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }

  // if(!jobId) {
  //   return NextResponse.json({
  //     error: "Resource Not Found",
  //   }, {status: 404 });
  // }

  // const resJobDetail = await fetch(`/api/job-vacancy/${jobId}`)

  const deleteJobUrl = baseUrl + "/job-vacancy" + `/${params.jobId}`;

 try {
    const res = await fetch(deleteJobUrl, {
      method: 'delete'
    })

    if(!res.ok) {
      return NextResponse.json({
        error: "Failed",
        message: "Delete Failed", 
  
      }, {status: res.status || 500});
    }

    return NextResponse.json({
      message: "Job successfully Deleted"
    }, {status: 200})

  } catch (error) {
    console.error(error)
  } 
}