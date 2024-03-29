import {useState} from 'react';

interface Props<T> {
  onConfirm: ({hide, data}: {hide: () => void; data?: T}) => void;
  onClose: ({hide}: {hide: () => void}) => void;
}

const usePopup = <T,>({onConfirm, onClose}: Props<T>) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const confirm = () => {
    onConfirm({hide, data});
    setData(undefined);
  };

  const close = () => {
    onClose({hide});
    setData(undefined);
  };

  const change = (newData: T) => {
    setData(newData);
  };

  return {
    visible,
    show,
    hide,
    confirm,
    close,
    change,
    data,
  };
};

export default usePopup;
