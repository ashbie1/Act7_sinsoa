// src/components/Edit.jsx

import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const Edit = ({ author, onUpdate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`https://app.netlify.com/sites/candid-capybara-620aae/logs/functions/api${author._id}`, values);
      onUpdate(author._id, response.data);
      message.success('Author updated successfully');
      onCancel();
    } catch (error) {
      message.error('Failed to update author');
    }
  };

  return (
    <Modal title="Edit Author" visible={true} onCancel={onCancel} footer={null}>
      <Form form={form} initialValues={author} onFinish={onFinish} layout="vertical">
        <Form.Item name="artist" label="Artist">
          <Input />
        </Form.Item>
        <Form.Item name="song" label="Song">
          <Input />
        </Form.Item>
        <Form.Item name="ratings" label="Ratings">
          <Input type="number" min={1} max={5} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

Edit.propTypes = {
  author: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Edit;
