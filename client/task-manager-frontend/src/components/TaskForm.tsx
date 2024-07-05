import React, { useState } from 'react';

const CreateTask: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [viewers, setViewers] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, dueDate, priority, status, collaborators, viewers }),
    });

    if (response.ok) {
      // Handle successful task creation (e.g., reset form, show success message)
    } else {
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        required
      />
      <input
        type="text"
        value={priority}
        onChange={e => setPriority(e.target.value)}
        placeholder="Priority"
        required
      />
      <input
        type="text"
        value={status}
        onChange={e => setStatus(e.target.value)}
        placeholder="Status"
        required
      />
      <input
        type="text"
        value={collaborators.join(',')}
        onChange={e => setCollaborators(e.target.value.split(','))}
        placeholder="Collaborators (comma-separated emails)"
        required
      />
      <input
        type="text"
        value={viewers.join(',')}
        onChange={e => setViewers(e.target.value.split(','))}
        placeholder="Viewers (comma-separated emails)"
        required
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
