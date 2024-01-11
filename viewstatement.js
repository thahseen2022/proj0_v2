document.addEventListener('DOMContentLoaded', function() {
    // Fetch the list of User IDs when the page loads
    fetchUserIds();

    // Add event listener for the viewstatementform submission
    document.getElementById('viewstatementbtn').addEventListener('click', function(event) {
        event.preventDefault();
        //viewStatement();
    });
});

// Function to fetch the list of User IDs
function fetchUserIds() {
    fetch('data.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Call a function to update the dropdown with the fetched data
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

// Function to make a POST request to fetch and display the statement for the selected User ID
function viewStatement() {
    var userId = document.getElementById('userId').value;
    console.log("Selected User ID: " + userId); // Add this line for debugging

    // Make a POST request to fetch the statement
    fetch('viewstatement.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=viewstatement&userId=${encodeURIComponent(userId)}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Call a function to update the HTML content with the fetched data
            updateTable(data.data);
        } else {
            alert('Error fetching statement: ' + data.message);
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
        newRow.innerHTML = `<td>${row.s_User_ID}</td>
                            <td>${row.s_Username}</td>
                            <td>${row.s_Total_Amount}</td>
                            <td>${row.s_Remaining_Amount}</td>
                            <td>${row.s_date}</td>
                            <td>${row.s_time}</td>
                            <td>${row.s_action}</td>`;
        tableBody.appendChild(newRow);
    });
}



