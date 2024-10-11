import { SimpleStorage } from '@/lib/simple-storage';
import dayjs from 'dayjs';
import { createStore, get as idbGet, set as idbSet } from 'idb-keyval';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export enum Department {
  Arch = 'Architecture',
  BECM = 'Building Engineering & Construction Management',
  ChE = 'Chemical Engineering',
  CE = 'Civil Engineering',
  CSE = 'Computer Science & Engineering',
  ECE = 'Electrical & Computer Engineering',
  EEE = 'Electrical & Electronic Engineering',
  ETE = 'Electronics & Telecommunication Engineering',
  GCE = 'Glass and Ceramic Engineering',
  IPE = 'Industrial & Production Engineering',
  MSE = 'Materials Science & Engineering',
  ME = 'Mechanical Engineering',
  MTE = 'Mechatronics Engineering',
  URP = 'Urban & Regional Planning',
}

export const departmentShortMap = Object.fromEntries(
  Object.entries(Department).map(([key]) => [key.toLowerCase(), key]),
);

export const departmentLongMap = Object.fromEntries(
  Object.entries(Department).map(([key, value]) => [key.toLowerCase(), value]),
);

export const deptShortForm = new Map<Department, string>(
  Object.entries(Department).map(([key, value]) => [value, key]),
);

export const departments = [
  Department.Arch,
  Department.BECM,
  Department.ChE,
  Department.CE,
  Department.CSE,
  Department.ECE,
  Department.EEE,
  Department.ETE,
  Department.GCE,
  Department.IPE,
  Department.MSE,
  Department.ME,
  Department.MTE,
  Department.URP,
];

const departmentMap: Record<string, Department> = {
  '00': Department.CE,
  '01': Department.EEE,
  '02': Department.ME,
  '03': Department.CSE,
  '04': Department.ETE,
  '05': Department.IPE,
  '06': Department.GCE,
  '07': Department.URP,
  '08': Department.MTE,
  '09': Department.Arch,
  '10': Department.ECE,
  '11': Department.ChE,
  '12': Department.BECM,
  '13': Department.MSE,
};

const studentDepartment = atomWithStorage<Department>(
  'student-department',
  Department.MSE,
  new SimpleStorage<Department>(),
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
const studentNameIDBStore = createStore('student-name', 'student-name');
const _studentName = stringItem('student-name', '');
const _studentIDAtom = stringItem('student-id', '');
const studentName = atom(
  (get) => get(_studentName),
  (get, set, studentName: string) => {
    set(_studentName, studentName);
    const studentID = get(_studentIDAtom);
    if (studentID.length >= 7)
      idbSet(studentID, studentName, studentNameIDBStore);
  },
);
const studentSection = stringItem('student-section', '');
const studentID = atom(
  (get) => get(_studentIDAtom),
  (get, set, studentID: string) => {
    set(_studentIDAtom, studentID);
    if (studentID.length >= 4) {
      const code = studentID.substring(2, 4);
      if (code in departmentMap) {
        set(studentDepartment, departmentMap[code]);
      }
      if (studentID.length >= 7) {
        const roll = +studentID.substring(4, 7);
        if (Number.isInteger(roll)) {
          if (roll < 60) 'A';
          else if (roll <= 120) set(studentSection, 'B');
          else if (roll <= 180) set(studentSection, 'C');
        }
        idbGet(studentID, studentNameIDBStore).then((x) => {
          if (x) set(studentName, x);
        });
      }
    }
  },
);

export default {
  editorTab: stringItem('editor-tab', 'student'),
  studentDepartment,
  studentName,
  studentID,
  studentSection,
  courseNo: stringItem('course-no', ''),
  courseTitle: stringItem('course-title', ''),
  coverNo: stringItem('cover-no', '1'),
  coverTitle: stringItem('cover-title', ''),
  teacherName: stringItem('teacher-name', ''),
  teacherDesignation: stringItem('teacher-designation', ''),
  secondTeacherName: stringItem('second-teacher-name', ''),
  secondTeacherDesignation: stringItem('second-teacher-designation', ''),
  teacherDepartment: stringItem('teacher-department', ''),
  dateOfSubmission: atom(dayjs(new Date()).format('D MMMM YYYY')),
};
