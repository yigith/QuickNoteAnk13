'use client';
import styles from './page.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Home() {
  const apiUrl = "https://localhost:7284/api/Notes";
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const itemClicked = (e, note) => {
    setSelectedNote(note);
  };

  const addNewNote = (e) => {
    const newNote = {
      title: "New Note",
      content: ""
    };

    axios.post(apiUrl, newNote).then(function (response) {
      setNotes([...notes, response.data]);
      setSelectedNote(response.data);
    });
  };

  return (
    <main className={styles.main}>
      <NavigationBar />
      <Container>
        <Row>
          <Col sm={5} md={4} lg={3}>
            <div className="d-flex justify-content-end">
              <Button className="mt-3" onClick={addNewNote}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
            <ListGroup className="mt-2">
              {
                notes.map(note => (
                  <ListGroup.Item key={note.id} action active={note == selectedNote}
                    onClick={(e) => itemClicked(e, note)}>
                    {note.title}
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </Col>
          <Col sm={7} md={8} lg={9}>
            <div className="mt-3">
              <Form.Control placeholder='Title' value={selectedNote?.title} />
            </div>
            <div className="mt-2">
              <Form.Control as="textarea" placeholder='Your note..' rows={10} value={selectedNote?.content} />
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </main>
  );
}
