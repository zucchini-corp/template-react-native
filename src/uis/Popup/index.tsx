import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '@/assets/globalStyles';

interface PopupProps {
  screenTestID?: string;
  confirmButtonTestID?: string;
  cancelButtonTestID?: string;
  visible?: boolean;
  title?: string;
  cancelText?: string;
  onCancel?: () => void;
  confirmText?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

const Popup = ({
  screenTestID,
  confirmButtonTestID,
  cancelButtonTestID,
  visible = false,
  title,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
  children,
}: PopupProps) => {
  const styles = useStyles();
  return (
    <Modal
      testID={screenTestID}
      visible={visible}
      onRequestClose={onCancel}
      transparent>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.background}
        onPress={onCancel}>
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          {title && (
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
          <View style={styles.body}>{children}</View>
          <View style={styles.buttonContainer}>
            {cancelText && (
              <TouchableOpacity
                testID={cancelButtonTestID}
                style={[styles.button, styles.buttonCancel]}
                onPress={onCancel}>
                <Text style={[styles.buttonText, styles.buttonCancelText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            {confirmText && (
              <TouchableOpacity
                testID={confirmButtonTestID}
                style={[styles.button, styles.buttonConfirm]}
                onPress={onConfirm}>
                <Text style={[styles.buttonText, styles.buttonConfirmText]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default Popup;

const useStyles = () =>
  StyleSheet.create({
    background: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#fff',
      paddingVertical: wp(24),
      paddingHorizontal: wp(24),
      width: '90%',
      borderRadius: hp(8),
    },
    title: {},
    titleText: {
      color: '#333',
      fontSize: wp(20),
      textAlign: 'center',
    },
    body: {
      marginBottom: hp(20),
      marginTop: hp(10),
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      height: hp(48),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: hp(8),
    },
    buttonText: {
      textAlign: 'center',
      color: '#333',
      fontSize: wp(20),
    },
    buttonCancel: {
      marginRight: wp(8),
    },
    buttonCancelText: {},
    buttonConfirm: {
      backgroundColor: '#212529',
    },
    buttonConfirmText: {
      color: '#f8f9fa',
    },
  });
