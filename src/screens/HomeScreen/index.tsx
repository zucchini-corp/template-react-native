import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useScreen, {ScreenProps} from './useScreen';
import Admob from '@/uis/Admob';
import {AdmobType} from '@/uis/Admob/BannerAD';
import {hp, wp} from '@/assets/globalStyles';
import Popup from '@/uis/Popup';
import usePopup from '@/uis/Popup/usePopup';
import BottomSheet from '@/uis/BottomSheet';
import useBottomSheet from '@/uis/BottomSheet/useBottomSheet';
import List from '@/uis/List';
import DraggableList from '@/uis/List/DraggableList';
import DraggableListView from '@/uis/List/DraggableListView';

const CustomPopup = ({
  data = {text: ''},
  visible = false,
  onClose = () => {},
  onChange = newData => {},
  onConfirm = () => {},
}) => {
  return (
    <Popup
      visible={visible}
      title="제목입니다"
      confirmText="확인"
      onConfirm={onConfirm}
      cancelText="취소"
      onCancel={onClose}>
      <TextInput
        placeholder="입력하세요"
        value={data.text}
        onChangeText={text => onChange({...data, text})}
      />
    </Popup>
  );
};

const CustomBottomSheet = ({
  data = {text: ''},
  visible = false,
  onClose = () => {},
  onChange = newData => {},
  onConfirm = () => {},
}) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      onConfirm={onConfirm}
      renderSubmitButton={({confirm}) => {
        return (
          <TouchableOpacity onPress={confirm}>
            <Text>완료</Text>
          </TouchableOpacity>
        );
      }}>
      <TextInput
        placeholder="입력하세요"
        value={data?.text}
        onChangeText={text => onChange({...data, text})}
      />
    </BottomSheet>
  );
};

const HomeScreen = ({navigation, route}: ScreenProps) => {
  const styles = useStyles();
  const {} = useScreen({navigation, route});

  const [visibleRewardAD, setVisibleRewardAD] = useState<boolean>(false);

  const popup = usePopup<any>({
    onConfirm({hide, data}) {
      // callAPI(data)
      hide();
    },
    onClose({hide}) {
      hide();
    },
  });

  const bottomSheet = useBottomSheet<any>({
    onConfirm({hide, data}) {
      console.log('onConfirm - BottomSheet', data);
      // callAPI(data)
      hide();
    },
    onClose: ({hide}) => {
      console.log('onClose - BottomSheet');
      hide();
    },
  });

  return (
    <SafeAreaView style={styles.screen}>
      {/* <DraggableListView
        items={[
          {id: '1'},
          {id: '2'},
          {id: '3'},
          {id: '4'},
          {id: '5'},
          {id: '6'},
          {id: '7'},
          {id: '8'},
          {id: '9'},
          {id: '10'},
          {id: '11'},
          {id: '12'},
          {id: '13'},
          {id: '14'},
          {id: '15'},
        ]}
      /> */}
      <List items={[0, 1, 2, 3, 4, 5]} />
      {/* <ScrollView style={{flex: 1}}>
        <View style={styles.test}>
          <Text style={styles.test__title}>
            컴포넌트 - 애드몹: 고정 사이즈 배너
          </Text>
          <Admob.Banner type={AdmobType.FixedHeight} />
        </View>
        <View style={styles.test}>
          <Text style={styles.test__title}>
            컴포넌트 - 애드몹: 가변 사이즈 배너
          </Text>
          <Admob.Banner type={AdmobType.Full} />
        </View>
        <View style={styles.test}>
          <Text style={styles.test__title}>컴포넌트 - 애드몹: 리워드</Text>
          <TouchableOpacity
            style={styles.test__button}
            onPress={() => setVisibleRewardAD(true)}>
            <Text style={styles.test__title}>광고보기</Text>
          </TouchableOpacity>
          {visibleRewardAD && <Admob.Reward />}
        </View>
        <View style={styles.test}>
          <Text style={styles.test__title}>컴포넌트 - 팝업</Text>
          <TouchableOpacity
            style={styles.test__button}
            onPress={() => popup.show()}>
            <Text style={styles.test__title}>팝업열기</Text>
          </TouchableOpacity>
          <CustomPopup
            data={popup.data}
            visible={popup.visible}
            onChange={popup.change}
            onClose={popup.close}
            onConfirm={popup.confirm}
          />
        </View>
        <View style={styles.test}>
          <Text style={styles.test__title}>컴포넌트 - 바텀시트</Text>
          <TouchableOpacity
            style={styles.test__button}
            onPress={() => bottomSheet.show()}>
            <Text style={styles.test__title}>바텀시트 열기</Text>
          </TouchableOpacity>
          <CustomBottomSheet
            data={bottomSheet.data}
            visible={bottomSheet.visible}
            onClose={bottomSheet.close}
            onChange={bottomSheet.change}
            onConfirm={bottomSheet.confirm}
          />
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

const testIds = {};

export default Object.assign(HomeScreen, {testIds});

const useStyles = () =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    test: {
      flexDirection: 'column',
      marginBottom: hp(20),
      width: '100%',
    },
    test__title: {
      fontSize: wp(20),
      padding: 10,
    },
    test__button: {
      padding: 10,
      backgroundColor: '#fff',
    },
  });
