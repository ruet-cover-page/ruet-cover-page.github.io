import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import atoms, {
  departmentAtom,
  departments,
  designations,
  typeAtom,
  types,
} from '@/store/editor';
import { IdCardIcon, PersonIcon, ReaderIcon } from '@radix-ui/react-icons';
import { Combobox } from './combobox';
import { FormItem } from './form-item';
import { TextInput } from './input';

const tabContentClass = cn('flex-1 overflow-y-auto space-y-4 p-4');

export function Editor() {
  return (
    <Tabs
      defaultValue="student"
      className="flex flex-1 flex-col overflow-hidden"
    >
      <TabsList className="h-auto w-full">
        {(
          [
            ['student', PersonIcon],
            ['password', ReaderIcon],
            ['teacher', IdCardIcon],
          ] as const
        ).map(([x, Icon]) => (
          <TabsTrigger value={x} className="flex-1" key={x}>
            <Icon className="h-8 w-8" />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="student" className={tabContentClass}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormItem label="Student ID">
            <TextInput atom={atoms.studentID} />
          </FormItem>
          <FormItem label="Section (leave empty if not applicable)">
            <TextInput atom={atoms.studentSection} />
          </FormItem>
        </div>
        <FormItem label="Full Name">
          <TextInput atom={atoms.studentName} />
        </FormItem>
        <FormItem label="Department">
          <Combobox
            name="department"
            atom={departmentAtom}
            options={departments.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
      </TabsContent>
      <TabsContent value="password" className={tabContentClass}>
        <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
          <FormItem label="Course No.">
            <TextInput atom={atoms.courseNoAtom} />
          </FormItem>
          <FormItem label="Course Title">
            <TextInput atom={atoms.courseTitleAtom} />
          </FormItem>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormItem label="Type">
            <Combobox
              name="type"
              atom={typeAtom}
              options={types.map((x) => ({ label: x, value: x }))}
            />
          </FormItem>
          <FormItem label="No.">
            <TextInput
              atom={atoms.coverNoAtom}
              type="number"
              step={1}
              min={1}
            />
          </FormItem>
        </div>
        <FormItem label="Title">
          <TextInput atom={atoms.coverTitleAtom} />
        </FormItem>
        <FormItem label="Date of submission">
          <TextInput atom={atoms.dateOfSubmission} />
        </FormItem>
      </TabsContent>
      <TabsContent value="teacher" className={tabContentClass}>
        <FormItem label="Teacher Name">
          <TextInput atom={atoms.teacherName} />
        </FormItem>
        <FormItem label="Designation">
          <Combobox
            name="designation"
            atom={atoms.teacherDesignation}
            options={designations.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        <FormItem label="Department">
          <Combobox
            name="department"
            atom={atoms.teacherDepartment}
            options={departments.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
      </TabsContent>
    </Tabs>
  );
}
