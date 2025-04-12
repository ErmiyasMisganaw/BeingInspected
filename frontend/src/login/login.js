let users = {user1:{username: "username", password: "password", role: "admin"},
            user2:{username: "username2", password: "password2", role: "inspector"},
            user3:{username: "username3", password: "password3", role: "elcectrician"},
            user4:{username: "username4", password: "password4", role: "plumber"}};
let username = document.getElementById("username").value;
let password = document.getElementById("password").value;
if(username in users && password == users[username].password){
    alert("Login successful! Welcome " + username + "!");
    localStorage.setItem("username", username);
    localStorage.setItem("role", users[username].role);
    window.location.href = "home.html";
}