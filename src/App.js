import React from "react";
import "./App.css";
import contactJson from "./contacts.json";

function App() {
  const [contacts, setContacts] = React.useState(contactJson.slice(0, 5));
  const [ascending, setAscending] = React.useState(true);
  const [all, setAll] = React.useState(contactJson.slice(5));

  const addContact = () => {
    if (all.length > 0) {
      let num = Math.floor(Math.random() * all.length);
      setContacts(contacts.concat(all[num]));
      let contactCopy = [...all];
      contactCopy.splice(num, 1);
      setAll(contactCopy);
    }
  };

  const sortName = () => {
    let cloneArr = [...contacts];
    if (ascending) {
      cloneArr.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else {
      cloneArr.sort(function (a, b) {
        return b.name.localeCompare(a.name);
      });
    }

    setAscending(!ascending);
    setContacts(cloneArr);
  };

  const sortPopularity = () => {
    let cloneArr = [...contacts];
    if (ascending) {
      cloneArr.sort(function (a, b) {
        return a.popularity - b.popularity;
      });
    } else {
      cloneArr.sort(function (a, b) {
        return b.popularity - a.popularity;
      });
    }

    setAscending(!ascending);
    setContacts(cloneArr);
  };

  const deleteContact = (celebrityToRemove) => {
    let filteredArr = contacts.filter(function (singleContact) {
      return singleContact !== celebrityToRemove;
    });
    setContacts(filteredArr);
  };

  return (
    <div>
      <h1>Iron Contacts</h1>
      <h2>Currently Viewing {contacts.length}</h2>
      <button onClick={addContact}>Add random contact</button>
      <button onClick={sortName}>
        Sort by Name({ascending ? "ascending" : "descending"})
      </button>
      <button onClick={sortPopularity}>
        Sort by Popularity({ascending ? "ascending" : "descending"})
      </button>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>

        {contacts.map(function (contact) {
          return (
            <tr>
              <img width="100" src={contact.pictureUrl} />
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed()}</td>
              <td>{contact.wonOscar ? "🏆" : " "}</td>
              <td>{contact.wonEmmy ? "🏆" : ""}</td>
              <td>
                <button onClick={() => deleteContact(contact)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;

// 🏆
