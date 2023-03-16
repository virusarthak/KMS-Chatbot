class Chatbox {
    constructor() {
      this.args = {
        openButton: document.querySelector('.chatbox__button'),
        chatBox: document.querySelector('.chatbox__support'),
        sendButton: document.getElementById('Submit_Button'),
      };
  
      this.state = false;
      this.messages = [];
  
      // Add this line to toggle the chatbox state when the page loads
      this.toggleState(this.args.chatBox);
    }
  
    display() {
      const { openButton, chatBox, sendButton } = this.args;
  
      openButton.addEventListener('click', () => this.toggleState(chatBox));
  
      sendButton.addEventListener('click', () => this.onSendButton(chatBox));
  
      const node = chatBox.querySelector('input');
      node.addEventListener('keyup', ({ key }) => {
        if (key === 'Enter') {
          this.onSendButton(chatBox);
        }
      });
    }
  
    toggleState(chatbox) {
      this.state = !this.state;
  
      // show or hides the box
      if (this.state) {
        chatbox.classList.add('chatbox--active');
      } else {
        chatbox.classList.remove('chatbox--active');
      }
    }
  
    onSendButton(chatbox) {
      console.log('Inside');
      var textField = chatbox.querySelector('input');
      let text1 = textField.value;
      console.log(text1);
      if (text1 === '') {
        return;
      }
      //print(text1)
    
      // fetch the date and time from the API
      fetch('https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata')
        .then((response) => response.json())
        .then((data) => {
          // extract the date and time information
          const date = new Date(data.date_time);
          const time = date.toLocaleTimeString();
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
          // create a new element to display the date and time
          const dateTimeElement = document.createElement('p');
          dateTimeElement.textContent = `Current time in Kolkata: ${formattedDate} ${time}`;
          chatbox.querySelector('.chatbox__messages').appendChild(dateTimeElement);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    
      // send the user's message to the server
      let msg1 = { name: 'User', message: text1 };
      this.messages.push(msg1);
      fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: JSON.stringify({ message: text1 }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((r) => {
          let msg2 = { name: 'Sam', message: r.answer };
          this.messages.push(msg2);
          this.updateChatText(chatbox);
          textField.value = '';
        })
        .catch((error) => {
          console.error('Error:', error);
          this.updateChatText(chatbox);
          textField.value = '';
        });
    
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          // ...
        }
      });
    }
  
    updateChatText(chatbox) {
      var html = '';
      this.messages
        .slice()
        .reverse()
        .forEach(function (item, index) {
          if (item.name === 'Sam') {
            html +=
              '<div class="messages__item messages__item--visitor">' +
              item.message +
              '</div>';
          } else {
            html +=
              '<div class="messages__item messages__item--operator">' +
              item.message +
              '</div>';
          }
        });
  
      const chatmessage = chatbox.querySelector('.chatbox__messages');
      chatmessage.innerHTML = html;
    }
  }
  
  const chatbox = new Chatbox();
  chatbox.display();
