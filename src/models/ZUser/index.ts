import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Entity from '../Entity';

export default interface ZUser extends Entity, FirebaseAuthTypes.User {}
