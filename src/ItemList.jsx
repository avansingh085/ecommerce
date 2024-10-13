import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, selectItem } from './globalSlice.jsx';

function ItemList() {
  const items = useSelector((state) => state.items.items);
  const selectedItem = useSelector((state) => state.items.selectedItem);
  const dispatch = useDispatch();
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: newItemName };
    dispatch(addItem(newItem));
    setNewItemName('');
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleSelectItem = (id) => {
    dispatch(selectItem(id));
  };

  return (
    <div>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => handleSelectItem(item.id)}>Select</button>{' '}
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {selectedItem && (
        <div>
          <h2>Selected Item</h2>
          <p>ID: {selectedItem.id}</p>
          <p>Name: {selectedItem.name}</p>
        </div>
      )}
    </div>
  );
}

export default ItemList;
