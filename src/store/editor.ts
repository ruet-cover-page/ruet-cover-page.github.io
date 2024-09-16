import { SimpleStorage } from '@/lib/simple-storage';
import { atomWithStorage } from 'jotai/utils';

export const departments = [
  'Architecture',
  'Building Engineering and Construction Management',
  'Chemical and Food Process Engineering',
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

export const typeAtom = atomWithStorage<(typeof types)[number]>(
  'cover-type',
  'Lab Report',
  new SimpleStorage<(typeof types)[number]>(),
  { getOnInit: true },
);

export const courseNoAtom = atomWithStorage(
  'course-no',
  '',
  new SimpleStorage<string>(),
  {
    getOnInit: true,
  },
);

export const courseTitleAtom = atomWithStorage(
  'course-title',
  '',
  new SimpleStorage<string>(),
  {
    getOnInit: true,
  },
);

export const coverNoAtom = atomWithStorage(
  'cover-no',
  '1',
  new SimpleStorage<string>(),
  {
    getOnInit: true,
  },
);

export const coverTitleAtom = atomWithStorage(
  'cover-title',
  '',
  new SimpleStorage<string>(),
  {
    getOnInit: true,
  },
);
