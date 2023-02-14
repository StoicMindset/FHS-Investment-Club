import { useEffect, useState } from 'preact/hooks';

const Admin = () => {
  const [members, setMembers] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    // check to see if the user is logged in
    getMembers();
  }, []);

  async function getMembers() {
    const response = await fetch('/api/members');
    const data = await response.json();
    setMembers(data);
  }

  function updateMember(id, field, value) {
    const updatedMembers = members;
    const memberToUpdate = members.find((member) => member.id === id);
    const memberToUpdateIndex = members.indexOf(memberToUpdate);

    memberToUpdate[field] = value;
    updatedMembers[memberToUpdateIndex] = memberToUpdate;

    memberToUpdate.dirty = true;

    setMembers(updatedMembers);
    console.log(updatedMembers);
  }

  async function handleFirstNameChange(e) {
    updateMember(e.target.id, 'firstName', e.target.value);
  }

  async function handleLastNameChange(e) {
    updateMember(e.target.id, 'lastName', e.target.value);
  }

  async function handlePickChange(e) {
    updateMember(e.target.id, 'pick', e.target.value);
    updateMember(e.target.id, 'lastUpdated', 0);
  }

  async function handleUpdate(e) {
    members.forEach(async (member) => {
      if (member.dirty) {
        delete member.dirty;
        const response = await fetch('/api/members', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(member),
        });
        const data = await response.json();
      }
    });

    setIsEditable(false);
  }

  async function handleEdit(e) {
    setIsEditable(true);
  }

  async function handleCancel(e) {
    setIsEditable(false);
  }

  return (
    // create a table with all of the members from the members object
    <div className="container">
      <div className="table-container">
        <div className="mt-4 mb-4">
          <button
            className={isEditable ? 'is-hidden' : 'button is-primary'}
            onClick={handleEdit}
          >
            Edit
          </button>
          <div className={isEditable ? 'buttons' : 'is-hidden'}>
            <button className="button is-primary" onClick={handleUpdate}>
              Update
            </button>
            <button className="button is-danger" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Pick</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) =>
              isEditable ? getEditableRow(member) : getStaticRow(member)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  function getStaticRow(member) {
    return (
      <tr>
        <td>{member.firstName}</td>
        <td>{member.lastName}</td>
        <td>{member.pick}</td>
      </tr>
    );
  }

  function getEditableRow(member) {
    return (
      <tr>
        <td>
          <input
            id={member.id}
            type="text"
            className="input"
            value={member.firstName}
            onChange={handleFirstNameChange}
          ></input>
        </td>
        <td>
          <input
            id={member.id}
            type="text"
            className="input"
            value={member.lastName}
            onChange={handleLastNameChange}
          ></input>
        </td>
        <td>
          <input
            id={member.id}
            type="text"
            className="input"
            value={member.pick}
            onChange={handlePickChange}
          ></input>
        </td>
      </tr>
    );
  }
};

export default Admin;
