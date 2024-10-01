import { jobHunterUrl } from "./utils"


export async function getListJobVacancy (query?: string) {

  let endpointUrl = jobHunterUrl + '/api/job-vacancy'

  if(query) {
    endpointUrl += `?${query}`
  }

  const res = await fetch(endpointUrl, {
    method: "get",
    // cache: "no-store"
  })

  const data = await res.json()

  if(!res.ok) {
    return
  }
  return data
}

export async function getAllApplicant (query?: string) {

  let endpointUrl = jobHunterUrl + '/api/apply-job'

  if(query) {
    endpointUrl += `?${query}`
  }

  const res = await fetch(endpointUrl, {
    method: "get",
    // cache: "no-store"
  })

  // console.log(res.status);

  const data = await res.json()


  if(!res.ok) {
    return
  }
  return data
}

//ini dapatin semua user tanpa melibatkan data sensi
export async function getAllUser (query?: string) {

  let endpointUrl = jobHunterUrl + '/api/user-profile'

  if(query) {
    endpointUrl += `?${query}`
  }

  const res = await fetch(endpointUrl, {
    method: "get",
    // cache: "no-store"
  })

  // console.log(res.status);

  const data = await res.json()

  if(!res.ok) {
    return
  }
  return data
}


// dapatin detail profile berdasarkan detailId di /user
export async function getDetailProfile (detailId: string) {

  try {
    const res = await fetch(jobHunterUrl + `/api/user-profile/${detailId}`)

    if(!res.ok) {
      throw new Error(res.statusText)
    }

    const result: CompanyProfile | CandidateProfile = await res.json()

    // console.log("result: ", result);
    
    return result

  } catch (error) {
    console.error(error)
  }
}



