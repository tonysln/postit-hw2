let profiles = null

$(function() {
    // Load profiles
    loadProfiles()
        .then(function (profilesResponse) {
            profiles = profilesResponse
            displayProfiles(profiles)
        })
        .catch(function () {
            console.log("Error loading user info!")
        });

    // Toggle follow button
    // Used .on() method because the buttons are added dynamically 
    $('body').on("click", "button.follow-button", function () {
        $(this).toggleClass('followed-button')
        const value = $(this).text()
        if (value === "Follow") $(this).text("Followed")
        else $(this).text("Follow")
    });

})

function displayProfiles(profiles) {
    for (profile of profiles) {
        $("#profiles-container").append(`
            <div class="profile">
                <div class="profile-picture-div">
                    <img class="profile-picture" src="${profile.avatar}">
                </div>
                <div class="profile-name-div">
                    <h3 class="profile-name">${profile.firstname} ${profile.lastname}</h3>
                </div>
                <div class="follow-button-div">
                    <button class="follow-button">Follow</button>
                </div>
            </div>
        `)
    }
}

function loadProfiles() {
    return $.get(
        {
            url: "https://private-anon-3cade46633-wad20postit.apiary-mock.com/profiles",
            success: function (response) {
                return response;
            },
            error: function () {
                console.log("Error sending a GET request!")
            }
        }
    );
}
