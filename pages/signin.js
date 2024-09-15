document.getElementById('signupForm')
.addEventListener('submit', async function (e) {
    e.preventDefault();
    const useremail = document.getElementById('signup-useremail').value;
    const password = document.getElementById('signup-password').value;

    // Create a new user
    const user = {
        useremail: useremail,
        password: password,
        // You can add more user fields as required by the API (e.g., name, email, address)
    };

    try {
        const response = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        alert('User created successfully. Now you can log in.');
        window.location.href = "./login.html"
        console.log(data);
    } catch (error) {
        alert('Error creating user.');
        console.error(error);
    }
});