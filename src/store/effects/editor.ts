import { atomEffect } from 'jotai-effect';
import editorStore from '@/store/editor';

export const teacherEffect = atomEffect((get, set) => {
  const teacherName = get(editorStore.teacherName);

  if (!teacherName) {
    set(editorStore.teacherDepartment, '');
  }

  return () => {};
});
