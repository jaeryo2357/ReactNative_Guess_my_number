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