import RUETLogo from '@/assets/RUET-Logo.png';
import MonotypeCorsiva from '@/assets/fonts/Monotype-Corsiva-Regular.ttf';
import TeXGyreTermesBold from '@/assets/fonts/TeXGyreTermes-Bold.ttf';
import TeXGyreTermes from '@/assets/fonts/TeXGyreTermes-Regular.ttf';
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
  family: 'Monotype Corsiva',
  src: MonotypeCorsiva,
});

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
    fontSize: 12,
    fontFamily: 'Monotype Corsiva',
    color: '#333333',
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
  text: {
    fontSize: 16,
  },
  course: {
    marginVertical: 16,
    flexDirection: 'column',
  },
  th: {
    fontSize: 16,
    textAlign: 'left',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 120,
    fontWeight: 700,
  },
  colon: {
    fontSize: 16,
    fontWeight: 700,
    flexBasis: 16,
  },
  td: {
    fontSize: 16,
    textAlign: 'left',
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
          Rajshahi University of Engineering & Technology, Bangladesh
        </Text>
        <Image src={RUETLogo} style={styles.image} />
        <Text style={styles.text}>Department of {department}</Text>
        <View style={styles.course}>
          <Text style={styles.text}>Course No.: {courseNo}</Text>
          <Text style={styles.text}>Course Title: {courseTitle}</Text>
        </View>
        <View>
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
        </View>
      </Page>
    </Document>
  );
}
