import PTSerifBold from '@/assets/PT_Serif/PTSerif-Bold.ttf';
import PTSerif from '@/assets/PT_Serif/PTSerif-Regular.ttf';
import PTSerifCaption from '@/assets/PT_Serif_Caption/PTSerifCaption-Regular.ttf';
import PetitFormalScript from '@/assets/Petit_Formal_Script/PetitFormalScript-Regular.ttf';
import RUETLogo from '@/assets/RUET-Logo.png';
import {
  courseNoAtom,
  courseTitleAtom,
  coverNoAtom,
  coverTitleAtom,
  departmentAtom,
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
import { useAtomValue } from 'jotai';

Font.register({
  family: 'Petit Formal Script',
  src: PetitFormalScript,
});

Font.register({
  family: 'PT Serif Caption',
  src: PTSerifCaption,
});

Font.register({
  family: 'PT Serif',
  fonts: [{ src: PTSerif }, { src: PTSerifBold, fontWeight: 700 }],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    gap: 10,
    padding: 72,
    fontFamily: 'PT Serif Caption',
    textAlign: 'center',
  },
  motto: {
    fontSize: 12,
    fontFamily: 'Petit Formal Script',
    color: '#333333',
  },
  institution: {
    fontSize: 18,
  },
  image: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    height: 156,
    width: 135,
  },
  text: {
    fontSize: 16,
  },
  course: {
    marginVertical: 24,
    flexDirection: 'column',
    gap: 10,
  },
  th: {
    fontSize: 16,
    textAlign: 'left',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 132,
    fontWeight: 700,
    fontFamily: 'PT Serif',
  },
  colon: {
    fontSize: 16,
    fontWeight: 700,
    flexBasis: 16,
    fontFamily: 'PT Serif',
  },
  td: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'PT Serif',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

// Create Document Component
export function CoverTemplate() {
  const department = useAtomValue(departmentAtom);
  const type = useAtomValue(typeAtom);
  const courseNo = useAtomValue(courseNoAtom);
  const courseTitle = useAtomValue(courseTitleAtom);
  const coverNo = useAtomValue(coverNoAtom);
  const coverTitle = useAtomValue(coverTitleAtom);

  return (
    <Document title="Cover Page">
      <Page size="A4" style={styles.page}>
        <Text style={styles.motto}>Heaven’s Light is Our Guide</Text>
        <Text style={styles.institution}>
          Rajshahi University of Engineering & Technology
        </Text>
        <Image src={RUETLogo} style={styles.image} />
        <Text style={styles.text}>Department of {department}</Text>
        <View style={styles.course}>
          <Text style={styles.text}>Course No.: {courseNo}</Text>
          <Text style={styles.text}>Course Title: {courseTitle}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.th}>
            {type === 'Assignment' ? type : 'Experiment'} No.
          </Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.td}>{coverNo.padStart(2, '0')}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.th}>
            {type === 'Assignment' ? type : 'Experiment'} Title
          </Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.td}>{coverTitle}</Text>
        </View>
      </Page>
    </Document>
  );
}
