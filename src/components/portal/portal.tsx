import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(wrapperId: string, className?: string) {
  const el = document.createElement('div');
  el.setAttribute('id', wrapperId);

  if (className) {
    el.classList.add(className);
  }
  document.body.appendChild(el);
  return el;
}

function ReactPortal({
  children,
  className,
  wrapperId,
}: {
  children: React.ReactNode;
  className?: string;
  wrapperId: string;
}) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null,
  );

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId, className);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default ReactPortal;
