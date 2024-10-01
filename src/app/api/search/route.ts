import { getServerSession } from "next-auth"
import { options } from "../auth/[...nextauth]/options"
import { NextRequest, NextResponse } from "next/server"
import { baseUrl, generateId } from "@/utils";
import Fuse from "fuse.js";

// /api/search?query=
export async function GET (request: NextRequest) {
  // const {href} = request.nextUrl
  const search = request.nextUrl.searchParams.get("query")?.trim() || ""

  console.log("query:", search);
  
  if(!search) {
    return NextResponse.json({
      message: "Missing Query Paramater"
    }, {status: 400 });
  }

  let getJobVacancyUrl = baseUrl + `/job-vacancy`
  
  const res = await fetch(getJobVacancyUrl)
  
  const data: JobVacancy[] = await res.json()

  const options = {
    keys: ['title', 'category', 'location', 'companyName'],
    includeScore: true,
  }

  const fuse = new Fuse(data, options)
  const fuseResult = fuse.search(search)

  // console.log(fuseResult);

  if(!res.ok || data.length < 1) {
    return NextResponse.json({
      message: "No Data"
    }, {status: res.status || 500 });
  }

  return NextResponse.json(fuseResult)
}


// // /api/search?query=
// export async function GET (request: NextRequest) {
//   const {href} = request.nextUrl
//   const search = request.nextUrl.searchParams.get("query")?.trim() || ""

//   console.log("query:", search);
  
//   if(!search) {
//     return NextResponse.json({
//       message: "Missing Query Paramater"
//     }, {status: 400 });
//   }
  
//   let additionalParams = ""
//   //Ini harus dari sisi client
//   // let startPage = 0
//   // let endPage = 9
//   // let offset = 10

//   if(href.includes("&")) {
//     const findIndex = href.indexOf("&")
//     const takeoutParams = href.slice(findIndex)
//     additionalParams = takeoutParams
//   }

//   let getJobVacancyUrl = baseUrl + `/job-vacancy?q=${search}`
  

//   if(additionalParams) {
//     getJobVacancyUrl += additionalParams
//   }

//   console.log("url: ", getJobVacancyUrl);
  


//   const res = await fetch(getJobVacancyUrl)
  
//   const data: JobVacancy[] = await res.json()

//   if(!res.ok || data.length < 1) {
//     return NextResponse.json({
//       message: "No Data"
//     }, {status: res.status || 500 });
//   }

//   return NextResponse.json({
//     result: data.length,
//     data: data
//   })
// }
