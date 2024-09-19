import { SimpleStorage } from '@/lib/simple-storage';
import dayjs from 'dayjs';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const departments = [
  'Architecture',
  'Building Engineering and Construction Management',
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Science and Engineering',
  'Electrical and Computer Engineering',
  'Electrical and Electronic Engineering',
  'Electronic and Telecommunication Engineering',
  'Glass and Ceramic Engineering',
  'Industrial and Production Engineering',
  'Materials Science and Engineering',
  'Mechanical Engineering',
  'Mechatronics Engineering',
  'Urban and Regional Planning',
] as const;

export const departmentAtom = atomWithStorage<(typeof departments)[number]>(
  'department',
  'Materials Science and Engineering',
  new SimpleStorage<(typeof departments)[number]>(),
  { getOnInit: true },
);

export const types = ['Lab Report', 'Assignment'] as const;

export const designations = [
  'Lecturer',
  'Assistant Professor',
  'Associate Professor',
  'Professor',
] as const;

export const typeAtom = atomWithStorage<(typeof types)[number]>(
  'cover-type',
  'Lab Report',
  new SimpleStorage<(typeof types)[number]>(),
  { getOnInit: true },
);

function stringItem(key: string, initialValue: string) {
  return atomWithStorage(key, initialValue, new SimpleStorage<string>(), {
    getOnInit: true,
  });
}

export default {
  studentName: stringItem('student-name', ''),
  studentID: stringItem('student-id', ''),
  studentSection: stringItem('student-section', ''),
  courseNoAtom: stringItem('course-no', ''),
  courseTitleAtom: stringItem('course-title', ''),
  coverNoAtom: stringItem('cover-no', '1'),
  coverTitleAtom: stringItem('cover-title', ''),
  teacherName: stringItem('teacher-name', ''),
  teacherDesignation: stringItem('teacher-designation', ''),
  teacherDepartment: stringItem('teacher-department', ''),
  dateOfSubmission: atom(dayjs(new Date()).format('D MMMM YYYY')),
};
