"use client";

import { useEffect, useState } from "react";
import CardFindJobs from "../_components/CardFindJobs";
import SearchBar from "../_components/SearchBar";
import Checkbox from "../_components/Checkbox";
import Fuse from "fuse.js";
import { jobHunterUrl } from "@/utils";
// import { jobType } from "../types/jobVacancy";

const pageSize = 10;

export default function FindJobs() {
  const [jobData, setJobData] = useState<JobVacancy[]>();
  const [jobDataShow, setJobDataShow] = useState<JobVacancy[]>();
  const [locationFilter, setLocationFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [checkBoxTypeEmployment, setCheckboxTypeEmployment] = useState<
    string[]
  >([]);
  const [checkBoxTypeCategory, setCheckboxTypeCategory] = useState<string[]>(
    []
  );
  const [checkBoxTypeRange, setCheckboxRange] = useState<string[]>([]);
  const [isDescending, setIsDescending] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  async function getData(props: {
    location?: string;
    search: string;
    descending?: boolean;
  }) {
    let url = jobHunterUrl + "/api/job-vacancy?page=1&per_page=100";

    const res = await fetch(url);
    const responseJson: JobVacancy[] = await res.json(); //hasil fetch dijadikan json
    let result: JobVacancy[] = []; // buat variabel kosong untuk ditampilkan di akhir

    //cek jika responjson nya ada
    if (responseJson) {
      if (props.search !== "") {
        // search logic
        const options = {
          keys: ["title", "category", "location", "companyName"],
          includeScore: true,
        };

        const fuse = new Fuse(responseJson, options); // menggunakan library fuse
        const fuseResult = fuse.search(props.search);

        // hasil search dari fuse di olah lagi agar types nya sama menggunakan type JobVacancy[]
        result = fuseResult.map((e) => {
          return e.item;
        });
      } else {
        // cek jika response api json server bukan array maka result diisi dengan array kosong
        result = Array.isArray(responseJson) ? responseJson : [];
      }

      if (props?.location) {
        // filter lokasi
        result = result.filter((e) => e.location === props.location);
      }

      if (checkBoxTypeEmployment.length > 0) {
        // filter checkbox employment
        result = result.filter((e) => {
          if (checkBoxTypeEmployment.includes(e.jobType ?? "")) {
            return true;
          }
          return false;
        });
      }

      if (checkBoxTypeCategory.length > 0) {
        // filter checkbox category
        result = result.filter((e) => {
          if (checkBoxTypeCategory.includes(e.category ?? "")) {
            return true;
          }
          return false;
        });
      }

      if (checkBoxTypeRange.length > 0) {
        // filter checkbox salary
        result = result.filter((e) => {
          if (checkBoxTypeRange.includes(e.details.salary ?? "")) {
            return true;
          }
          return false;
        });
      }

      // sorting berdasarkan updatedAt
      if (props.descending) {
        // dari terlama
        result = result.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      } else {
        // dari terbaru
        result = result.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      }

      // simpan hasil result di state jobData
      setJobData(result);
      setPage(1);
      setTotalPage(Math.ceil(result.length / pageSize)); // hitung berapa page yg diperliukan]
      setJobDataShow(paginate(result, 1)); // data yg ditampilkan per halaman
      return;
    }
  }

  useEffect(() => {
    getData({
      location: locationFilter,
      search: searchText,
      descending: isDescending,
    });
  }, []);

  //pagination
  function paginate(array: JobVacancy[], pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  //location
  function locationChange(value: string) {
    setLocationFilter(value);
    getData({ location: value, search: searchText, descending: isDescending });
  }

  //search
  function handleSearch(text: string) {
    setSearchText(text);
    getData({
      location: locationFilter,
      search: text,
      descending: isDescending,
    });
  }

  //button checkbox
  function handleApplyCheckbox() {
    getData({
      location: locationFilter,
      search: searchText,
      descending: isDescending,
    });
  }

  //sort by
  function handleSort(value: string) {
    setIsDescending(value === "oldest");
    getData({
      location: locationFilter,
      search: searchText,
      descending: value === "oldest",
    });
  }

  function handleChechbox(
    value: string,
    checkboxType: "employment" | "category" | "sallary"
  ) {
    if (checkboxType === "employment") {
      handleChechboxEmployment(value);
    } else if (checkboxType === "category") {
      handleChechboxCategory(value);
    } else if (checkboxType === "sallary") {
      handleChechboxRange(value);
    }
  }

  function handleChechboxEmployment(value: string) {
    if (checkBoxTypeEmployment.includes(value)) {
      const removeSelected = checkBoxTypeEmployment.filter((e) => e !== value);
      setCheckboxTypeEmployment(removeSelected);
    } else {
      const selected = [...checkBoxTypeEmployment, value];
      setCheckboxTypeEmployment(selected);
    }
  }

  function handleChechboxCategory(value: string) {
    if (checkBoxTypeCategory.includes(value)) {
      const removeSelected = checkBoxTypeCategory.filter((e) => e !== value);
      setCheckboxTypeCategory(removeSelected);
    } else {
      const selected = [...checkBoxTypeCategory, value];
      setCheckboxTypeCategory(selected);
    }
  }

  function handleChechboxRange(value: string) {
    if (checkBoxTypeRange.includes(value)) {
      const removeSelected = checkBoxTypeRange.filter((e) => e !== value);
      setCheckboxRange(removeSelected);
    } else {
      const selected = [...checkBoxTypeCategory, value];
      setCheckboxRange(selected);
    }
  }

  function handlePagination(value: "plus" | "min" | number) {
    let newPage = 1;
    if (value === "min") {
      if (page > 1) {
        newPage = page - 1;
      }
    } else if (value === "plus") {
      if (page < totalPage) {
        newPage = page + 1;
      } else {
        newPage = page;
      }
    } else {
      newPage = value;
    }
    setPage(newPage);
    setJobDataShow(paginate(jobData ?? [], newPage));
  }

  function openFilter() {
    document.querySelector(".checkboxes")?.classList.add("opened");
    document.body.classList.add("overflow-hidden");
  }

  return (
    <>
      <div className="findJobsWrap">
        <div className="homeHero w-full min-h-[80vh] flex items-center justify-center bg-raisin-black">
          <div className="homeHeroContent relative z-[1]">
            <h1 className="font-bold text-white text-center text-4xl md:text-5xl mb-[25px]">
              Discover more than{" "}
              <span className="text-celestial-blue">5000+ Job</span>
            </h1>
            <p className="text-slate-grey text-center text-[18px] mb-4">
              Find your next career at companies that you desire
            </p>
            <SearchBar handleSearch={handleSearch} />
          </div>
        </div>
        <div className="findJobs relative bg-white px-5">
          <div className="flex flex-wrap justify-between py-20 max-w-[1200px] m-auto">
            <Checkbox
              selectedEmployment={checkBoxTypeEmployment}
              selectedCategory={checkBoxTypeCategory}
              selectedSallary={checkBoxTypeRange}
              handleCheckbox={handleChechbox}
              handleApplyCheckbox={handleApplyCheckbox}
            />
            <div className="w-full md:w-9/12 flex flex-col">
              <div className="flex flex-col md:flex-row justify-center md:justify-between gap-4">
                <div className="flex justify-between">
                  <div className="findJobsTitle">
                    <h3 className="text-3xl font-bold text-black">All Jobs</h3>
                    <h3 className="text-sm font-normal text-gray-700">
                      Showing {jobData?.length} results
                    </h3>
                  </div>
                  <button
                    className="filter-m bg-transparent border-0 md:hidden"
                    onClick={openFilter}
                  >
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_9_3351)">
                        <path
                          d="M4 6H20"
                          stroke="#25324B"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 12H18"
                          stroke="#25324B"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 18H16"
                          stroke="#25324B"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_9_3351">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
                <div className="filterWrap flex items-center gap-4 justify-between md:justify-center">
                  <select
                    name="Search"
                    id="Search"
                    onChange={(e) => locationChange(e.target.value)}
                    defaultValue={""}
                    className="select select-bordered text-raisin-black bg-white"
                  >
                    <option value="">All Location</option>
                    <option>Jakarta Pusat</option>
                    <option>Jakarta Selatan</option>
                    <option>Jakarta Utara</option>
                    <option>Jakarta Barat</option>
                    <option>Jakarta Timur</option>
                    <option>Bogor</option>
                    <option>Depok</option>
                    <option>Tangerang</option>
                    <option>Bekasi</option>
                    <option>Surabaya</option>
                    <option>Bandung</option>
                    <option>Remote</option>
                  </select>
                  <div className="flex flex-row items-center">
                    <h3 className=" text-dark-grey-text">Sort by:</h3>
                    <select
                      name="Search"
                      id="Search"
                      onChange={(e) => handleSort(e.currentTarget.value)}
                      defaultValue={""}
                      className="bg-white outline-none text-black"
                    >
                      <option value={"newest"}>Newest</option>
                      <option value={"oldest"}>Oldest</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                {jobDataShow &&
                  jobDataShow?.map((el, index) => {
                    return <CardFindJobs key={index} jobData={el} />;
                  })}

                {!jobData?.length && (
                  <div className="flex justify-center items-center">
                    <img
                      src="/notjobs.png"
                      alt="icon"
                      className="w-96 justify-center items-center mt-5"
                    />
                  </div>
                )}
              </div>
              <nav
                aria-label="Page navigation example"
                className="mt-7 flex justify-center"
              >
                <ul className="flex items-center -space-x-px h-8 text-base font-semibold">
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePagination("min")}
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-steel-blue dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </a>
                  </li>
                  {[...Array(totalPage)].map((_, index) => {
                    const pageList = index + 1;
                    const isChecked =
                      pageList === page ? "dark:bg-steel-blue" : "";

                    return (
                      // eslint-disable-next-line react/jsx-key
                      <a
                        href="#"
                        onClick={() => handlePagination(pageList)}
                        className={
                          "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:border-gray-700 dark:text-gray-400 dark:hover:bg-steel-blue dark:hover:text-white " +
                          isChecked
                        }
                      >
                        {pageList}
                      </a>
                    );
                  })}
                  <li></li>
                  <li>
                    <a
                      href="#"
                      onClick={() => handlePagination("plus")}
                      className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white  rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-white dark:text-gray-400 dark:hover:bg-steel-blue dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-2.5 h-2.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
