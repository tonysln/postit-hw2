let posts = null

$(function() {
    // Load all posts from the endpoint
    loadPosts()
        .then(function (postsResponse) {
            posts = postsResponse
            displayPosts(posts)
        })
        .catch(function () {
            console.log("Error loading posts!")
        });

    // Toggle follow button
    // Used .on() method because the buttons are added dynamically 
    $('body').on("click", "button.like-button", function () {
        $(this).toggleClass('liked')
    });
})

function displayPosts(posts) {
    for (post of posts) {
        // Beginning of the post, guaranteed to be always included
        let post_content = `
            <div class="post">
                <div class="post-author">
                    <span class="post-author-info">
                        <img src="${post.author.avatar}" alt="Post author">
                        <small>${post.author.firstname} ${post.author.lastname}</small>
                    </span>
                    <small>${post.createTime}</small>
                </div>
        `
        // Media may not be included
        // But if it is, it's either a video or an images
        if (post.media) {
            post_content += (post.media.type === "video") ? `
                    <div class="post-image">
                        <video src="${post.media.url}" controls></video>
                    </div>
                ` : `
                    <div class="post-image">
                        <img src="${post.media.url}" alt="">
                    </div>
                `
        }

        // Text may not be included, too
        if (post.text) {
            post_content += `<div class="post-title"><h3>${post.text}</h3></div>`
        }

        // Finally, the like button must be present on each post
        post_content += `
                <div class="post-actions">
                    <button type="button" name="like" class="like-button">${post.likes}</button>
                </div>
            </div>
        `

        $("#posts-container").append(post_content)
    }
}

function loadPosts() {
    return $.get(
        {
            url: "https://private-anon-2946c586f1-wad20postit.apiary-mock.com/posts",
            success: function (response) {
                return response;
            },
            error: function () {
                console.log("Error sending a GET request!")
            }
        }
    );
}