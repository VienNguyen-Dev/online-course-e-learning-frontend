"use client";
import { ICourse } from "@/app/type";
import CourseHeader from "@/components/HeaderSectionPage";
import StepCard from "@/components/StepCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/v1/courses/${courseId}`, {
          method: "GET",
        });
        const data = await response.json();
        if (response.ok) {
          setCourse(data.data);
        } else {
          setCourse(null);
        }
      } catch (error) {
        console.error("Failed to fetch course data:", error);
        setCourse(null);
      }
    };
    if (courseId) {
      fetchCourseById();
    }
  }, [courseId]);

  if (!course) return <>Course not found</>;

  return (
    <div className="flex flex-col">
      <div className="2xl:mx-[30px] xl:mx-[20px] mx-[16px]">
        <CourseHeader title={`${course.title} Course`} description={course.description} />
      </div>
      {courseId && course && (
        <div className="flex flex-col 2xl:mx-[162px] xl:mx-[80px] mx-[16px]">
          <div className="relative 2xl:mt-[100px] xl:mt-[80px] mt-[50px]">
            {course.images && course.images[0] && <img className="w-full object-cover 2xl:max-h-[790px] max-h-[247px] xl:max-h-[649px] rounded-[12px]" src={course.images[0]} alt={course.title} />}
            <Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer" src={"/assets/images/play-button.png"} width={72} height={72} alt="play-button" />
          </div>
          <div className="2xl:mt-[100px] xl:mt-[80px] mt-[50px] flex flex-wrap gap-[20px] flex-col sm:flex-row w-full">
            {course.curriculum && course.curriculum.map((c, i) => <StepCard key={i} stepNumber={c.numOfCurriculum} stepName={c.desCurriculum.name} step={c.desCurriculum.step} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
