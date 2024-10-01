
//buat applicant
declare global {
  interface ApplyJob {
    id: string
    jobId: string
    candidateId: string
    note?: string
    status: "ongoing" | "accepted" |"rejected"
    appliedAt: string
  }
}

export {}