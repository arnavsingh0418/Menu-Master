function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function createNewChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = ''; // Clear all previous messages
}

async function sendMessage() {
    const userInput = document.getElementById('question-input').value;
    if (userInput) {
        // Display the user's message
        const chatContainer = document.getElementById('chat-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';

        const profilePic = document.createElement('img');
        profilePic.src = 'https://cdn-icons-png.flaticon.com/512/5787/5787016.png';
        profilePic.alt = 'Profile Picture';
        profilePic.className = 'profile-pic';

        const text = document.createElement('span');
        text.textContent = userInput;
        text.className = 'message-text';

        messageDiv.appendChild(profilePic);
        messageDiv.appendChild(text);
        chatContainer.appendChild(messageDiv);

        // Send the user's message to the server
        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userInput })
            });

            const data = await response.json();

            // Display the response from the server
            const responseDiv = document.createElement('div');
            responseDiv.className = 'message';

            const responseProfilePic = document.createElement('img');
            responseProfilePic.src = 'https://cdn-icons-png.flaticon.com/512/5787/5787016.png';
            responseProfilePic.alt = 'Profile Picture';
            responseProfilePic.className = 'profile-pic';

            const responseText = document.createElement('span');
            responseText.textContent = data.answer;
            responseText.className = 'message-text';

            responseDiv.appendChild(responseProfilePic);
            responseDiv.appendChild(responseText);
            chatContainer.appendChild(responseDiv);
        } catch (error) {
            console.error('Error:', error);
        }

        // Clear the input
        document.getElementById('question-input').value = '';
    }
}

document.getElementById('question-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
