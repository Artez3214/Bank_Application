import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
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
    const {phone, signin}  = useLocalSearchParams<{phone: string;  signin:  string}>();
    const [code,setCode]   = useState('');
    const {signIn}         =  useSignIn();
    const {signUp, setActive} = useSignUp();

    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value: code,
      setValue: setCode,
    });

    useEffect(() => {
    if(code.length === 6){
        if(signin === 'true'){
            verifySignIn();
        }
        else{
            verifyCode();
        }
        //code Verification
    }
    }, [code]);
    const verifyCode = async () => {
        try {
          await signUp!.attemptPhoneNumberVerification({
            code,
          });
          await setActive!({ session: signUp!.createdSessionId });
        } catch (err) {
          console.log('error', JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      };
    
      const verifySignIn = async () => {
        try {
          await signIn!.attemptFirstFactor({
            strategy: 'phone_code',
            code,
          });
          await setActive!({ session: signIn!.createdSessionId });
        } catch (err) {
          console.log('error', JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      };
    return (
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>6-digit code</Text>
          <Text style={defaultStyles.descriptionText}>
            Code sent to {phone} unless you already have an account
          </Text>
    
          <CodeField
            ref={ref}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
                {/* Removed the separator for a cleaner design */}
              </Fragment>
            )}
          />
    
          <TouchableOpacity onPress={() => {/* Define your navigation logic here */}}>
            <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
          </TouchableOpacity>
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
