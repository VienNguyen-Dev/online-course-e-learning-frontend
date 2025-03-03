export type Authentication = {
  fullname?: string;
  email: string;
  password: string;
};

export type ICourse = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  video: string;
  courseDuration: string;
  courseLevel: string;
  author: string;
  curriculum: ICurriculum[];
};

export type DetailStepCurriculum = {
  lesson: string;
  stepDescription: string;
  stepDuration: string;
};

export type DetailCurriculum = {
  name: string;
  step: DetailStepCurriculum[];
};

export type ICurriculum = {
  numOfCurriculum: string;
  desCurriculum: DetailCurriculum;
};
