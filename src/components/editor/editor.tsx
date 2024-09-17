import {
  courseNoAtom,
  courseTitleAtom,
  coverNoAtom,
  coverTitleAtom,
  departmentAtom,
  departments,
  typeAtom,
  types,
} from '@/store/editor';
import { Combobox } from './combobox';
import { FormItem } from './form-item';
import { TextInput } from './input';

export function Editor() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-8">
      <FormItem label="Department">
        <Combobox
          name="department"
          atom={departmentAtom}
          options={departments.map((x) => ({ label: x, value: x }))}
        />
      </FormItem>
      <FormItem label="Type">
        <Combobox
          name="type"
          atom={typeAtom}
          options={types.map((x) => ({ label: x, value: x }))}
        />
      </FormItem>
      <FormItem label="Course No.">
        <TextInput atom={courseNoAtom} />
      </FormItem>
      <FormItem label="Course Title">
        <TextInput atom={courseTitleAtom} />
      </FormItem>
      <FormItem label="Cover No.">
        <TextInput atom={coverNoAtom} type="number" step={1} min={1} />
      </FormItem>
      <FormItem label="Cover Title">
        <TextInput atom={coverTitleAtom} />
      </FormItem>
    </div>
  );
}
