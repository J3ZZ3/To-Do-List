import React, { useState, useCallback } from 'react';
import CustomAlert from '../components/CustomAlert';

export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback(({
    type = 'info',
    title,
    message,
    duration = 3000,
    showConfirmButton = false,
    onConfirm,
    confirmText,
    showCancelButton = false,
    onCancel,
    cancelText
  }) => {
    setAlert({
      type,
      title,
      message,
      duration,
      showConfirmButton,
      onConfirm,
      confirmText,
      showCancelButton,
      onCancel,
      cancelText
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const AlertComponent = alert ? (
    <CustomAlert
      {...alert}
      onClose={hideAlert}
    />
  ) : null;

  return { showAlert, hideAlert, AlertComponent };
}; 