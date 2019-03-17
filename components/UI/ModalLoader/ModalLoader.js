import React from 'react';

import { Modal, Loader, Center } from '../../../styles/ModalLoader';

const ModalLoader = props => (
  <Modal>
    <Center>
      <Loader />
    </Center>
  </Modal>
);

export default ModalLoader;
