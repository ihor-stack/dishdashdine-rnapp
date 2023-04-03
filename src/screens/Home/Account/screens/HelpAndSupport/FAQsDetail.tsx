import {
  DynamicImage,
  DynamicPressable,
  DynamicText,
  DynamicView,
} from '@/components';
import {Colors, fonts} from '@/themes';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const FAQsDetail = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContainer}>
      <DynamicView marginTop={18}>
        <DynamicView marginBottom={7}>
          <DynamicText
            fontFamily={fonts.DMSans500Medium}
            lineHeight={20}
            fontSize={15}
            color={Colors.black}>
            How does Dish Dash Dine work?
          </DynamicText>
        </DynamicView>
        <DynamicText
          fontFamily={fonts.DMSans400Regular}
          lineHeight={16}
          fontSize={13}
          color={Colors.grey}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          bibendum, purus ut rutrum molestie, ipsum nulla hendrerit nunc, ut
          condimentum velit ex ut nisl. Morbi nunc ex, hendrerit ac velit non,
          elementum porta nulla. Donec ac justo molestie, elementum sem sed,
          molestie libero. Duis at diam cursus, molestie arcu id, volutpat mi.
          Praesent ante lectus, mollis in rutrum vel, tempor sed lacus. Sed
          congue sollicitudin risus id tristique. Nulla sagittis nisi sed
          efficitur placerat. Sed imperdiet lacus ligula. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Nam vulputate dolor eget ante
          convallis iaculis. Quisque in arcu accumsan, suscipit quam sed,
          pharetra diam. Fusce non ex ipsum. Quisque pellentesque cursus eros,
          vitae porttitor libero convallis non. Praesent lacinia purus ultricies
          fringilla fringilla. Vivamus et suscipit turpis, a condimentum ex.
          Cras nisi ex, luctus vitae efficitur ac, dictum vitae dolor. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Morbi bibendum,
          purus ut rutrum molestie, ipsum nulla hendrerit nunc, ut condimentum
          velit ex ut nisl. Morbi nunc ex, hendrerit ac velit non, elementum
          porta nulla. Donec ac justo molestie, elementum sem sed, molestie
          libero. Duis at diam cursus, molestie arcu id, volutpat mi. Praesent
          ante lectus, mollis in rutrum vel, tempor sed lacus. Sed congue
          sollicitudin risus id tristique. Nulla sagittis nisi sed efficitur
          placerat. Sed imperdiet lacus ligula. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nam vulputate dolor eget ante convallis
          iaculis. Quisque in arcu accumsan, suscipit quam sed, pharetra diam.
          Fusce non ex ipsum. Quisque pellentesque cursus eros, vitae porttitor
          libero convallis non. Praesent lacinia purus ultricies fringilla
          fringilla. Vivamus et suscipit turpis, a condimentum ex. Cras nisi ex,
          luctus vitae efficitur ac, dictum vitae dolor. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Morbi bibendum, purus ut rutrum
          molestie, ipsum nulla hendrerit nunc, ut condimentum velit ex ut nisl.
          Morbi nunc ex, hendrerit ac velit non, elementum porta nulla. Donec ac
          justo molestie, elementum sem sed, molestie libero. Duis at diam
          cursus, molestie arcu id, volutpat mi. Praesent ante lectus, mollis in
          rutrum vel, tempor sed lacus. Sed congue sollicitudin risus id
          tristique. Nulla sagittis nisi sed efficitur placerat. Sed imperdiet
          lacus ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam vulputate dolor eget ante convallis iaculis. Quisque in arcu
          accumsan, suscipit quam sed, pharetra diam. Fusce non ex ipsum.
          Quisque pellentesque cursus eros, vitae porttitor libero convallis
          non. Praesent lacinia purus ultricies fringilla fringilla. Vivamus et
          suscipit turpis, a condimentum ex. Cras nisi ex, luctus vitae
          efficitur ac, dictum vitae dolor. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Morbi bibendum, purus ut rutrum molestie,
          ipsum nulla hendrerit nunc, ut condimentum velit ex ut nisl. Morbi
          nunc ex, hendrerit ac velit non, elementum porta nulla. Donec ac justo
          molestie, elementum sem sed, molestie libero. Duis at diam cursus,
          molestie arcu id, volutpat mi. Praesent ante lectus, mollis in rutrum
          vel, tempor sed lacus. Sed congue sollicitudin risus id tristique.
          Nulla sagittis nisi sed efficitur placerat. Sed imperdiet lacus
          ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          vulputate dolor eget ante convallis iaculis. Quisque in arcu accumsan,
          suscipit quam sed, pharetra diam. Fusce non ex ipsum. Quisque
          pellentesque cursus eros, vitae porttitor libero convallis non.
          Praesent lacinia purus ultricies fringilla fringilla. Vivamus et
          suscipit turpis, a condimentum ex. Cras nisi ex, luctus vitae
          efficitur ac, dictum vitae dolor.
        </DynamicText>
      </DynamicView>
    </ScrollView>
  );
};

export default FAQsDetail;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.white,
  },
  scrollViewContainer: {
    marginHorizontal: 11,
    paddingBottom: 20,
  },
});
