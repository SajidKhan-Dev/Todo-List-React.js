import { useState } from 'react';
import './App.css';

function App() {
  const [inputList, setInputList] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const itemEvent = (event) => {
    setInputList(event.target.value);
  };

  const deleteItem = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
    setEditIndex(-1); // Reset editIndex after deleting an item
  };

  const editItem = (index) => {
    setEditIndex(index);
    setInputList(items[index]); // Set inputList to the current item being edited
  };

  const updateItem = () => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[editIndex] = inputList;
      return updatedItems;
    });
    setInputList('');
    setEditIndex(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputList === "") return;

    listOfItems();
    setInputList("");
  };

  const listOfItems = () => {
    if (editIndex !== -1) {
      updateItem();
    } else {
      setItems((prevItems) => [...prevItems, inputList]);
    }
  };

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />
          <h1>ToDo List</h1>
          <br />

          <div className="input_container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Add an item"
                onChange={itemEvent}
                value={inputList}
              />
              <button style={{  hover: 'white', background: 'black', color : 'white', width: '15%', height: '60px', marginLeft: '10px' }} type="submit">
                {editIndex !== -1 ? 'Update':'+'}
              </button>
            </form>
          </div>

          <ol>
            {items.map((itemval, index) => (
              <div key={index} className="list_item_container">
                {editIndex === index ? (
                  <>
                    
                   
                    <button
                      className="edit_button"
                      onClick={() => updateItem()}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <li>{itemval}</li>
                    <button
                      className="edit_button"
                      onClick={() => editItem(index)}
                    >
                      Edit
                    </button>
                  </>
                )}
                <button
                  onClick={() => deleteItem(index)}
                  className=""
                >
                  Delete
                </button>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
