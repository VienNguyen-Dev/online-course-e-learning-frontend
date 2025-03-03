"use client";
import React, { useEffect, useState } from "react";
import { headerContents } from "@/constants";
import { CardCourse } from "./CardCourse";
import HeaderSection from "./HeaderSection";
import { courseDetails } from "@/lib/actions/course.action";
import { ICourse } from "@/app/type";

const OurCourseSection = () => {
  const [courses, setCourses] = useState<ICourse[]>([] as ICourse[]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:5500/api/v1/courses", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data.data);
      }
      return data;
    };
    fetchCourses();
  }, []);
  console.log(courses);
  return (
    <div id="course-section" className="xl:mt-[100px] mt-[50px] flex 2xl:mx-[161px] xl:mx-[81px] mx-[17px] flex-col  max-w-[1597px] 2xl:gap-[80px] xl:gap-[60px]  gap-[40px]">
      <HeaderSection title={headerContents[1].courseTitle} description={headerContents[1].courseDescription} />;
      <div className="flex flex-wrap xl:gap-[30px] gap-[20px] w-full">
        {courses.map((course, index) => {
          return (
            <CardCourse
              id={course._id}
              image={course.images[0]}
              key={index}
              author={course.author}
              courseDuration={course.courseDuration}
              courseLevel={course.courseLevel}
              title={course.title}
              description={course.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OurCourseSection;
