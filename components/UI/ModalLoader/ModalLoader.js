import React from 'react';

import { Modal, Loader, Center } from '../../../styles/ModalLoader';

const ModalLoader = () => (
  <Modal>
    <Center>
      <Loader />
    </Center>
  </Modal>
);

export default ModalLoader;
