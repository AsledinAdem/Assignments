import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { MdGroup } from "react-icons/md";
import { TbFileCheck } from "react-icons/tb";

const Applications = () => {
  return (
    <div>
      <Link
        href={"/dashboard/applications"}
        className="border border-slate-600 rounded-lg p-3 bg-slate-800 h-fit  "
      >
        <div className=" text-amber-500 flex items-center justify-between px-2 ">
          <div className="flex items-center gap-1">
            <TbFileCheck size={25} />
            <h2>Applied</h2>
          </div>
          <h2>1</h2>
        </div>
      </Link>
      {/*       
      <div className="border border-slate-600 rounded-lg p-3 bg-slate-800 h-fit  ">
        <div className=" text-amber-500 flex items-center justify-between px-2 ">
          <div className="flex items-center gap-1">
            <MdGroup size={25} />
            <h2>Interview</h2>
          </div>
          <h1>1</h1>
        </div>
      </div>
      <div className="border border-slate-600 rounded-lg p-3 bg-slate-800 h-fit  ">
        <div className=" text-amber-500 flex items-center justify-between px-2 ">
          <div className="flex items-center gap-1">
            <BiCheckCircle size={25} />
            <h2>Accept</h2>
          </div>
          <h1>0</h1>
        </div>
      </div>
      <div className="border border-slate-600 rounded-lg p-3 bg-slate-800 h-fit  ">
        <div className=" text-amber-500 flex items-center justify-between px-2 ">
          <div className="flex items-center gap-1">
            <GiCancel size={25} />
            <h2>Rejected</h2>
          </div>
          <h1>0</h1>
        </div>
      </div> */}
    </div>
  );
};

export default Applications;
