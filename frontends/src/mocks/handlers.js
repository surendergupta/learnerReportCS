import { rest } from "msw";
import { faker } from "@faker-js/faker";


const dashBoardInfo = [
  {
    name: "Batches",
    value: "12",
    color: "rgb(209, 233, 252)",
  },
  {
    name: "Total Learners",
    value: "120",
    color: "rgb(208, 242, 255)",
  },
  {
    name: "Active learners",
    value: "76",
    color: "rgb(255, 247, 205)",
  },
  {
    name: "Learner Reports",
    value: "available",
    color: "rgb(255, 231, 217)",
  },
];
const StudentBoardInfo = [
  {
    id:1,
    name: "Snehal",
    batch: "FSD2",
    avatar: "images_student",
    enrolled: "12-10-22",
    course_name: "Full Stack Development Program",
    color: "rgb(209, 233, 252)",
  },

];

// const user = () => ({
//   id: faker.datatype.uuid(),
//   user: {
//     image: faker.image.avatar(),
//     name: faker.name.fullName(),
//   },

//   company: faker.company.name(),
//   role: faker.helpers.arrayElement([
//     "Hr Manager",
//     "Full Stack Developer",
//     "Project Manager",
//   ]),
//   verified: faker.helpers.arrayElement(["Yes", "No"]),
//   status: faker.helpers.arrayElement(["Active", "Banned"]),
// });



export const handlers = [
  rest.get("/api/dashboard", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dashBoardInfo));
  }),
  rest.get("/api/studentinfo", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(StudentBoardInfo));
  }),
];
