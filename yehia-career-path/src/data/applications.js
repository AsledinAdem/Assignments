import { GiCancel } from "react-icons/gi";
import { MdGroup } from "react-icons/md";
import { TbFileCheck } from "react-icons/tb";

const applications = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechNova",
    status: "Applied",
    icon: TbFileCheck,
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Creative Labs",
    status: "Under Review",
    icon: MdGroup,
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "MG Database",
    status: "Rejected",
    icon: GiCancel,
  },
  {
    id: "4",
    title: "Full-stack Developer",
    company: "TechNova",
    status: "Applied",
    icon: TbFileCheck,
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "MG Database",
    status: "Applied",
    icon: TbFileCheck,
  },
];

export default applications;
