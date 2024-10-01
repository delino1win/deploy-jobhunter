import { ChangeEvent } from "react"
import { myProfileForm } from "../user/myprofile/hooks"

type Props = {
  input: myProfileForm
  handleChangeInput: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function EducationCardForm(props: Props) {
  return (
        <div className="formCard border border-solid border-slate-300 rounded w-full max-w-lg p-3 my-5">
          <div className="formCardBody py-[24px]">
              <p className="mb-3 text-raisin-black font-semibold capitalize text-[18px]">
                  Last Education
              </p>
              <input 
                value={props.input.institution}
                onChange={props.handleChangeInput}
                name="institution"
                type="text" 
                placeholder="Institution Name" 
                className="input input-bordered w-full mb-3" 
                />
              <input 
                value={props.input.major}
                onChange={props.handleChangeInput}
                name="major"
                type="text" 
                placeholder="Major" 
                className="input input-bordered w-full mb-3" 
                />
              <input 
                value={props.input.duration}
                onChange={props.handleChangeInput}
                name="duration"
                type="Number" 
                placeholder="Duration (Years)" 
                className="input input-bordered w-full mb-3" 
                />
              <textarea 
                value={props.input.education}
                onChange={props.handleChangeInput}
                name="education"
                className="textarea textarea-bordered h-36 w-full" 
                placeholder="Education Description">
              </textarea>
          </div>
        </div>
  )
}
