import { formatDate } from "@/utils";

export default function MyApplicationTableRow({
  vacancy,
  filteredApplicant,
  filteredCompany,
  index,
}: {
  // Object utama utk dirender itu applicant
  vacancy: JobVacancy;
  filteredApplicant: ApplyJob[];
  filteredCompany: UserFiltered[];
  index: number;
}) {
  const applicant = () => {
    const findApplicant = filteredApplicant.find(
      (applicant) => applicant.jobId === vacancy.id
    );
    return {
      appliedAt: findApplicant?.appliedAt,
      status: findApplicant?.status,
    };
  };

  // console.log(filteredApplicant);
  // console.log("log");
  // console.log(filteredCompany);
  // console.log(vacancy);

  const company = () => {
    const findCompany = filteredCompany.find(
      (company) => company.id === vacancy.userId
    );
    return findCompany?.name;
  };

  const { status, appliedAt } = applicant();
  const name = company();

  return (
    <tr>
      <th>{index}</th>
      <td className="flex items-center gap-2">
        <img src="/logo-nomad.svg" alt="nomad" className="max-w-full h-auto" />
        {name}
      </td>
      <td>{vacancy?.title}</td>
      <td>{formatDate(appliedAt as string)}</td>
      <td>
        <div
          className={`rounded-xl w-fit border border-solid
              ${
                status === "ongoing"
                  ? "border-yellow text-yellow"
                  : status === "accepted"
                  ? "border-green text-green"
                  : status === "rejected"
                  ? "border-red text-red"
                  : ""
              } capitalized text-center py-1 px-2`}
        >
          {status === "ongoing" ? "on going" : status}
        </div>
      </td>
    </tr>
  );
}
