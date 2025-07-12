import {
  IdCardIcon,
  MixerVerticalIcon,
  PersonIcon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import editorStore, {
  departments,
  designations,
  studentDepartments,
  types,
} from '@/store/editor';
import { teacherEffect } from '@/store/effects/editor';
import { previewModeAtom } from '@/store/preview-mode';
import { Switch } from '../ui/switch';
import { Combobox } from './combobox';
import { DateInput } from './DateInput';
import { FormDescription } from './form-description';
import { FormItem } from './form-item';
import { SelectInput } from './select-input';
import { SwitchInput } from './switch-input';
import { TeacherName } from './teacher-name';
import { TextInput } from './text-input';
import { TextAreaInput } from './textarea-input';

const tabContentClass = cn(
  'flex-1 flex-col gap-y-4 overflow-y-auto p-4 data-[state=active]:flex',
);

const tabHeaderClass = cn(
  'mb-4 font-bold text-3xl leading-tight md:text-4xl dark:text-slate-50',
);

export function Editor() {
  const setTab = useSetAtom(editorStore.editorTab);
  const setPreviewMode = useSetAtom(previewModeAtom);
  const courseCode = useAtomValue(editorStore.courseCode);
  const teacherName = useAtomValue(editorStore.teacherName);
  const secondTeacherName = useAtomValue(editorStore.secondTeacherName);
  const manualSubmittedBy = useAtomValue(editorStore.manualSubmittedBy);

  useAtom(teacherEffect);

  return (
    <Tabs
      defaultValue="student"
      className="flex flex-1 flex-col overflow-hidden"
      atom={editorStore.editorTab}
    >
      <TabsList className="h-auto w-full rounded-none">
        {(
          [
            ['student', PersonIcon],
            ['subject', ReaderIcon],
            ['teacher', IdCardIcon],
            ['settings', MixerVerticalIcon],
          ] as const
        ).map(([x, Icon]) => (
          <TabsTrigger value={x} className="flex-1" key={x} aria-label={x}>
            <Icon className="size-8" />
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="student" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Student</h2>
        <SwitchInput
          atom={editorStore.manualSubmittedBy}
          label="Manual Input"
        />
        {manualSubmittedBy ? (
          <FormItem label="Submitted By">
            <TextAreaInput atom={editorStore.manualSubmittedByText} rows={10} />
          </FormItem>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormItem label="Student ID">
                <TextInput atom={editorStore.studentID} />
              </FormItem>
              <FormItem label="Section">
                <TextInput atom={editorStore.studentSection} />
                <FormDescription>leave empty if not applicable</FormDescription>
              </FormItem>
            </div>
            <FormItem label="Full Name">
              <TextInput atom={editorStore.studentName} />
            </FormItem>
          </>
        )}
        <FormItem label="Department">
          <Combobox
            name="department"
            atom={editorStore.studentDepartment}
            options={studentDepartments.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        <FormItem label="Group">
          <TextInput atom={editorStore.studentGroup} />
          <FormDescription>leave empty if not applicable</FormDescription>
        </FormItem>
        <Button
          variant="outline"
          className="mt-auto"
          onClick={() => setTab('subject')}
        >
          Next
        </Button>
      </TabsContent>
      <TabsContent value="subject" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Subject</h2>
        <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
          <FormItem label={courseCode ? 'Course Code' : 'Course No.'}>
            <TextInput atom={editorStore.courseNo} />
          </FormItem>
          <FormItem label="Course Title">
            <TextInput atom={editorStore.courseTitle} />
          </FormItem>
        </div>
        <TypeAndCoverNo />
        <FormItem label="Title">
          <TextAreaInput atom={editorStore.coverTitle} rows={3} />
          <FormDescription>leave empty if not applicable</FormDescription>
        </FormItem>
        <DateOfExperiment />
        <FormItem label="Date of submission">
          <DateInput atom={editorStore.dateOfSubmission} />
        </FormItem>
        <Button
          variant="outline"
          className="mt-auto"
          onClick={() => setTab('teacher')}
        >
          Next
        </Button>
      </TabsContent>
      <TabsContent value="teacher" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Teacher</h2>
        <FormItem label="Teacher Name">
          <TeacherName
            nameAtom={editorStore.teacherName}
            designationAtom={editorStore.teacherDesignation}
            departmentAtom={editorStore.teacherDepartment}
          />
        </FormItem>
        {!!teacherName && (
          <FormItem label="Designation">
            <Combobox
              name="designation"
              atom={editorStore.teacherDesignation}
              options={designations.map((x) => ({ label: x, value: x }))}
            />
          </FormItem>
        )}
        <FormItem label="Department">
          <Combobox
            name="department"
            atom={editorStore.teacherDepartment}
            options={departments.map((x) => ({ label: x, value: x }))}
          />
        </FormItem>
        {!!teacherName && (
          <>
            <hr className="-mx-4 mt-2 border-input" />
            <FormItem label="Second Teacher Name">
              <TeacherName
                nameAtom={editorStore.secondTeacherName}
                designationAtom={editorStore.secondTeacherDesignation}
                departmentAtom={editorStore.secondTeacherDepartment}
              />
            </FormItem>
            {!!secondTeacherName && (
              <>
                <FormItem label="Second Teacher Designation">
                  <Combobox
                    name="designation"
                    atom={editorStore.secondTeacherDesignation}
                    options={designations.map((x) => ({ label: x, value: x }))}
                  />
                </FormItem>
                <FormItem label="Second Teacher Department">
                  <Combobox
                    name="department"
                    atom={editorStore.secondTeacherDepartment}
                    options={departments.map((x) => ({ label: x, value: x }))}
                  />
                </FormItem>
              </>
            )}
            <hr className="-mx-4 mt-2 border-input" />
          </>
        )}
        <Button
          variant="outline"
          className="mt-auto max-lg:hidden"
          onClick={() => setTab('subject')}
        >
          Back
        </Button>
        <Button
          variant="outline"
          className="mt-auto lg:hidden"
          onClick={() => setPreviewMode(true)}
        >
          Let's go
        </Button>
      </TabsContent>
      <TabsContent value="settings" className={tabContentClass}>
        <h2 className={tabHeaderClass}>Settings</h2>
        <SwitchInput
          atom={editorStore.formToBorder}
          label="Add borders to submitted by and submitted to table"
        />
        <SwitchInput atom={editorStore.watermark} label="Add watermark" />
        <SwitchInput
          atom={editorStore.courseCode}
          label="Use 'Course Code' instead of 'Course No.'"
        />
        <SwitchInput
          atom={editorStore.studentSeries}
          label="Show student series"
        />
        <SwitchInput
          atom={editorStore.studentSession}
          label="Show student session"
        />
        <SwitchInput
          atom={editorStore.courseInfoBellowTitle}
          label="Show course information bellow title"
        />
        <SwitchInput
          atom={editorStore.datesBellowTitle}
          label="Show dates bellow title instead of at the bottom"
        />
        <h2 className={tabHeaderClass}>Reset</h2>
        Feeling messy, want to start over?
        <Button
          variant="destructive"
          className=""
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Reset all inputs and settings
        </Button>
      </TabsContent>
    </Tabs>
  );
}

function DateOfExperiment() {
  const type = useAtomValue(editorStore.type);

  return (
    type === 'Lab Report' && (
      <FormItem label="Date of experiment">
        <DateInput atom={editorStore.dateOfExperiment} />
      </FormItem>
    )
  );
}

function TypeAndCoverNo() {
  const type = useAtomValue(editorStore.type);
  const [coverNo, setCoverNo] = useAtom(editorStore.coverNo);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormItem label="Type">
        <SelectInput<(typeof types)[number]>
          name="type"
          atom={editorStore.type}
          options={types.map((x) => ({ label: x, value: x }))}
        />
      </FormItem>
      {type !== 'Thesis' && (
        <FormItem
          label={`${type} No.`}
          actions={
            <Switch
              checked={coverNo !== ''}
              onCheckedChange={(x) => setCoverNo(x ? '1' : '')}
            />
          }
        >
          <TextInput
            atom={editorStore.coverNo}
            disabled={coverNo === ''}
            type="number"
            step={1}
            min={0}
          />
        </FormItem>
      )}
    </div>
  );
}
