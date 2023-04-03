import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {
  NavigationState,
  SceneRendererProps,
  SceneMap,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import {ms} from 'react-native-size-matters';
import {Text} from 'native-base';
import DeliverLater from './OrderDetails/Tabs/DeliverLater';
import DeliverNow from './OrderDetails/Tabs/DeliverNow';

const deliveryTabs = [
  {key: 'first', title: 'Deliver later'},
  {key: 'second', title: 'Delivery now'},
];

const OrderDeliveryTime = () => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState(deliveryTabs);

  const scenes = SceneMap({
    first: DeliverLater,
    second: DeliverNow,
  });

  const deliveryTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>;
    },
  ) => (
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
      renderLabel={({route, color}) => (
        <Text color={Colors.ember} fontSize="lg">
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <>
      <DynamicView
        flex={1}
        flexDirection="row"
        justifyContent="space-between"
        paddingVertical={20}
        paddingHorizontal={12}
        alignItems="center">
        <DynamicView flexDirection="row" alignItems="center">
          <Feather name="clock" color={Colors.ember} size={27} />
          <DynamicView marginLeft={11}>
            <DynamicText
              fontFamily={fonts.DMSans500Medium}
              fontSize={15}
              lineHeight={18}
              color={Colors.black}>
              Delivery time
            </DynamicText>
          </DynamicView>
        </DynamicView>
        <DynamicView backgroundColor={Colors.lightGrey} borderRadius={100}>
          <Entypo name="chevron-small-down" color={Colors.black} size={29} />
        </DynamicView>
      </DynamicView>
      <TabView
        navigationState={{index, routes}}
        renderScene={scenes}
        renderTabBar={deliveryTabBar}
        onIndexChange={setIndex}
        initialLayout={{width}}
        style={{height: index === 0 ? 260 : 100}}
      />
    </>
  );
};

export default OrderDeliveryTime;
