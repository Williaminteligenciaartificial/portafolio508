import emailjs from '@emailjs/browser';

const formDOM = document.querySelector('#form');
const modalDOM = document.querySelector('#modal');
const closeButton = document.querySelector('#btn_close-modal');
let currentLanguage = 'en'; // puedes actualizarlo con eventos de idioma

const FORM_MESSAGES = {
  en: {
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Error sending message. Please try again.',
    send: 'Send',
  },
  es: {
    sending: 'Enviando...',
    success: '¡Mensaje enviado correctamente!',
    error: 'Error al enviar el mensaje. Por favor intenta nuevamente.',
    send: 'Enviar',
  }
};

function openModal(message) {
  modalDOM.querySelector('p').textContent = message;
  modalDOM.setAttribute('open', '');
}

function closeModal() {
  modalDOM.removeAttribute('open');
}

function sendEmail() {
  if (!formDOM) return;

  formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = formDOM.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = `<i class="bx bx-loader-alt bx-spin"></i> ${FORM_MESSAGES[currentLanguage].sending}`;

    try {
      const result = await emailjs.sendForm(
        'service_i78o8xe',        // ID de tu servicio
        'template_nlu1aan',       // ID de tu plantilla
        formDOM,
        'VVYdVDiOk05Cxm06q'       // TU Public Key
      );

      console.log('SUCCESS!', result.text);
      formDOM.reset();
      openModal(FORM_MESSAGES[currentLanguage].success);

    } catch (error) {
      console.error('FAILED...', error);
      openModal(FORM_MESSAGES[currentLanguage].error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = `<strong>${FORM_MESSAGES[currentLanguage].send}</strong>`;
    }
  });

  // Modal listeners
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  modalDOM.addEventListener('click', (e) => {
    if (e.target === modalDOM) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

export default sendEmail;
