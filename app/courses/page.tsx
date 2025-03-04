"use client";
import React, { useEffect, useState } from "react";
import CourseDetail from "@/components/CourseDetail";
import CourseHeader from "@/components/HeaderSectionPage";
import { ICourse } from "../type";
import { config } from "dotenv";

const CoursesPage = () => {
  const [courses, setCourses] = useState<ICourse[]>([] as ICourse[]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`${process.env.BACKEND_URL}/api/v1/courses`, {
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

  return (
    <div className="flex flex-col">
      <div className="2xl:mx-[30px] xl:mx-[20px] mx-[16px]">
        <CourseHeader
          title="Online Courses on Design and Development"
          description="Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with
            comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey."
        />
      </div>
      <div className="flex flex-col items-center 2xl:mx-[162px] xl:mx-[80px] mx-[16px]">
        <div className="  2xl:max-w-[1596px] 2xl:mt-[100px] xl:mt-[80px] mt-[50px] xl:max-w-[1280px] flex flex-col 2xl:gap-[50px] gap-[20px] xl:gap-[40px] w-full">
          {courses.map((course, index) => (
            <CourseDetail
              id={course._id}
              key={index}
              title={course.title}
              description={course.description}
              images={course.images}
              courseDuration={course.courseDuration}
              courseLevel={course.courseLevel}
              author={course.author}
              curriculum={course.curriculum}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
