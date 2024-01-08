// Function to fetch and update data
function fetchData() {
    fetch('data.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Call a function to update the HTML content with the fetched data
                updateTable(data.data);
            } else {
                console.error('Error fetching data:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}


function addUser() {
// Function to add a new user

    // Get form input values
    var newUsername = document.getElementById('newUsername').value;
    var newAmountRemaining = document.getElementById('newAmountRemaining').value;
    var newTotalAmount = document.getElementById('newTotalAmount').value;

    // Make a POST request to add a new user
    fetch('data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=addUser&newUsername=${encodeURIComponent(newUsername)}&newAmountRemaining=${encodeURIComponent(newAmountRemaining)}&newTotalAmount=${encodeURIComponent(newTotalAmount)}`,
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            // Data added successfully, fetch and update the table
            fetchData();
            // Clear the form fields
            document.getElementById('newUsername').value = '';
            document.getElementById('newAmountRemaining').value = '';
            document.getElementById('newTotalAmount').value = '';
            // Close the modal
            closeModal('addUserModal');
        } else {
            console.error('Error adding user:', result.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to delete a user
// Function to delete a user
function deleteUser() {
    // Get form input values
    var deleteUserId = document.getElementById('deleteUserId').value;

    // Make a POST request to delete the user
    fetch('data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=deleteUser&userId=${encodeURIComponent(deleteUserId)}`,
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            document.getElementById('deleteUserId').value = '';

            // Data deleted successfully, fetch and update the table
            fetchData();
            // Close the modal
            closeModal('deleteUserModal');
        } else {
            console.error('Error deleting user:', result.message);
        }
    })
    .catch(error => console.error('Error:', error));
}



// Function to update the HTML content with the fetched data
function updateTable(data) {
    // Get the table body element
    var tableBody = document.getElementById('tableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Iterate over the data and append rows to the table
    data.forEach(row => {
        var newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${row.User_ID}</td>
                            <td>${row.Username}</td>
                            <td>${row.Total_Amount}</td>
                            <td>${row.Remaining_Amount}</td>
                            <td><button onclick="openDeleteUserModal(${row.User_ID})">Delete</button></td>`;
        tableBody.appendChild(newRow);
    });
}

// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchData();

});

// Event listener for the "Add User" button
document.getElementById('addUserBtn').addEventListener('click', function(event) {
    event.preventDefault();
    openModal('addUserModal');
});

// Event listener for the "Delete" button in delete user modal
document.getElementById('deleteUserConfirmBtn').addEventListener('click', function(event) {
    
    event.preventDefault();
    deleteUser(userIdToDelete);
    openModal('deleteUserModal');
});


// Function to open the delete user modal
function openDeleteUserModal(userId) {
    // Set the user ID in the hidden input field
    document.getElementById('deleteUserId').value = userId;
    // Open the modal
    openModal('deleteUserModal');
}


// Function to open the modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}





/*
// Event listener for the "Cancel" button in delete user modal
document.getElementById('deleteUserCancelBtn').addEventListener('click', function(event) {
    event.preventDefault();
    // Close the modal
    closeModal('deleteUserModal');
});
*/