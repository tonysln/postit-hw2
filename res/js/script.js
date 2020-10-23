$(function() {
    // Load user info
    loadUserInfo()
        .then(function (user) {
            displayUserInfo(user)
        })
        .catch(function () {
            console.log("Error loading user info!")
        });

    // Toggle the drop-down menu on profile picture click
    $("#user-avatar").click(function() {
        $("#drop-down-menu").toggle()
    })
})

function displayUserInfo(user) {
    $("#user-name").text(user.firstname + " " + user.lastname)
    $("#user-email").text(user.email)
    $("#user-avatar").attr("src", user.avatar)
}

function loadUserInfo() {
    return $.get(
        {
            url: "https://private-anon-2946c586f1-wad20postit.apiary-mock.com/users/1",
            success: function (response) {
                return response;
            },
            error: function () {
                console.log("Error sending a GET request!")
            }
        }
    );
}