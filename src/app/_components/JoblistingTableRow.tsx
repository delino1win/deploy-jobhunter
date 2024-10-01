import { formatDate, jobHunterUrl } from "@/utils";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function JoblistingTableRow({ item }: { item: JobVacancy }) {
  const router = useRouter();

  if (!item) return null;

  async function handleDelete() {
    const result = await Swal.fire({
      icon: "question",
      title: "Delete Job",
      text: `Are you sure want to delete ${item.title}?`,
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
    });

    try {
      if (result.isConfirmed) {
        const res = await fetch(
          jobHunterUrl + `/api/job-vacancy/${item.id}`,
          {
            method: "delete"
          }
        );

        if (!res.ok) {
          return await Swal.fire({
            icon: "error",
            title: "Error occured",
            text: `${res.statusText}, error code: ${res.status}`,
            showCloseButton: true,
          });
        }

        await Swal.fire({
          icon: "success",
          title: "Delete success",
          showCloseButton: true,
        });

        return window.location.reload()
      }
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "error",
        title: "Error on Delete",
      });
    }
  }

  return (
    <tr>
      <td>{item.title}</td>
      <td>{item.category}</td>
      <td>{formatDate(item.createdAt)}, {item.isActive ? "Open": "Close"}</td>
      <td>{item?.jobType}</td>
      <td>TBA</td>
      <td>
        <button onClick={() => handleDelete()} className="bg-transparent">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_178_2112)">
              <path
                d="M4 7H20"
                stroke="#202430"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 11V17"
                stroke="#202430"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11V17"
                stroke="#202430"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7"
                stroke="#202430"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                stroke="#202430"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_178_2112">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </td>
    </tr>
  );
}
