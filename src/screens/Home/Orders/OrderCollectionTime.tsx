import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {DynamicText, DynamicView} from '@/components';
import {Colors, fonts} from '@/themes';
import {SceneMap, TabView} from 'react-native-tab-view';
import CollectLater from './OrderDetails/Tabs/CollectLater';
import CollectNow from './OrderDetails/Tabs/CollectNow';
import {useWindowDimensions} from 'react-native';
import CollectionTabs from './OrderDetails/Tabs/CollectionTabs';
import {ORDER_TYPE} from '@/constants';

const collectionTabs = [
  {key: 'first', title: 'Collect later'},
  {key: 'second', title: 'Collect now'},
];

const deliveryTabs = [
  {key: 'first', title: 'Delivery later'},
  {key: 'second', title: 'Delivery now'},
];

export interface OrderCollectionTimeProps {
  onTabChanged: (value: any) => void;
  onChangeDate: (value: any) => void;
  collectDate: any;
  defaultTabIndex: number;
  orderType: number;
  prepTimeMax: number;
  prepTimeMin: number;
}

const OrderCollectionTime = ({
  onTabChanged,
  onChangeDate,
  collectDate,
  defaultTabIndex,
  orderType,
  prepTimeMax,
  prepTimeMin,
}: OrderCollectionTimeProps) => {
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState(defaultTabIndex);
  const [routes] = useState(
    orderType === ORDER_TYPE.COLLECTION ? collectionTabs : deliveryTabs,
  );

  const scenes = SceneMap({
    first: () => (
      <CollectLater
        value={collectDate}
        prepTimeMin={prepTimeMin}
        onChangeDate={onChangeDate}
      />
    ),
    second: () => (
      <CollectNow
        orderType={orderType}
        prepTimeMin={prepTimeMin}
        prepTimeMax={prepTimeMax}
      />
    ),
  });

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
              {orderType === ORDER_TYPE.COLLECTION ? 'Collection' : 'Delivery'}{' '}
              time
            </DynamicText>
          </DynamicView>
        </DynamicView>
      </DynamicView>
      <TabView
        navigationState={{index, routes}}
        renderScene={scenes}
        renderTabBar={CollectionTabs}
        onIndexChange={tabIndex => {
          setIndex(tabIndex);
          onTabChanged(tabIndex);
        }}
        initialLayout={{width}}
        style={{height: index === 0 ? 260 : 100}}
      />
    </>
  );
};

export default OrderCollectionTime;
