const form = document.getElementById('nominationForm');
const nomineeInput = document.getElementById('nominee');
const deedInput = document.getElementById('deed');
const submissionList = document.getElementById('submissionList');
const popupList = document.getElementById('popupList');
const viewSubmissionsBtn = document.getElementById('viewSubmissions');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const submissionsSection = document.getElementById('submissions');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nominee = nomineeInput.value.trim();
  const deed = deedInput.value.trim();
  
  if (nominee && deed) {
    const listItem = document.createElement('li');
    listItem.textContent = `${nominee} - "${deed}"`;
    
    submissionList.appendChild(listItem);
    popupList.appendChild(listItem.cloneNode(true));
    
    nomineeInput.value = '';
    deedInput.value = '';
    
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