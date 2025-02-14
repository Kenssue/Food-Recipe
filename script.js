function handleCredentialResponse(response) {
    console.log("ID Token: " + response.credential);
    window.location.href = "dashboard.html";
  }