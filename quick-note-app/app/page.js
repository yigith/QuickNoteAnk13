'use client';
import styles from './page.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { Button, Col, Container, Form, ListGroup, Row, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Home() {
  const apiUrl = "https://localhost:7284/api/Notes";
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const itemClicked = (e, note) => {
    setSelectedNote(note);
    handleClose();
  };

  const addNewNote = (e) => {
    const newNote = {
      title: "New Note",
      content: ""
    };

    axios.post(apiUrl, newNote).then(function (response) {
      setNotes([...notes, response.data]);
      setSelectedNote(response.data);
      toast("New note created.")
      handleClose();
    });
  };

  const deleteNote = (e) => {
    axios.delete(apiUrl + "/" + selectedNote.id).then(function (response) {
      setNotes(notes.filter(n => n.id != selectedNote.id));
      setSelectedNote(null);
      toast("Note deleted.");
    });
  };

  const saveNote = (e) => {
    axios.put(apiUrl + "/" + selectedNote.id, selectedNote).then(function (response) {
      const newNotes = [...notes];
      let i = newNotes.findIndex(n => n.id == selectedNote.id);
      newNotes[i] = selectedNote;
      setNotes(newNotes);
      toast("Note saved.");
    });
  };

  const leftCol = (
    <>
      <div className="d-flex justify-content-end">
        <Button className="mt-3" onClick={addNewNote}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <ListGroup className="mt-2">
        {
          notes.map(note => (
            <ListGroup.Item key={note.id} action active={note.id == selectedNote?.id}
              onClick={(e) => itemClicked(e, note)}>
              {note.title}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </>
  );

  return (
    <main className={styles.main}>
      <NavigationBar onBarsClick={handleShow} />
      <Container className='flex-fill'>
        <Row className='h-100'>
          <Col className='d-none d-sm-block' sm={5} md={4} lg={3}>
            {leftCol}
          </Col>
          {selectedNote &&
            <Col sm={7} md={8} lg={9} className='d-flex flex-column'>
              <div className="mt-3">
                <Form.Control placeholder='Title' value={selectedNote?.title}
                  onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })} />
              </div>
              <div className="mt-2 flex-fill">
                <Form.Control as="textarea" placeholder='Your note..' rows={10} value={selectedNote?.content}
                  onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })} className='h-100' />
              </div>
              <div className='mt-2 mb-3'>
                <Button variant="primary" onClick={saveNote}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </Button>
                <Button variant="danger" onClick={deleteNote} className='ms-2'>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </div>
            </Col>
          }
        </Row>
      </Container>

      <ToastContainer autoClose={1000} position='bottom-right' />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Quick Note</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {leftCol}
        </Offcanvas.Body>
      </Offcanvas>
    </main>
  );
}
