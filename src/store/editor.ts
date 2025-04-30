import { SimpleStorage } from '@/lib/simple-storage';
import dayjs from 'dayjs';
import * as idbKeyVal from 'idb-keyval';
import { atom } from 'jotai';
import { RESET, atomWithStorage } from 'jotai/utils';

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
  Chem = 'Chemistry',
  Math = 'Mathematics',
  Phy = 'Physics',
  Hum = 'Humanities',
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
  Department.Chem,
  Department.Math,
  Department.Phy,
  Department.Hum,
];

export const studentDepartments = departments.filter(
  (x) =>
    ![
      Department.Chem,
      Department.Math,
      Department.Phy,
      Department.Hum,
    ].includes(x),
);

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

const studentDepartment = atomWithStorage<Department | ''>(
  'student-department',
  '',
  new SimpleStorage<Department | ''>(),
  { getOnInit: true },
);

export const types = ['Lab Report', 'Assignment', 'Report'] as const;

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

function booleanItem(key: string, initialValue: boolean) {
  return atomWithStorage(key, initialValue, undefined, {
    getOnInit: true,
  });
}
const studentNameIDBStore = idbKeyVal.createStore(
  'student-name',
  'student-name',
);
const _studentNameAtom = stringItem('student-name', '');
const _studentIDAtom = stringItem('student-id', '');
const studentName = atom(
  (get) => get(_studentNameAtom),
  (get, set, studentName: string | typeof RESET) => {
    if (studentName === RESET) return set(_studentNameAtom, '');
    set(_studentNameAtom, studentName);
    const studentID = get(_studentIDAtom);
    if (studentID.length >= 7)
      idbKeyVal.set(studentID, studentName, studentNameIDBStore);
  },
);
const studentSection = stringItem('student-section', '');
const studentID = atom(
  (get) => get(_studentIDAtom),
  (get, set, studentID: string | typeof RESET) => {
    if (studentID === RESET) return set(_studentIDAtom, '');
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
        idbKeyVal.get(studentID, studentNameIDBStore).then((x) => {
          if (x) set(_studentNameAtom, x);
        });
      }
    }
  },
);

const courseTitleIDBStore = idbKeyVal.createStore(
  'course-title',
  'course-title',
);
const _courseTitleAtom = stringItem('course-title', '');
const _courseNoAtom = stringItem('course-no', '');
const courseTitle = atom(
  (get) => get(_courseTitleAtom),
  (get, set, courseTitle: string | typeof RESET) => {
    if (courseTitle === RESET) return set(_courseTitleAtom, '');
    set(_courseTitleAtom, courseTitle);
    const courseNo = get(_courseNoAtom);
    if (courseNo.length >= 7)
      idbKeyVal.set(courseNo, courseTitle, courseTitleIDBStore);
  },
);
const courseNo = atom(
  (get) => get(_courseNoAtom),
  (get, set, courseNo: string | typeof RESET) => {
    if (courseNo === RESET) return set(_courseNoAtom, '');
    set(_courseNoAtom, courseNo);
    if (courseNo.length >= 3) {
      // const code = courseNo.substring(0, 3);
      // if (code in departmentMap) {
      //   set(studentDepartment, departmentMap[code]);
      // }
      if (courseNo.length >= 7) {
        idbKeyVal.get(courseNo, courseTitleIDBStore).then((x) => {
          if (x) set(_courseTitleAtom, x);
        });
      }
    }
  },
);

export const teachersIDBStore = idbKeyVal.createStore('teachers', 'teachers');

export default {
  editorTab: stringItem('editor-tab', 'student'),
  studentDepartment,
  studentName,
  studentID,
  studentSection,
  studentGroup: stringItem('student-group', ''),
  courseNo,
  courseTitle,
  coverNo: stringItem('cover-no', '1'),
  coverTitle: stringItem('cover-title', ''),
  teacherName: stringItem('teacher-name', ''),
  teacherDesignation: stringItem('teacher-designation', ''),
  teacherDepartment: stringItem('teacher-department', ''),
  secondTeacherName: stringItem('second-teacher-name', ''),
  secondTeacherDesignation: stringItem('second-teacher-designation', ''),
  secondTeacherDepartment: stringItem('second-teacher-department', ''),
  dateOfExperiment: atom<null | Date>(dayjs().subtract(7, 'days').toDate()),
  dateOfSubmission: atom<null | Date>(new Date()),
  manualSubmittedByText: stringItem('manualSubmittedByText', ''),
  /**
   * Settings
   */
  manualSubmittedBy: booleanItem('manualSubmittedBy', false),
  formToBorder: booleanItem('formToBorder', false),
  watermark: booleanItem('watermark', false),
  courseCode: booleanItem('courseCode', false),
  studentSeries: booleanItem('studentSeries', false),
  studentSession: booleanItem('studentSession', false),
  courseInfoBellowTitle: booleanItem('courseInfoBellowTitle', false),
  datesBellowTitle: booleanItem('datesBellowTitle', false),
};
