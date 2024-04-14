import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, hp, wp} from '@/assets/globalStyles';
import Typo from '@/uis/Typo';

interface PopupProps {
  testIds?: {
    screen?: string;
    confirmButton?: string;
    cancelButton?: string;
  };
  visible?: boolean;
  loading?: boolean;
  title?: string;
  cancelText?: string;
  onCancel?: () => void;
  confirmText?: string;
  onConfirm?: () => void;
  disabledConfirmButton?: boolean;
  removeText?: string;
  onRemove?: () => void;
  children?: React.ReactNode;
}

const Popup = ({
  testIds,
  visible = false,
  loading = false,
  title,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
  disabledConfirmButton,
  removeText,
  onRemove,
  children,
}: PopupProps) => {
  const styles = useStyles();
  return (
    <Modal
      testID={testIds?.screen}
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
              <Typo style={styles.titleText} fontWeight="bold">
                {title}
              </Typo>
            </View>
          )}
          <View style={styles.body}>{children}</View>
          <View style={styles.buttonContainer}>
            {cancelText && (
              <TouchableOpacity
                testID={testIds?.cancelButton}
                style={[styles.button, styles.buttonCancel]}
                onPress={onCancel}>
                <Typo style={[styles.buttonText, styles.buttonCancelText]}>
                  {cancelText}
                </Typo>
              </TouchableOpacity>
            )}
            {removeText && (
              <TouchableOpacity
                testID={testIds?.confirmButton}
                style={[styles.button, styles.buttonCancel]}
                onPress={onRemove}>
                <Typo style={[styles.buttonText, styles.buttonCancelText]}>
                  {removeText}
                </Typo>
              </TouchableOpacity>
            )}
            {confirmText && (
              <TouchableOpacity
                testID={testIds?.confirmButton}
                disabled={disabledConfirmButton}
                style={[
                  styles.button,
                  styles.buttonConfirm,
                  disabledConfirmButton && styles.buttonDisabled,
                ]}
                onPress={onConfirm}>
                <Typo style={[styles.buttonText, styles.buttonConfirmText]}>
                  {confirmText}
                </Typo>
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
    buttonDisabled: {
      backgroundColor: '#bbb',
    },
    buttonConfirmText: {
      color: '#f8f9fa',
    },
  });
