// src/components/Add.jsx

import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const Add = ({ onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/authors', values);
      onAdd(response.data);
      message.success('Author added successfully');
      form.resetFields();
      setVisible(false);
    } catch (error) {
      message.error('Failed to add author');
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>Add Author</Button>
      <Modal title="Add Author" visible={visible} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="artist" label="Artist" rules={[{ required: true, message: 'Artist is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="song" label="Song" rules={[{ required: true, message: 'Song is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ratings" label="Ratings" rules={[{ required: true, message: 'Ratings are required' }]}>
            <Input type="number" min={1} max={5} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

Add.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default Add;
