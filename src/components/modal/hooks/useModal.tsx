export function useModal() {
  const bodyActiveModalCn = 'modal-open';

  function addEventListenerClose(onClose: () => void) {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') onClose();
    });
  }

  function removeEventListenerClose(onClose: () => void) {
    if (document.body.classList.contains(bodyActiveModalCn)) {
      document.body.removeEventListener('keydown', onClose);
      document.body.classList.remove(bodyActiveModalCn);
    }
  }

  const addClassOpenOnBody = () => {
    document.body.classList.add(bodyActiveModalCn);
  };

  const isHasAcvieModalClassName = () =>
    document.body.classList.contains(bodyActiveModalCn);

  return {
    addClassOpenOnBody,
    isHasAcvieModalClassName,
    addEventListenerClose,
    removeEventListenerClose,
  };
}
