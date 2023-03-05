import { useCallback, useMemo, useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = useCallback(() => setShowModal(true), []);
  const closeModalHandler = useCallback(() => setShowModal(false), []);

  return useMemo(() => [showModal, showModalHandler, closeModalHandler] as const, [showModal]);
};

export { useModal };
