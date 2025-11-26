# 그림자 스타일 지정
스타일을 지정할 때, 각 OS에서만 변환 가능한 속성이 있음을 주의하자.
뷰의 그림자 스타일을 지정할 때 Android는    `elevation`, iOS는 `shadow*` 속성을 사용해야 한다.

```js
    const styles = StyleSheets.create({
        elevation: 4, //Android

        // ios below
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25
    })
```

# TextInput 제어하기

[공식 문서](https://reactnative.dev/docs/textinput)

## 글자 수 제한
```js
 <TextInput style={styles.numberInput} maxLength={2}/>
```

## 키보드 타입 (숫자 키패드 노출)
```js
     <TextInput ...
        keyboardType="number-pad"
        ...
    />
```

키보드 타입을 보면 OS마다 지원하는 값이 다르다.

플랫폼 마다 다른 값을 주고 싶은 경우, Platform.select or 삼항 연산자를 사용하자.

```js
<TextInput
  keyboardType={Platform.select({
    ios: 'numbers-and-punctuation',
    android: 'numeric',
  })}
/>
```

# Pressable, Style 객체 재구조화로 iOS ripple 효과
Pressable은 pressed 이벤트가 발생할 때마다 React Native에 의해 style 객체 생성 이벤트가 발생한다.
```js
 style={({pressed}) => pressed ? [
                styles.buttonInnerContainer, styles.pressed
             ] : styles.buttonInnerContainer}
```

# Expo 선형 그라데이션 사용하기

expo 커맨드가 없다면..
```
npm install expo-cli --global
```

[공식 문서](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
```js
    import { LinearGradient } from 'expo-linear-gradient';

    <LinearGradient colors={["#720637", '#ddb52f', ]} style={styles.rootScreen}>
        <StartGameScreen />
    </LinearGradient>
```

# ImageBackground 사용하기

Image 컴포넌트와 유사하지만, 화면 전경에 이미지를 표시하기 위해 만들어진 컴포넌트

```js
 <ImageBackground
        style={styles.rootScreen}
        source={require('./assets/images/background.png')}
        resizeMode='cover'
        imageStyle={styles.imageBackground}
  >
        <StartGameScreen />
 </ImageBackground>
```

source 속성으로 표시할 이미지를 지정한다. 특징으로는 view style과 imageStyle를 분리해서 지정할 수 있다.

# Alert 띄우기

```js
Alert.alert(
    'Invalid number', //title
    'number must be 0 between 99', //message
    [{text: "okay", style:"destructive", onPress: resetHandler}] //buttons
); 
```

# SafeAreView (iOS 노치)
Android는 노치가 없어 적용이 안됨.
```js
<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
```

react-native 0.81.5 기준 Deprecated

대신 아래 패키지를 추가하는 것을 권장
https://github.com/AppAndFlow/react-native-safe-area-context

# Color, 상수 전역으로 관리하기

resource처럼 정적 리소스 관리하는 객체는 없군.

```js
const Colors = {
    primary500: '#720637',
    primary600: '#91305cff',
    primary700: '#460522ff',
    accent500: '#ddb52f'
}

export default Colors;
```

```js
import Colors from './constants/colors';

Colors.primary500
```

# UseEffect 사용하기
```js
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])
```
리액트에서 상태가 변경될 떄마다 호출되는 액션 수행

# 계단식 스타일 적용하기
```js
function DescriptionText({children, style}) {
    return <Text style={[styles.text, style]}>{children}</Text>
}
```
CSS처럼 외부에서 style를 추가 및 오버라이드 할 수 있도록 구현하는 방법


# Expo Vector Icon 사용하기
```js
import Ionicons from '@expo/vector-icons/Ionicons';

<Ionicons name="remove" size={24} color="white"/>
```

# Expo Font 사용하기

루트 컴포넌트인 App.js에서 실행해서 폰트 가져오기.

```js
import { useFonts } from 'expo-font'

  const [fontLoaded] = useFonts({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
  })

    const [fontLoaded, error] = useFonts({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
  })
```
두번째 필드에서 error를 받아볼 수 있다.

# Expo Loading Screen (Deprecated)
```js
import AppLoding from 'expo-app-loading'

  if (!fontLoaded) {
    return <AppLoding />
  }
```

>expo-app-loading is deprecated in favor of expo-splash-screen: use SplashScreen.preventAutoHideAsync() and SplashScreen.hideAsync() instead. https://docs.expo.dev/versions/latest/sdk/splash-screen/

```js
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        // do something async here
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    doAsyncStuff();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return <Stack />;
}
```

# Text 중첩

```js
    <Text style={styles.summaryText}>
            Your phone needed 
            <Text style={styles.highlight}>X</Text> 
            rounds to guess the number
            <Text style={styles.highlight}>Y</Text>
    </Text>
```
Text 컴포넌트는 Text 컴포넌트를 중첩으로 가질 수 있다. 각 컴포넌트 별로 스타일을 다르게 시정할 수 있다.


---

# Section 3

## 동적 너비 설정하기

부모 뷰의 너비를 동적으로 계산하여 너비를 지정
```js
 title: {
        ...
        maxWidth: '80%',
        width: 300,
```

## Dimensions API 

```
import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width
```

Dimensions.get('window') -> Android에서는 상태 표시줄을 제외한 UI 레이아웃 크기
Dimensions.get('screen') -> Android에서는 상태 표시줄을 포함한 전체 레이아웃 크기
iOS에서는 모두 동일!

```js
        width: 300,
        height: 300,
```
디바이스 너비를 고려해서 가로, 세로 사이즈를 동일하게 하려면 Dimensions를 사용하면 좋다.

## useWindowDimensions

Dimensions API는 컴포넌트 밖에서 사용하기 때문에 최초 한번만 실행됨.
기기 configuration change 처럼 동적으로 변경되는 값을 가져오려면 useWindowDimensions을 사용한다.

```js
import { useWindowDimensions } from "react-native";

    const { width, height } = useWindowDimensions()
    const marginTop = height < 380 ? 30 : 100

    <View style={[styles.rootScreen, {marginTop: marginTop}]}>
```

값이 변경되면 컴포넌트가 재구성되면서 변경된 가로, 세로가 재계산된다.

## KeyboardAvoidingView

키보드가 올라올때 뷰를 가리지 않도록 도와주는 컴포넌트

behavior
- position: 뷰의 위치가 키보드 위에 보일 수 있도록 이동 => 영상에서 쓴 방법이지만 잘 쓰지 않는 방법인듯

- height: 키보드 높이만큼 제외된 높이로 수정됨 => Android 권장
- padding: 키보드 높이의 view가 추가됨(padding) => iOS 권장