// Open popup
function openForm() {
  document.getElementById("formPopup").style.display = "block";
}

// Close popup
function closeForm() {
  document.getElementById("formPopup").style.display = "none";
}

// Submit nomination
function submitNomination() {
  const yourName = document.getElementById('yourName').value.trim();
  const friendName = document.getElementById('friendName').value.trim();

  if (yourName !== "" && friendName !== "") {
    saveNomination(yourName, friendName);
    document.getElementById('yourName').value = "";
    document.getElementById('friendName').value = "";
    closeForm();
  } else {
    alert("Please fill in both fields!");
  }
}

// Save to Firebase
function saveNomination(yourName, friendName) {
  const nominationsRef = firebase.database().ref('nominations');
  nominationsRef.push({
    yourName: yourName,
    friendName: friendName
  });
}

// Load nominations
function loadNominations() {
  const nominationsRef = firebase.database().ref('nominations');
  nominationsRef.on('value', (snapshot) => {
    const nominationsList = document.getElementById('nominationsList');
    nominationsList.innerHTML = '';

    snapshot.forEach((childSnapshot) => {
      const nomination = childSnapshot.val();
      const li = document.createElement('li');
      li.textContent = `${nomination.yourName} nominated ${nomination.friendName}`;
      nominationsList.appendChild(li);
    });
  });
}

// Load nominations on page load
window.onload = loadNominations;
