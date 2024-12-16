import RUETLogo from '@/assets/RUET-Logo.png';
import TeXGyreTermesBold from '@/assets/fonts/TeXGyreTermes-Bold.ttf';
import TeXGyreTermes from '@/assets/fonts/TeXGyreTermes-Regular.ttf';
import motto from '@/assets/motto.png';
import editorStore, {
  type Department,
  deptShortForm,
  typeAtom,
} from '@/store/editor';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

Font.register({
  family: 'TeX Gyre Termes',
  fonts: [{ src: TeXGyreTermes }, { src: TeXGyreTermesBold, fontWeight: 700 }],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    gap: 16,
    padding: '2.54cm',
    paddingLeft: '3cm',
    fontFamily: 'TeX Gyre Termes',
    textAlign: 'center',
  },
  motto: {
    position: 'absolute',
    width: '100vw',
    top: '2.54cm',
    fontSize: 12,
    color: 'transparent',
    left: 0,
  },
  institution: {
    fontSize: 17,
    marginVertical: 16,
  },
  image: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    height: 104,
    width: 90,
  },
  watermark: {
    height: 416,
    width: 360,
    opacity: 0.25,
    position: 'absolute',
    left: 117.64,
    top: 212,
  },
  mottoImage: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    height: 11,
    width: 122,
  },
  text: {
    fontSize: 16,
  },
  textBF: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 700,
  },
  thV: {
    fontSize: 16,
    textAlign: 'left',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 120,
    fontWeight: 700,
  },
  thH: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 700,
    textDecoration: 'underline',
  },
  colon: {
    fontSize: 16,
    fontWeight: 700,
    flexBasis: 16,
    textAlign: 'center',
  },
  td: {
    fontSize: 16,
    textAlign: 'left',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

const dataListItem = (key: string, value: string, keySize?: number) => (
  <View style={{ flexDirection: 'row' }}>
    <Text style={{ ...styles.thV, flexBasis: keySize ?? styles.thV.flexBasis }}>
      {key}
    </Text>
    <Text style={styles.colon}>:</Text>
    <Text style={styles.td}>{value}</Text>
  </View>
);

// Create Document Component
export function CoverTemplate() {
  const department = useAtomValue(editorStore.studentDepartment);
  const type = useAtomValue(typeAtom);
  const courseNo = useAtomValue(editorStore.courseNo);
  const courseTitle = useAtomValue(editorStore.courseTitle);
  const coverNo = useAtomValue(editorStore.coverNo);
  const coverTitle = useAtomValue(editorStore.coverTitle);
  const studentSection = useAtomValue(editorStore.studentSection);
  const studentID = useAtomValue(editorStore.studentID);
  const teacherName = useAtomValue(editorStore.teacherName);
  const teacherDesignation = useAtomValue(editorStore.teacherDesignation);
  const teacherDepartment = useAtomValue(editorStore.teacherDepartment);
  const dateOfSubmission = useAtomValue(editorStore.dateOfSubmission);
  const dateOfExperiment = useAtomValue(editorStore.dateOfExperiment);
  const secondTeacherName = useAtomValue(editorStore.secondTeacherName);
  const secondTeacherDesignation = useAtomValue(
    editorStore.secondTeacherDesignation,
  );

  /**
   * Settings
   */
  const fromToBorder = useAtomValue(editorStore.formToBorder);
  const watermark = useAtomValue(editorStore.watermark);
  const courseCode = useAtomValue(editorStore.courseCode);
  const studentSeries = useAtomValue(editorStore.studentSeries);
  const studentSession = useAtomValue(editorStore.studentSession);
  const studentGroup = useAtomValue(editorStore.studentGroup);
  const courseInfoBellowTitle = useAtomValue(editorStore.courseInfoBellowTitle);
  const datesBellowTitle = useAtomValue(editorStore.datesBellowTitle);

  const teacherDept = secondTeacherName
    ? deptShortForm.get(teacherDepartment as Department)
    : teacherDepartment;

  const studentTeacherTable = (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 16,
        textAlign: 'left',
        marginBottom: 'auto',
        border: fromToBorder ? '2px solid #000000' : undefined,
      }}
    >
      <View
        style={{
          flex: '1 1 0',
          paddingRight: 16,
          borderRight: fromToBorder ? '1px solid #000000' : undefined,
          paddingHorizontal: fromToBorder ? 16 : undefined,
          paddingBottom: fromToBorder ? 8 : undefined,
        }}
      >
        <Text style={styles.thH}>Submitted by:</Text>
        <Text style={styles.text}>
          {useAtomValue(editorStore.studentName) || '.'}
        </Text>
        {studentGroup && (
          <Text style={styles.text}>{`Group: ${studentGroup}`}</Text>
        )}
        <Text style={styles.text}>{`Roll: ${studentID}`}</Text>
        {!!studentSection && (
          <Text style={styles.text}>{`Section: ${studentSection}`}</Text>
        )}
        {studentSession && studentID.length >= 2 && (
          <Text style={styles.text}>
            Session: 20{studentID.slice(0, 2)}-{+studentID.slice(0, 2) + 1}
          </Text>
        )}
      </View>
      <View
        style={{
          flex: '1 1 0',
          paddingLeft: 16,
          borderLeft: fromToBorder ? '1px solid #000000' : undefined,
          paddingHorizontal: fromToBorder ? 16 : undefined,
          paddingBottom: fromToBorder ? 8 : undefined,
        }}
      >
        <Text style={styles.thH}>Submitted to:</Text>
        {!!teacherName && (
          <>
            <Text style={styles.text}>{teacherName}</Text>
            <Text style={styles.text}>{teacherDesignation}</Text>
            {!!teacherDepartment && (
              <Text style={styles.text}>{`Dept. of ${teacherDept}, RUET`}</Text>
            )}
          </>
        )}
        {!!secondTeacherName && (
          <View style={{ marginTop: 16 }}>
            <Text style={styles.text}>{secondTeacherName}</Text>
            <Text style={styles.text}>{secondTeacherDesignation}</Text>
            {!!teacherDepartment && (
              <Text style={styles.text}>{`Dept. of ${teacherDept}, RUET`}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
  const dates = (
    <>
      {type === 'Lab Report' && (
        <View style={{ textAlign: 'left', flexDirection: 'row' }}>
          <Text style={styles.textBF}>Date of Experiment</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.text}>
            {dateOfExperiment && dayjs(dateOfExperiment).format('D MMMM YYYY')}
          </Text>
        </View>
      )}
      <View style={{ textAlign: 'left', flexDirection: 'row' }}>
        <Text style={styles.textBF}>Date of Submission</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.text}>
          {dateOfSubmission && dayjs(dateOfSubmission).format('D MMMM YYYY')}
        </Text>
      </View>
    </>
  );

  return (
    <Document title="Cover Page">
      <Page size="A4" style={styles.page}>
        {watermark && <Image src={RUETLogo} style={styles.watermark} />}
        <Text style={styles.motto}>Heaven’s Light is Our Guide</Text>
        <Image src={motto} style={styles.mottoImage} />
        <Text style={styles.institution}>
          Rajshahi University of Engineering & Technology
        </Text>
        <Image src={RUETLogo} style={styles.image} />
        <View>
          <Text style={styles.text}>{`Department of ${department}`}</Text>
          {studentSeries && studentID.length >= 2 && (
            <Text style={styles.text}>{studentID.slice(0, 2)} Series</Text>
          )}
        </View>
        {!courseInfoBellowTitle && (
          <View
            style={{
              marginVertical: !secondTeacherName ? 16 : 0,
              flexDirection: 'column',
            }}
          >
            <Text style={styles.text}>
              {`${courseCode ? 'Course Code' : 'Course No.'}: ${courseNo}`}
            </Text>
            <Text style={styles.text}>{`Course Title: ${courseTitle}`}</Text>
          </View>
        )}
        <View
          style={{
            marginVertical: !secondTeacherName
              ? (courseInfoBellowTitle ? 16 : 0) + (datesBellowTitle ? 16 : 0)
              : 0,
          }}
        >
          {!!coverNo &&
            dataListItem(
              `${type === 'Assignment' ? type : 'Experiment'} No.`,
              coverNo === '0' ? '' : coverNo.padStart(2, '0'),
            )}
          {!!coverTitle &&
            dataListItem(
              `${type === 'Assignment' ? type : 'Experiment'} Title`,
              coverTitle,
            )}
          {courseInfoBellowTitle && (
            <>
              {dataListItem(
                courseCode ? 'Course Code' : 'Course No.',
                courseNo,
                90,
              )}
              {dataListItem('Course Title', courseTitle, 90)}
            </>
          )}
          {datesBellowTitle && dates}
        </View>
        {studentTeacherTable}
        {!datesBellowTitle && <View>{dates}</View>}
      </Page>
    </Document>
  );
}
