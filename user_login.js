// user_login.js

document.addEventListener('DOMContentLoaded', function() {
    // Fetch the list of User IDs when the page loads
    fetchUserIds();

    // Add event listener for the userLoginForm submission
    document.getElementById('userLoginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the selected User ID and entered amount
        var userId = document.getElementById('userId').value;
        var amount = document.getElementById('amount').value;

        // Validate input (you may need additional validation)
        if (!userId || !amount) {
            alert('Please select a User ID and enter the amount.');
            return;
        }

       
    });
});

document.getElementById('SubtractBtn').addEventListener('click', function(event) {
    event.preventDefault();
    //subtractAmount();
    
});

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
    console.log("Enter function");
    var userId = document.getElementById('userId').value;
    var amount = document.getElementById('amount').value;
    console.log(userId);
    console.log(amount);
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
            console.log("Enter Amount Subtraction");
            alert('Error subtracting amount: Amount Exceeds Available Remaining Amount', result.message);
        }
    })
    .catch(error => console.error('Error:', error));
}