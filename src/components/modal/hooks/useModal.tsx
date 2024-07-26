import { useRef } from 'react';

type UseModalProps = {
  onClose: () => void;
};

export function useModal({ onClose }: UseModalProps) {
  const ref = useRef<HTMLDivElement[]>([]);
  const focusedElements = useRef<any>([]);

  const bodyActiveModalCn = 'modal-open';

  function eventKeyListener(el: HTMLElement) {
    focusedElements.current = el.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabIndex="-1"]',
    );

    el.focus();

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (el && e.key === 'Tab') {
        handleTabKey(e);
      }
    });
  }

  function removeEventKeyListener() {
    if (document.body.classList.contains(bodyActiveModalCn)) {
      document.body.removeEventListener('keydown', onClose);
      document.body.classList.remove(bodyActiveModalCn);
    }
  }

  const addClassOpenOnBody = () => {
    document.body.classList.add(bodyActiveModalCn);
  };

  const handleTabKey = (e: KeyboardEvent) => {
    const firstElement = focusedElements.current[0];
    const lastElement =
      focusedElements.current[focusedElements.current.length - 1];

    if (!e.shiftKey && document.activeElement == lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && e.target === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  return {
    ref,
    addClassOpenOnBody,
    eventKeyListener,
    removeEventKeyListener,
  };
}
