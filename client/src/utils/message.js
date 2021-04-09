import { store } from 'react-notifications-component';

export const showError = (message) => {
  // type=['success', 'danger', 'info', 'default', 'warning']
  store.addNotification({
    animationIn: [ 'animated', 'fadeIn' ],
    animationOut: [ 'animated', 'fadeOut' ],
    container: 'top-right',
    dismiss: {
      duration: 5000,
      // onScreen: true,
      pauseOnHover: true
    },
    insert: 'top',
    message,
    title: 'Error!',
    type: 'danger'
  });
};

export const showInfo = (message) => {
  store.addNotification({
    animationIn: [ 'animated', 'fadeIn' ],
    animationOut: [ 'animated', 'fadeOut' ],
    container: 'top-right',
    dismiss: {
      duration: 5000,
      pauseOnHover: true
    },
    insert: 'top',
    message,
    title: 'Info',
    type: 'info'
  });
};

export const showWarning = (message) => {
  store.addNotification({
    animationIn: [ 'animated', 'fadeIn' ],
    animationOut: [ 'animated', 'fadeOut' ],
    container: 'top-right',
    dismiss: {
      duration: 5000,
      pauseOnHover: true
    },
    insert: 'top',
    message,
    title: 'Warning!',
    type: 'warning'
  });
};

export const showSuccess = (message) => {
  store.addNotification({
    animationIn: [ 'animated', 'fadeIn' ],
    animationOut: [ 'animated', 'fadeOut' ],
    container: 'top-right',
    dismiss: {
      duration: 5000,
      pauseOnHover: true
    },
    insert: 'top',
    message,
    title: 'Success!',
    type: 'success'
  });
};
