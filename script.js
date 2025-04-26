const form = document.getElementById('nominationForm');
const nomineeInput = document.getElementById('nominee');
const deedInput = document.getElementById('deed');
const submissionList = document.getElementById('submissionList');
const popupList = document.getElementById('popupList');
const viewSubmissionsBtn = document.getElementById('viewSubmissions');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const submissionsSection = document.getElementById('submissions');

// Load previous submissions from localStorage on page load
document.addEventListener('DOMContentLoaded', loadSubmissions);

function loadSubmissions() {
  const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
  submissions.forEach(submission => {
    const listItem = document.createElement('li');
    listItem.textContent = `${submission.nominee} - "${submission.deed}"`;
    submissionList.appendChild(listItem);
    popupList.appendChild(listItem.cloneNode(true));
  });

  // Show submissions section if there are any submissions
  if (submissions.length > 0) {
    submissionsSection.style.display = 'block';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nominee = nomineeInput.value.trim();
  const deed = deedInput.value.trim();

  if (nominee && deed) {
    // Create submission object
    const submission = { nominee, deed };

    // Store the new submission in localStorage
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    submissions.push(submission);
    localStorage.setItem('submissions', JSON.stringify(submissions));

    // Add submission to the list on the page
    const listItem = document.createElement('li');
    listItem.textContent = `${nominee} - "${deed}"`;
    submissionList.appendChild(listItem);
    popupList.appendChild(listItem.cloneNode(true));

    // Reset the form fields
    nomineeInput.value = '';
    deedInput.value = '';

    // Show submissions section if it's the first submission
    submissionsSection.style.display = 'block';
  }
});

viewSubmissionsBtn.addEventListener('click', () => {
  popup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Close popup if clicked outside
window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});