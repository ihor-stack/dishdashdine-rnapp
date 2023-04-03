import {useWindowDimensions} from 'react-native';
import React from 'react';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import {Colors} from '@/themes';
import {Text} from 'native-base';
import {ms} from 'react-native-size-matters';

const CollectionTabs = (
  props: SceneRendererProps & {
    navigationState: NavigationState<{key: string; title: string}>;
  },
) => {
  const {width} = useWindowDimensions();

  return (
    <TabBar
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      indicatorStyle={{
        backgroundColor: Colors.ember,
        height: 3,
        borderRadius: 3,
        width: ms(width / 4),
        marginHorizontal: ms(width / 10),
      }}
      style={{
        backgroundColor: Colors.white,
      }}
      renderLabel={({route, color, focused}) => (
        <Text color={focused ? Colors.ember : Colors.grey} fontSize="lg">
          {route.title}
        </Text>
      )}
    />
  );
};

export default CollectionTabs;
