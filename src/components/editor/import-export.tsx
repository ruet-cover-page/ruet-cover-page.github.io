import { parse } from '@brillout/json-serializer/parse';
import { stringify } from '@brillout/json-serializer/stringify';
import { fileOpen, fileSave } from 'browser-fs-access';
import * as idbKeyVal from 'idb-keyval';
import { Button } from '@/components/ui/button';
import { defaultStore } from '@/store';
import editorStore, {
  courseTitleIDBStore,
  studentNameIDBStore,
} from '@/store/editor';

const settingsKeys = [
  'manualSubmittedBy',
  'formToBorder',
  'watermark',
  'courseCode',
  'studentSeries',
  'studentSession',
  'courseInfoBellowTitle',
  'datesBellowTitle',
] as const;

async function exportStore() {
  const editorStoreSnapshot = {
    ...Object.fromEntries(
      settingsKeys.map((k) => [k, defaultStore.get(editorStore[k])]),
    ),
    studentNameIDBStore: await idbKeyVal.entries(studentNameIDBStore),
    courseTitleIDBStore: await idbKeyVal.entries(courseTitleIDBStore),
  };

  await fileSave(new Blob([stringify(editorStoreSnapshot)]), {
    fileName: 'cover-page-generator-settings.json',
    extensions: ['.json'],
  });
}

async function importStore() {
  const file = await fileOpen({ extensions: ['.json'] });
  const text = await file.text();
  const data = parse(text) as Record<string, boolean> & {
    studentNameIDBStore: [string, string][];
    courseTitleIDBStore: [string, string][];
  };
  settingsKeys.forEach((k) => {
    if (k in data) defaultStore.set(editorStore[k], data[k]);
  });
  if (data.studentNameIDBStore) {
    await idbKeyVal.setMany(data.studentNameIDBStore, studentNameIDBStore);
  }
  if (data.courseTitleIDBStore) {
    await idbKeyVal.setMany(data.courseTitleIDBStore, courseTitleIDBStore);
  }
}

export function ImportExport() {
  return (
    <>
      <h3>Import/Export</h3>
      <p>Import/export your settings, student name and course title history.</p>
      <div className="flex gap-2">
        <Button type="button" onClick={importStore}>
          Import
        </Button>
        <Button type="button" onClick={exportStore}>
          Export
        </Button>
      </div>
    </>
  );
}
