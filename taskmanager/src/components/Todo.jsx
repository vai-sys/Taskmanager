import React, { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { MdEdit } from "react-icons/md";

const getLocal = () => {
  const list = localStorage.getItem('lists');
  return list ? JSON.parse(list) : [];
}

const Todo = () => {
  const [InputData, setInputData] = useState('');
  const [Items, setItems] = useState(getLocal());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItemId, setEditItemId] = useState(null);

  const editItem = (id) => {
    setToggleSubmit(false);
    const itemToEdit = Items.find(item => item.id === id);
    setInputData(itemToEdit.name);
    setEditItemId(id);
  }

  const deleteItem = (id) => {
    const updatedItems = Items.filter((item) => id !== item.id);
    setItems(updatedItems);
  }

  const remove = () => {
    setItems([]);
  }

  const addItem = () => {
    if (InputData === '') {
    
    } else if (!toggleSubmit) {
      const updatedItems = Items.map(item => {
        if (item.id === editItemId) {
          return { ...item, name: InputData };
        }
        return item;
      });
      setItems(updatedItems);
      setInputData('');
      setToggleSubmit(true);
      setEditItemId(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: InputData };
      setItems([...Items, allInputData]);
      setInputData('');
    }
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(Items));
  }, [Items]);

  return (
    <div className='body'>
      <div className='main-div'>
        <div className='child-div'>
          <h3>Add your List here.. 👉</h3>
          <div className='addItem'>
            <div className='inputWithIcon' style={{ width: '100%' }}>
              <input
                placeholder='✍️ write here'
                value={InputData}
                onChange={(e) => {
                  setInputData(e.target.value);
                }}
                style={{ width: 500 }}
              />
              {
                toggleSubmit ? <IoIosAdd onClick={addItem} /> : <MdEdit className='edit' onClick={addItem} />
              }
            </div>
            <div className='showItems'>
              {Items.map((item) => (
                <div className='eachItem' key={item.id} style={{ width: '100%' }}>
                  {
                    editItemId === item.id ? (
                      <input
                        type="text"
                        value={InputData}
                        onChange={(e) => setInputData(e.target.value)}
                      />
                    ) : (
                      <p>{item.name}</p>
                    )
                  }
                  <div className='btn'>
                    <MdDeleteOutline className='delete' onClick={() => deleteItem(item.id)} />
                    <MdEdit className='edit' onClick={() => editItem(item.id)} />
                  </div>
                </div>
              ))}
            </div>
            <div className='btns'>
              <button onClick={remove}>Remove All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;