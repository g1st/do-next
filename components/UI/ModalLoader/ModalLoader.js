import React from 'react';

import { Modal, Loader, Center } from '../../../styles/ModalLoader';

const ModalLoader = props => {
  return (
    <Modal>
      <Center>
        <Loader />
      </Center>
    </Modal>
  );
};

export default ModalLoader;
