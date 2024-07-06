import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (task: Task) => void;
  submitButtonText: string;
  creatorEmail:string;
}

interface Task {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  collaborators: string[];
  viewers: string[];
  creatorEmail:string
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, submitButtonText,creatorEmail }) => {
  const [name, setName] = useState(initialTask?.name || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate.split('T')[0] || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'Low');
  const [status, setStatus] = useState(initialTask?.status || 'Not Started');
  const [collaborators, setCollaborators] = useState(initialTask?.collaborators.join(', ') || '');
  const [viewers, setViewers] = useState(initialTask?.viewers.join(', ') || '');

  useEffect(() => {
    if (initialTask) {
      setName(initialTask.name);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate.split('T')[0]);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setCollaborators(initialTask.collaborators.join(', '));
      setViewers(initialTask.viewers.join(', '));
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      name,
      description,
      dueDate,
      priority,
      status,
      collaborators: collaborators.split(',').map(email => email.trim()),
      viewers: viewers.split(',').map(email => email.trim()),
      creatorEmail
    };
    onSubmit(task);
  };

  return (
    <FormContainer>
      <FormTitle>{submitButtonText} Task</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Label>Due Date</Label>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <Label>Priority</Label>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
        <Label>Status</Label>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Select>
        <Label>Collaborators</Label>
        <Input
          type="text"
          value={collaborators}
          onChange={(e) => setCollaborators(e.target.value)}
          placeholder="Enter emails separated by commas"
        />
        <Label>Viewers</Label>
        <Input
          type="text"
          value={viewers}
          onChange={(e) => setViewers(e.target.value)}
          placeholder="Enter emails separated by commas"
        />
        <Button type="submit">{submitButtonText}</Button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default TaskForm;
