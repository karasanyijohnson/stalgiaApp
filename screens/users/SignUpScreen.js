import React,{useReducer,useCallback,useState} from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator
   } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import {useDispatch} from 'react-redux'

  import Input from '../../components/users/Input';
  import Card from '../../components/users/Card';
  import Colors from '../../constants/Colors'
  import *as AuthActions from '../../store/actions/Auth';
  

  const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

  const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };
  
const SignUpScreen = props =>{
   const[isLoading,setIsLoading]= useState(false)
    const dispatch = useDispatch();
    
 const [formState, dispatchFormState] = useReducer(formReducer,{
    inputValues: {
      username:'',
      phone_number:'',
      email: '',
      password: ''
    },
    inputValidities: {
      username:false,
      phone_number:false,
      email: false,
      password: false
    },
    formIsValid: false
  });

  const signUpHandler= async()=>{
    let action;
       action=AuthActions.signup(
        formState.inputValues.username,
        formState.inputValues.phone_number,
        formState.inputValues.email,
        formState.inputValues.password
      )
    setIsLoading(true)
    try{
      await dispatch(action)
    }catch{
      setIsLoading(false)
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );
    return (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}
        >  
          <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
              <ScrollView>
              <Input
              id="username"
              label="username"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid username."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
              <Input
              id="phone_number"
              label="phone number"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Please enter a valid Phone number."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
             <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
                <View style={styles.buttonContainer}>
                </View>
                <View style={styles.buttonContainer}>
                  {isLoading?(<ActivityIndicator size='small' color={Colors.primary}/>):(
                    <Button
                    title='CREATE AN ACCOUNT'
                    color={Colors.accent}
                    onPress={signUpHandler}
                  />
                   )
                  }
                 
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title='LOGIN'
                    color={Colors.primary}
                    onPress={()=>{
                      props.navigation.navigate('login')
                    }}
                  />
                </View>
              </ScrollView>
            </Card>
          </LinearGradient>
        </KeyboardAvoidingView>
      );
}

SignUpScreen.navigationOptions = {
    headerTitle: 'Stalgia'
  };
const styles= StyleSheet.create({
    screen: {
        flex: 1
      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 600,
        padding: 20
      },
      buttonContainer: {
        marginTop: 10
      }  
    })

export default SignUpScreen