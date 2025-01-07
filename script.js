/**
 * Authenticates the user by sending their username and hashed password to the server.
 */
function authenticate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Hash the password before sending it to the server
    var hashedPassword = sha256(password);

    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', hashedPassword);

    fetch('authenticate.py', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === "success") {
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("content").style.display = "block";
        } else {
            alert("Incorrect username or password. Please try again.");
        }
    });
}

/**
 * SHA-256 hashing function
 * @param {string} str - The string to be hashed
 * @returns {Promise<string>} - A promise that resolves to the hashed string in hexadecimal format
 */
function sha256(str) {
    const buffer = new TextEncoder('utf-8').encode(str);
    return crypto.subtle.digest('SHA-256', buffer).then(hashArray => {
        const hashHex = Array.from(new Uint8Array(hashArray)).map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashHex;
    });
}