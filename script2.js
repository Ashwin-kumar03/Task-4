    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const noteForm = document.getElementById('noteForm');
    const noteTitle = document.getElementById('notetitle');
    const noteContent = document.getElementById('noteContent');
    const notList = document.getElementById('notelist');

    noteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = noteTitle.value.trim();
      const content = noteContent.value.trim();

      if (!title || !content) {
        alert('Please fill in both fields');
        return;
      }

      const note = {
        id: Date.now(),
        title,
        content
      };

      notes.push(note);
      updateUI();
      saveNotes();
      noteForm.reset();
    });

    function updateUI() {
      notList.innerHTML = '';
      notes.forEach((note) => {
        const noteItem = document.createElement('li');
        noteItem.classList.add('note-item');

        noteItem.innerHTML = `
          <div class="notes-action">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
          </div>
          <div>
            <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
          </div>
        `;

        notList.appendChild(noteItem);
      });
    }

    function editNote(id) {
      const note = notes.find((n) => n.id === id);
      if (note) {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        deleteNote(id);
      }
    }

    function deleteNote(id) {
      notes = notes.filter((note) => note.id !== id);
      updateUI();
      saveNotes();
    }

    function saveNotes() {
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    updateUI();