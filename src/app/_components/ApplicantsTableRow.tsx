import { formatDate } from "@/utils";
import Link from "next/link";

export default function ApplicantsTableRow({
  applicant,
  listUser,
  listJob,
}: {
  // Object utama utk dirender itu applicant
  applicant: ApplyJob;
  listUser: UserFiltered[];
  listJob: JobVacancy[];
}) {
  function userName() {
    // for (let i = 0; i < listUser.length; i++) {
    //     if (applicant.candidateId === listUser[i].id) {
    //       return listUser[i].name;
    //     }
    // }

    const findUser = listUser.find((user) => user.id === applicant.candidateId);
    return findUser?.name || "";
  }

  function title() {
    // for (let i = 0; i < listJob.length; i++) {
    //     if (applicant.jobId === listJob[i].id) {
    //       return listJob[i].title;
    //     }
    // }
    const findTitle = listJob.find((user) => user.id === applicant.jobId);
    return findTitle?.title || "";
  }

  return (
    <>
      <tr>
        <td className="flex items-center gap-2">
          <img src="/img-user.svg" alt="nomad" className="max-w-full h-auto" />
          {userName()}
        </td>
        <td>
          <div
            className={`rounded-xl w-fit border border-solid
              ${
                applicant.status === "ongoing"
                  ? "border-yellow text-yellow"
                  : applicant.status === "accepted"
                  ? "border-green text-green"
                  : applicant.status === "rejected"
                  ? "border-red text-red"
                  : ""
              } capitalized text-center py-1 px-2`}
          >
            {applicant.status}
          </div>
        </td>
        <td>{formatDate(applicant.appliedAt)}</td>
        <td>{title()}</td>
        <td>
          <Link
            href={`/company/applicants/${applicant.id}/${applicant.candidateId}`}
            className="bg-steel-blue text-white font-bold capitalize border border-solid border-steel-blue text-center transition px-[24px] py-[12px] hover:text-steel-blue hover:bg-white"
          >
            see details
          </Link>
        </td>
      </tr>
    </>
  );
}
