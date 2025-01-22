// localStorage function
document.addEventListener('DOMContentLoaded', function () {
  loadCarDetailFromLocalStorage(); 
});

// Event listener for form submission
document.getElementById('CarForm').addEventListener('submit', function (e) {
  e.preventDefault();

// Get form values
  const customerName = document.getElementById('customerName').value;
  const email = document.getElementById('email').value;
  const carType = document.getElementById('carType').value;
  const pickupDate = document.getElementById('pickupDate').value;
  const DateDrop_off = document.getElementById('DateDrop_off').value;
  const pickupLocation = document.getElementById('pickupLocation').value;
  const Drop_off_Location = document.getElementById('Drop_off_Location').value;
 

 

 // Add a new row to the table
  addRow(customerName, email, carType, pickupDate, DateDrop_off, pickupLocation, Drop_off_Location);
  
  // Save car Data to localStorage
  saveCarDataToLocalStorage(); 

  // Reset form fields
  document.getElementById('CarForm').reset();

});

// Function to add a new row
function addRow(customerName, email, carType, pickupDate, DateDrop_off, pickupLocation, Drop_off_Location) {

  if (!customerName || !email || !carType || !pickupDate || !DateDrop_off || !pickupLocation || !Drop_off_Location) {
    return;
  }


  const tableBody = document.getElementById('detailList');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${customerName}</td>
    <td>${email}</td>
    <td>${carType}</td>
    <td>${pickupDate}</td>
    <td>${DateDrop_off}</td>
    <td>${pickupLocation}</td>
    <td>${Drop_off_Location}</td>
 

    <td>
      <button class="btn-edit me-2">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn-trash">
        <i class="bi bi-trash"></i>
      </button>
    </td>
  `;

  tableBody.appendChild(row);
}



// Edit and delete buttons
document.getElementById('detailList').addEventListener('click', function (e) {
  const button = e.target.closest('button');

  if (!button) return;

  const row = button.closest('tr');

  if (button.classList.contains('btn-edit')) {
    editRow(row);
  } else if (button.classList.contains('btn-trash')) {
    const confirmation = confirm('Are you sure you want to delete this data?');
    if (confirmation) {
      deleteRow(row);
      saveCarDataToLocalStorage(); // Save updated list to localStorage
    }
  }
});

// Edit row function
function editRow(row) {
  const cells = row.querySelectorAll('td');

  // Populate the form fields with the current row data
  document.getElementById('customerName').value = cells[0].textContent.trim();
  document.getElementById('email').value = cells[1].textContent.trim();
  document.getElementById('carType').value = cells[2].textContent.trim();
  document.getElementById('pickupDate').value = cells[3].textContent.trim();
  document.getElementById('DateDrop_off').value = cells[4].textContent.trim();
  document.getElementById('pickupLocation').value = cells[4].textContent.trim();
  document.getElementById('Drop_off_Location').value = cells[4].textContent.trim();
  
  // Remove the row after populating the form
  row.remove();

  // Save updated list to localStorage
  saveCarDataToLocalStorage();
}


/* Load names from localStorage 
document.addEventListener('DOMContentLoaded', loadCarDetailFromLocalStorage);
*/

// Delete row function
function deleteRow(row) {
  row.remove();
}



// Save car Data to localStorage
function   saveCarDataToLocalStorage() {
  const rows = Array.from(document.querySelectorAll('#detailList tr'));
  const carData = rows.map(row => {
    const cells = row.querySelectorAll('td');
    return {
      customerName: cells[0].textContent.trim(),
      email: cells[1].textContent.trim(),
      carType: cells[2].textContent.trim(),
      pickupDate: cells[3].textContent.trim(),
      DateDrop_off: cells[4].textContent.trim(),
      pickupLocation: cells[4].textContent.trim(),
      Drop_off_Location: cells[4].textContent.trim(),

    };
  });
  localStorage.setItem('detailList', JSON.stringify(carData));
}

// Load scores from localStorage
function loadCarDetailFromLocalStorage() {
  const storedData = localStorage.getItem('detailList');
  if (storedData) {
    const CarStoreData = JSON.parse(storedData);
    CarStoreData.forEach(CarStoreData => addRow(CarStoreData.customerName, CarStoreData.email, CarStoreData.carType, CarStoreData.pickupDate, CarStoreData.DateDrop_off, CarStoreData.Drop_off_Location));
  }
}



  