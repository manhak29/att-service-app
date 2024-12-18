const API_URL = 'http://localhost:5000/api'; // Replace with your backend API URL

// Handle login submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('authToken', data.token);
        window.location.href = 'dashboard.html'; // Redirect to the dashboard page
    } else {
        alert('Invalid credentials!');
    }
});

// Handle logout functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    // Clear the stored authentication token
    localStorage.removeItem('authToken');

    // Redirect to the login page
    window.location.href = 'login.html'; // Redirect to the login page
});

// Fetch customer data dynamically (for testing)
async function fetchCustomers() {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/customers`, {
        headers: { 'auth-token': token },
    });
    const customers = await res.json();

    const customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    customers.forEach(customer => {
        customerList.innerHTML += `
            <div class="card p-3">
                <h5>${customer.name}</h5>
                <p>Phone: ${customer.phone} | Email: ${customer.email}</p>
                <p>ID: ${customer.customerId}</p>
            </div>
        `;
    });
}

// Create a ticket
document.getElementById('ticketForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerId = document.getElementById('customerId').value;
    const issue = document.getElementById('issue').value;

    const res = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ customerId, issue }),
    });

    const data = await res.json();
    if (data.success) {
        alert('Ticket successfully created!');
        document.getElementById('ticketForm').reset();
    } else {
        alert('Error creating ticket!');
    }
});
