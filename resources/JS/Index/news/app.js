$(document).ready(function () {

    let url = "https://newsapi.org/v2/top-headlines?country=ph&category=health&apiKey=fd449250b00d4d0e844148134a0310e5";

    $.ajax({
        url: url,
        method: "GET",
        dataType: "JSON",


        beforeSend: function () {
            $(".progress").show();
        },

        complete: function () {
            $(".progress").hide();
        },

        success: function (newsdata) {
            let output = "";
            let latestNews = newsdata.articles;
            var imageurl = "";
            var author = "";
            var count = 0;
            var size ="";

            for (var i in latestNews) {
                count++;
               
                if (count > 3) {
                    break;
                }

                if (latestNews[i].urlToImage == null) {

                    imageurl = "https://i.ibb.co/m6J6j0H/News.png";
                } else {
                    imageurl = latestNews[i].urlToImage;
                   
                   
                }

                if (latestNews[i].author == null) {
                    author = latestNews[i].source.name;
                } else {
                    author = latestNews[i].author;
                }
                console.log(imageurl);
                output += `
<div class="col mb-4">
        <div class="card h-100">
         
            <img src="${imageurl}" class="card-img-top" alt="${latestNews[i].title}">
           
           
          <div class="card-body">
                <h5 class="card-title">Title: <a href="${latestNews[i].url}" title="${latestNews[i].title}">${latestNews[i].title}</a></h5>
            <p class="card-text"><b>Author</b>: ${author} </p>
            <p class="card-text"><b>News source</b>: ${latestNews[i].source.name} </p>
            <p class="card-text"><b>Published</b>: ${latestNews[i].publishedAt} </p>
            <p class="card-text"><b>Description</b>: ${latestNews[i].description}</p>
          </div>

          <div class="card-footer">
            <a href="${latestNews[i].url}" target="_blank" class="btn">Read More</a>
          </div>
         </div>
         </div>
      `;
            }

            if (output !== "") {
                $("#newsResults").html(output);
            }

        },

        error: function () {
            let errorMsg = `<div class="errorMsg center">Some error occured</div>`;
            $("#newsResults").html(errorMsg);
        }
    })

});