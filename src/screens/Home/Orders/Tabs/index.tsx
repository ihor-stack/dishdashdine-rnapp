import React, {useCallback, useEffect, useState} from 'react';
import {Text} from 'native-base';
import {
  TabBar,
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import Colors from '@/themes/colors';
import {ScaledSize, useWindowDimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import {DynamicView} from '@/components';
import UpcomingOders from './Upcoming';
import CompletedOrders from './Completed';
import {useRoute} from '@react-navigation/native';

export const orderTabs = [
  {key: 'upcoming', title: 'Upcoming Orders'},
  {key: 'completed', title: 'Completed Orders'},
];

const Orders = () => {
  const params = useRoute().params as any;
  const {width}: ScaledSize = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState(orderTabs);

  useEffect(() => {
    if (params?.tab === 'completed') {
      setIndex(1);
    } else if (params?.tab === 'upcoming') {
      setIndex(0);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scenes = useCallback(
    SceneMap({
      upcoming: UpcomingOders,
      completed: CompletedOrders,
    }),
    [],
  );

  const OrdersTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => (
    <TabBar
      {...props}
      onTabPress={(scene: any) => {
        const {route} = scene;
        props.jumpTo(route.key);
      }}
      onTabLongPress={scene => {
        const {route} = scene;
        props.jumpTo(route.key);
      }}
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

  return (
    <DynamicView flex={1}>
      <TabView
        navigationState={{index, routes}}
        renderScene={scenes}
        renderTabBar={OrdersTabBar}
        onIndexChange={setIndex}
      />
    </DynamicView>
  );
};

export default Orders;
