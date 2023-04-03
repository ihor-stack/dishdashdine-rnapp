import {Text} from 'react-native';
import Animated from 'react-native-reanimated';

export {default as DynamicText} from './DynamicText';
export {default as DynamicView} from './DynamicView';
export {default as ErrorBoundaryWithRetry} from './ErrorBoundaryWithRetry';
export {default as DynamicPressable} from './DynamicPressable';
export {default as DynamicAnimatedView} from './DynamicAnimatedView';
export {default as DynamicAnimatedPressable} from './DynamicAnimatedPressable';
export {default as DynamicImage} from './DynamicImage';
export {default as SafeAreaViewContainer} from './SafeAreaViewContainer';
export {default as DynamicTextInput} from './DynamicTextInput';
export {default as DynamicImageBackground} from './DynamicImageBackground';
export {default as NavigationHeader} from './NavigationHeader';
export {default as Search} from './Search';

export const AnimatedText = Animated.createAnimatedComponent(Text);
