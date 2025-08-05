

import emailjs from '@emailjs/browser';

export function loadEmailJS() {
  return new Promise((resolve, reject) => {
    try {
      emailjs.init('VVYdVDiOk05Cxm06q'); // tu Public Key
      console.log('EmailJS initialized successfully');
      resolve();
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
      reject(error);
    }
  });
}
