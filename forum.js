document.addEventListener('DOMContentLoaded', () => {

  const topicForm = document.getElementById('newTopicForm');
  const topicInput = document.getElementById('topicTitle');
  const topicsList = document.getElementById('topicsList');

  const messageForm = document.getElementById('newMessageForm');
  const usernameInput = document.getElementById('username');
  const contentInput = document.getElementById('messageContent');

  let currentTopic = null; 

  // -------------------- Створення теми --------------------
  function createTopic(title) {
    const topicDiv = document.createElement('div');
    topicDiv.classList.add('topic');

    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.alignItems = 'center';

    const header = document.createElement('h3');
    header.textContent = title;
    header.style.cursor = 'pointer';

    const deleteTopicBtn = document.createElement('button');
    deleteTopicBtn.textContent = '❌';
    deleteTopicBtn.style.cursor = 'pointer';
    deleteTopicBtn.style.background = 'transparent';
    deleteTopicBtn.style.border = 'none';
    deleteTopicBtn.style.fontSize = '16px';
    deleteTopicBtn.style.color = 'red';

    // Видалення теми
    deleteTopicBtn.addEventListener('click', () => {
      if (confirm(`Видалити тему "${title}"?`)) {
        if (currentTopic === messagesList) currentTopic = null;
        topicDiv.remove();
      }
    });

    headerDiv.appendChild(header);
    headerDiv.appendChild(deleteTopicBtn);
    topicDiv.appendChild(headerDiv);

    const messagesList = document.createElement('div');
    messagesList.classList.add('messagesList');
    topicDiv.appendChild(messagesList);

    header.addEventListener('click', () => {
      currentTopic = messagesList;
      document.querySelectorAll('.topic h3').forEach(h => h.style.color = 'black');
      header.style.color = 'blue';
    });

    topicsList.appendChild(topicDiv);
  }

  // -------------------- Створення повідомлення --------------------
  function createMessage(username, content, parent = null) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    msgDiv.innerHTML = `
      <div class="text"><strong>${username}</strong>: <span class="content">${content}</span></div>
      <div class="actions">
        <button class="replyBtn">↩</button>
        <button class="editBtn">✏️</button>
        <button class="deleteBtn">🗑️</button>
      </div>
    `;

    // Контейнер для відповідей
    const repliesContainer = document.createElement('div');
    repliesContainer.classList.add('repliesContainer');
    repliesContainer.style.marginLeft = '20px';
    msgDiv.appendChild(repliesContainer);

    // Видалення повідомлення
    msgDiv.querySelector('.deleteBtn').addEventListener('click', () => msgDiv.remove());

    // Редагування повідомлення
    msgDiv.querySelector('.editBtn').addEventListener('click', () => {
      const newContent = msgDiv.querySelector('.content').textContent;
      const edited = prompt('Редагувати повідомлення:', newContent);
      if (edited !== null) msgDiv.querySelector('.content').textContent = edited;
    });

    // Відповідь на повідомлення
    msgDiv.querySelector('.replyBtn').addEventListener('click', () => {
      const replyUsername = prompt('Ваше ім\'я:');
      const replyContent = prompt('Ваша відповідь:');
      if (replyUsername && replyContent) {
        const replyMsg = createMessage(replyUsername, replyContent, msgDiv);
        repliesContainer.appendChild(replyMsg); 
      }
    });

    return msgDiv;
  }

  // -------------------- Обробка форми створення тем --------------------
  topicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = topicInput.value.trim();
    if (!title) return;
    createTopic(title);
    topicInput.value = '';
  });

  // -------------------- Обробка форми створення повідомлень --------------------
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentTopic) {
      alert('Оберіть тему для повідомлення!');
      return;
    }

    const username = usernameInput.value.trim();
    const content = contentInput.value.trim();
    if (!username || !content) return;

    const message = createMessage(username, content);
    currentTopic.appendChild(message);

    usernameInput.value = '';
    contentInput.value = '';
  });

});
