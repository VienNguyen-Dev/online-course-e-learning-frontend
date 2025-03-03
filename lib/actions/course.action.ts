import { Query } from "node-appwrite";
import { createAdminClient } from "../server/appwrite-config";

const { DATABASE_ID, COURSE_COLLECTION_ID } = process.env;

//get all course from backend
export const courseDetails = [
  {
    id: "course_001",
    title: "Web Design Fundamentals",
    description: "Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.",
    images: ["web-1.png", "web-2.png", "web-3.png"],
    courseDuration: "4 Weeks",
    courseLevel: "Beginner",
    author: "By John Smith",
    curriculum: [
      {
        numOfCurriculum: "01",
        desCurriculum: "Introduction to HTML",
      },
      {
        numOfCurriculum: "02",
        desCurriculum: "Styling with CSS",
      },
      {
        numOfCurriculum: "03",
        desCurriculum: "Introduction to Responsive Design",
      },
      {
        numOfCurriculum: "04",
        desCurriculum: "Design Principles for Web",
      },
      {
        numOfCurriculum: "05",
        desCurriculum: "Building a Basic Website",
      },
    ],
  },
  {
    id: "course_002",
    title: "UI/UX Design",
    description: "Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.",
    images: ["ui-design-1.png", "ui-design-2.png", "ui-design-3.png"],
    courseDuration: "6 Weeks",
    courseLevel: "Intermediate",
    author: "By Emily Johnson",
    curriculum: [
      {
        numOfCurriculum: "01",
        desCurriculum: {
          name: "Introduction to UI/UX Design",
          step: [
            {
              lesson: "Lesson 01",
              stepDescription: "Understanding UI/UX Design Principles",
              stepDuration: "45 Minutes",
            },
            {
              lesson: "Lesson 02",
              stepDescription: "Importance of User-Centered Design",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 03",
              stepDescription: "The Role of UI/UX Design in Product Development",
              stepDuration: "45 Minutes",
            },
          ],
        },
      },
      {
        number: "02",
        description: {
          name: "User Research and Analysis",
          step: [
            {
              lesson: "Lesson 01",
              stepDescription: "Conducting User Research and Interviews",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 02",
              stepDescription: "IAnalyzing User Needs and Behavior",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 03",
              stepDescription: "Creating User Personas and Scenarios",
              stepDuration: "45 Minutes",
            },
          ],
        },
      },
      {
        number: "03",
        description: {
          name: "Wireframing and Prototyping",
          step: [
            {
              lesson: "Lesson 01",
              stepDescription: "Introduction to Wireframing Tools and Techniques",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 02",
              stepDescription: "Creating Low-Fidelity Wireframes",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 03",
              stepDescription: "Prototyping and Interactive Mockups",
              stepDuration: "01 Hour",
            },
          ],
        },
      },
      {
        number: "04",
        description: {
          name: "Visual Design and Branding",
          step: [
            {
              lesson: "Lesson 01",
              stepDescription: "Color Theory and Typography in UI Design",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 02",
              stepDescription: "Visual Hierarchy and Layout Design",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 03",
              stepDescription: "Creating a Strong Brand Identity",
              stepDuration: "45 Minutes",
            },
          ],
        },
      },
      {
        number: "05",
        description: {
          name: "Usability Testing and Iteration",
          step: [
            {
              lesson: "Lesson 01",
              stepDescription: "Usability Testing Methods and Techniques",
              stepDuration: "01 Hour",
            },
            {
              lesson: "Lesson 02",
              stepDescription: "Analyzing Usability Test Results",
              stepDuration: "45 Minutes",
            },
            {
              lesson: "Lesson 03",
              stepDescription: "Iterating and Improving UX Designs",
              stepDuration: "45 Minutes",
            },
          ],
        },
      },
    ],
  },
  {
    id: "course_003",
    title: "Mobile App Development",
    description: "Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.",
    images: ["mobile-1.png", "mobile-2.png", "mobile-3.png"],
    courseDuration: "8 Weeks",
    courseLevel: "Intermediate",
    author: "By David Brown",
    curriculum: [
      {
        number: "01",
        description: "Introduction to Mobile App Development",
      },
      {
        number: "02",
        description: "Fundamentals of Swift Programming (iOS)",
      },
      {
        number: "03",
        description: "Fundamentals of Kotlin Programming (Android)",
      },
      {
        number: "04",
        description: "Building User Interfaces",
      },
      {
        number: "05",
        description: "App Deployment and Testing",
      },
    ],
  },
  {
    id: "course_004",
    title: "Graphic Design for Beginners",
    description:
      "Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.",
    images: ["graphic-1.png", "graphic-2.png", "graphic-3.png"],
    courseDuration: "10 Weeks",
    courseLevel: "Beginner",
    author: "By Sarah Thompson",
    curriculum: [
      {
        number: "01",
        description: "Introduction to Graphic Design",
      },
      {
        number: "02",
        description: "Typography and Color Theory",
      },
      {
        number: "03",
        description: "Layout Design and Composition",
      },
      {
        number: "04",
        description: "Image Editing and Manipulation",
      },
      {
        number: "05",
        description: "Designing for Print and Digital Media",
      },
    ],
  },
  {
    id: "course_005",
    title: "Front-End Web Development",
    description: "Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.",
    images: ["front-end-1.png", "front-end-2.png", "front-end-3.png"],
    courseDuration: "10 Weeks",
    courseLevel: "Intermediate",
    author: "By Michael Adams",
    curriculum: [
      {
        number: "01",
        description: "HTML Fundamentals",
      },
      {
        number: "02",
        description: "CSS Styling and Layouts",
      },
      {
        number: "03",
        description: "JavaScript Basics",
      },
      {
        number: "04",
        description: "Building Responsive Websites",
      },
      {
        number: "05",
        description: "Introduction to Bootstrap and React",
      },
    ],
  },

  {
    id: "course_006",
    title: "Advanced JavaScript",
    description:
      "Take your JavaScript skills to the next level. Explore advanced concepts like closures, prototypes, asynchronous programming, and ES6 features. Build complex applications with confidence.",
    images: ["advanced-Js.png"],
    courseDuration: "6 Weeks",
    courseLevel: "Advance",
    author: "By Jennifer Wilson",
    curriculum: [
      {
        number: "01",
        description: "Advanced JavaScript (ES6+ Features & Best Practices)",
      },
      {
        number: "02",
        description: "Asynchronous JavaScript: Promises & Async/Await",
      },
      {
        number: "03",
        description: "JavaScript Design Patterns & Performance Optimization",
      },
      {
        number: "04",
        description: "Working with APIs: Fetch, Axios & RESTful Services",
      },
      {
        number: "05",
        description: "Building Scalable Applications with Modern JavaScript",
      },
    ],
  },
];

export async function getAllCourses() {
  try {
    const { database } = await createAdminClient();
    const courses = await database.listDocuments(DATABASE_ID!, COURSE_COLLECTION_ID!);
    if (courses.total === 0) {
      return null;
    }
    return courses.documents;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Error while get all courses");
  }
}

export async function getCourseById(courseId: string) {
  try {
    const { database } = await createAdminClient();
    const courses = await database.listDocuments(DATABASE_ID!, COURSE_COLLECTION_ID!, [Query.equal("courseId", courseId)]);
    return courses.documents[0];
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Error occur while getting course by id");
  }
}
