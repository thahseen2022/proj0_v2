document.addEventListener("DOMContentLoaded", function() {
    const adminCredentials = {
        username: "admin",
        password: "abc"
    };

    const customerCredentials = {
        username: "customer",
        password: "0000"
    };

    const adminForm = document.getElementById("adminForm");
    const customerForm = document.getElementById("customerForm");

    adminForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("adminUsername").value;
        const password = document.getElementById("adminPassword").value;
        if (username === adminCredentials.username && password === adminCredentials.password) {
            alert("Admin login successful");
            window.location.href = "dashboard.html";
        } else {
            alert("Admin login failed");
        }
    });

    customerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("customerUsername").value;
        const password = document.getElementById("customerPassword").value;
        if (username === customerCredentials.username && password === customerCredentials.password) {
            alert("Customer login successful");
            window.location.href = "user_login.html";
        } else {
            alert("Customer login failed");

        }
    });
});