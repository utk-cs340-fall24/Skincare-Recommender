function askName() {
    const userName = prompt("What is your name?");
    if (userName) {
        alert("Welcome to the Skincare Recommender " + userName + "!");
    } else {
        alert("You did not enter a name, that hurts our feelings (kidding)");
    }
}