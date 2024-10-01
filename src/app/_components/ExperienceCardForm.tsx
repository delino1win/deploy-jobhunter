import { ChangeEvent } from "react";
import { myProfileForm } from "../user/myprofile/hooks";

type Props = {
  input: myProfileForm;
  handleChangeInput: (
    event: ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function ExperienceCardForm(props: Props) {
  return (
    <>
      <div className="formCard border border-solid border-slate-300 rounded w-full max-w-lg p-3 my-5">
        <div className="formCardBody py-[24px]">
          <p className="mb-3 text-raisin-black font-semibold capitalize text-[18px]">
            Last Job Experience
          </p>
          <input
            value={props.input.jobtitle}
            onChange={props.handleChangeInput}
            name="jobtitle"
            type="text"
            placeholder="Job Title"
            className="input input-bordered w-full mb-3"
          />
          <div className="flex items-center justify-between w-full mb-3">
            <input
              value={props.input.company}
              onChange={props.handleChangeInput}
              name="company"
              type="text"
              placeholder="Company Name"
              className="input input-bordered w-5/12"
            />
            <select
              name="jobtype"
              value={props.input.jobtype}
              onChange={props.handleChangeInput}
              defaultValue={""}
              className="select select-bordered text-white w-5/12"
            >
              <option value={""}>Job Type</option>
              <option>Full Time</option>
              <option>Contract</option>
              <option>Part Time</option>
              <option>Internship</option>
            </select>
          </div>
          <input
            value={props.input.durationexperience}
            onChange={props.handleChangeInput}
            name="durationexperience"
            type="Number"
            placeholder="Duration (Years)"
            className="input input-bordered w-full mb-3"
          />
          <select
            name="location"
            value={props.input.location}
            onChange={props.handleChangeInput}
            defaultValue={""}
            className="select select-bordered text-white w-full mb-3"
          >
            <option value={""}>Location</option>
            <option>Jakarta Pusat</option>
            <option>Jakarta Selatan</option>
            <option>Jakarta Utara</option>
            <option>Jakarta Barat</option>
            <option>Jakarta Timur</option>
            <option>Bogor</option>
            <option>Depok</option>
            <option>Tangerang</option>
            <option>Bekasi</option>
          </select>
          <textarea
            name="jobdescription"
            onChange={props.handleChangeInput}
            value={props.input.jobdescription}
            className="textarea textarea-bordered h-36 w-full"
            placeholder="Job Description"
          ></textarea>
        </div>
      </div>
    </>
  );
}
