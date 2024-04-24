import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp, useUser } from '@clerk/clerk-expo';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  const CELL_COUNT = 6;

const Page = () => {
  const { email, signin } = useLocalSearchParams<{ email: string; signin: string }>();
  const [code, setCode] = useState('');
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const { user } = useUser();

  let phoneNumber = '';
if (user && user.phoneNumbers.length > 0) {
  phoneNumber = user.phoneNumbers[0].phoneNumber;
}
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  
    useEffect(() => {
      if (code.length === 6) {
        if (signin === 'true') {
          verifySignIn();
        } else {
          verifyCode();
        }
      }
    }, [code]);

    const verifyCode = async () => {
      try {
        await signUp!.attemptEmailAddressVerification({
          code,
        });
        router.push({ pathname: '/phoneNumberLogin'});
        //await setActive!({ session: signUp!.createdSessionId });
      } catch (err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    };
  
    const verifySignIn = async () => {
      try {
        await signIn!.prepareSecondFactor({
          strategy: "phone_code",
        });
       // await setActive!({ session: signIn!.createdSessionId });
       router.push({ pathname: '/verificationPhone/[phone]', params: { phone: phoneNumber }});
      } catch (err) {
        console.log('error', JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          Alert.alert('Error', err.errors[0].message);
        }
      }
    };
    return (
        <View style={[defaultStyles.container, { backgroundColor: Colors.background }]}>
          <Text style={[defaultStyles.header, { backgroundColor: '#030304', color: '#fdfffc', padding: 10, marginTop: 50 }]}>6-digit code</Text>
          <Text style={defaultStyles.descriptionText}>
            Code sent to {email} unless you already have an account
          </Text>
    
          <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
            {index === 2 }
          </Fragment>
        )}
      />
    
    <Link href={'/login'} replace asChild>
        <TouchableOpacity>
          <Text style={[defaultStyles.textLink]}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </Link>
        </View>
      );
    };
const styles = StyleSheet.create({
    codeFieldRoot: {
      marginVertical: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      gap: 12,
    },
    cellRoot: {
      width: 45,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.lightGray,
      borderRadius: 8,
    },
    cellText: {
      color: '#000',
      fontSize: 36,
      textAlign: 'center',
    },
    focusCell: {
      paddingBottom: 8,
    },
    separator: {
      height: 2,
      width: 10,
      backgroundColor: Colors.gray,
      alignSelf: 'center',
    },
    inputContainer: {
        marginVertical: 40,
        flexDirection: 'row',
      },
  });
export default Page;
