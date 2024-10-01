import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { baseUrl, generateId } from "@/utils";
import { options } from "../auth/[...nextauth]/options";


//Jadi route api /apply-job ini akan digunakan oleh 2 category user terotentikasi
  //List pekerjaan yang di apply oleh si applicant (rencananya)
  //List user yang apply ke job vacancy berdasarkan company


// ini masih general dapatin semua list
export async function GET (request: NextRequest) {
  const session = await getServerSession(options)
  
  const {href} = request.nextUrl

  if(!session?.user) {
    return NextResponse.json({
      error: "Unauthorized",
    }, {status: 401 });
  }

  let query = ""
  // let startPage = 0
  // let endPage = 9
  // let offset = 10

  if(href.includes("?")) {
    query = href.split('?').pop() || ""
  }

  let applicantUrl = baseUrl + `/applicant`

  if(query) {
    applicantUrl += `?${query}`
  }

  const res = await fetch(applicantUrl)
  
  const data: ApplyJob[] = await res.json()

  if(!res.ok || data.length < 1) {
    return NextResponse.json({
      message: "No Data"
    }, {status: res.status || 500 });
  }

  return NextResponse.json(data)

}


// export async function POST (request: NextRequest) {

//   const session = await getServerSession(options)
//   const req: ApplyJob= await request.json()

//   console.log(session);
  
//   const applyJobUrl = baseUrl + "/applicant";

//   if(session?.user?.role !== "candidate") {
//     return NextResponse.json({
//       error: "Unauthorized",
//     }, {status: 401 });
//   }

//   const newData: ApplyJob = {
//     id: generateId(),
//     jobId: req.jobId,
//     candidateId: session.user.id,
//     isOffered: false,
//     appliedAt: new Date().toISOString() 
//   }

//   try {

//     const res = await fetch(applyJobUrl, {
//       method: 'post',
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newData),
//     })

//     if(!res.ok) {
//       return NextResponse.json({
//         error: "Failed",
//         message: "Something went wrong", 
  
//       }, {status: res.status || 500});
//     }

//     return NextResponse.json({
//       message: "Job successfully Applied"
//     }, {status: 201})

//   } catch (error) {
//     console.error(error)
//   } 
// }