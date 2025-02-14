function handleCredentialResponse(response) {
  if (response.credential) {
    // Log the ID token to the console (for debugging purposes)
    console.log("ID Token: " + response.credential);

    // Redirect the user to the dashboard page
    window.location.href = "dashboard.html";
  } else {
    // Handle the error case
    console.error("Sign-in failed. No credential received.");
    alert("Sign-in failed. Please try again.");
  }
}
