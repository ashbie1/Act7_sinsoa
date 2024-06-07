// src/components/DataForm.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Add from './Add';
import Edit from './Edit';

const DataForm = () => {
  const [data, setData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateRecord, setUpdateRecord] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://app.netlify.com/sites/candid-capybara-620aae/logs/functions/api');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://app.netlify.com/sites/candid-capybara-620aae/logs/functions/api/${id}`);
      setData(data.filter(item => item._id !== id));
      message.success('Author deleted successfully');
    } catch (error) {
      message.error('Failed to delete author');
    }
  };

  const handleUpdateClick = (record) => {
    setUpdateRecord(record);
    setUpdateMode(true);
  };

  const handleUpdate = (id, updatedData) => {
    setData(data.map(item => item._id === id ? { ...item, ...updatedData } : item));
    setUpdateMode(false);
  };

  const handleAdd = (newData) => {
    setData([...data, newData]);
  };

  const columns = [
    { title: 'Artist', dataIndex: 'artist', key: 'artist' },
    { title: 'Song', dataIndex: 'song', key: 'song' },
    { title: 'Ratings', dataIndex: 'ratings', key: 'ratings' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <EditOutlined style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleUpdateClick(record)} />
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
            <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} rowKey="_id" />
      <Add onAdd={handleAdd} />
      {updateMode && <Edit author={updateRecord} onUpdate={handleUpdate} onCancel={() => setUpdateMode(false)} />}
    </div>
  );
};

export default DataForm;
