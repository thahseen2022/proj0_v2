// user_login.js
document.addEventListener('DOMContentLoaded', function () {
    // Fetch the list of User IDs when the page loads
    fetchUserIds();

    // Add event listener for the userLoginForm submission
    document.getElementById('SubtractBtn').addEventListener('click', function (event) {
        event.preventDefault();

        // Get the selected User ID and entered amount
        var userId = document.getElementById('userId').value;
        var amount = document.getElementById('amount').value;

        // Validate input (you may need additional validation)
        if (!userId || !amount) {
            alert('Please select a User ID and enter the amount.');
            return;
        }

        subtractAmount();
    });
});

// Rest of your JavaScript code remains the same...



// Function to fetch the list of User IDs
function fetchUserIds() {
    fetch('data.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
               
                populateUserIds(data.data);
            } else {
                console.error('Error fetching User IDs:', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to populate the User ID select dropdown
function populateUserIds(data) {
    var userIdSelect = document.getElementById('userId');

    // Clear existing options
    userIdSelect.innerHTML = '';

    data.forEach(row => {
        var option = document.createElement('option');
        option.value = row.User_ID;
        option.text = row.User_ID;
        userIdSelect.appendChild(option);
    });
}

// Function to make a POST request to subtract the amount
function subtractAmount() {
    
    var userId = document.getElementById('userId').value;
    var amount = document.getElementById('amount').value;

    // Make a POST request to subtract the amount
    fetch('data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=subtractAmount&userId=${encodeURIComponent(userId)}&amount=${encodeURIComponent(amount)}`,
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
            alert('Amount subtracted successfully.');
        } else {
            alert('Error subtracting amount: Please check as amount to be returned is greater than the remaining amount', result.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
