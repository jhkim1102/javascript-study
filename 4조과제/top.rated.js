const movieurl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=cf04bdef139b60541090dad976109662&language=ko-KR&page=1&region=KR";

$.ajax({
  type: "GET",
  url: movieurl,
  dataType: "json",
  async: false,
  success: function (data) {
    console.log("전체 data:", data);
    const results = data.results;
    console.log(data.results);

    for (const i in results) {
      console.log(results[i]);
    }
    let imgURL = "https://image.tmdb.org/t/p/w500";
    // 1번
    $(".images").append(
      `<img src="${
        imgURL + results[0].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date").append(`출시일: ${results[0].release_date}`);
    $(".vote_average").append(`평점: ${results[0].vote_average}점`);
    // 2번
    $(".images1").append(
      `<img src="${
        imgURL + results[1].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date1").append(`출시일: ${results[1].release_date}`);
    $(".vote_average1").append(`평점: ${results[1].vote_average}점`);
    // 3번
    $(".images2").append(
      `<img src="${
        imgURL + results[2].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date2").append(`출시일: ${results[2].release_date}`);
    $(".vote_average2").append(`평점: ${results[2].vote_average}점`);
    // 4번
    $(".images3").append(
      `<img src="${
        imgURL + results[3].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;"">`
    );
    $(".release_date3").append(`출시일: ${results[3].release_date}`);
    $(".vote_average3").append(`평점: ${results[3].vote_average}점`);
    // 5번
    $(".images4").append(
      `<img src="${
        imgURL + results[4].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date4").append(`출시일: ${results[4].release_date}`);
    $(".vote_average4").append(`평점: ${results[4].vote_average}점`);
    // 6번
    $(".images5").append(
      `<img src="${
        imgURL + results[5].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date5").append(`출시일: ${results[5].release_date}`);
    $(".vote_average5").append(`평점: ${results[5].vote_average}점`);
    // 7번
    $(".images6").append(
      `<img src="${
        imgURL + results[6].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date6").append(`출시일: ${results[6].release_date}`);
    $(".vote_average6").append(`평점: ${results[6].vote_average}점`);
    // 8번
    $(".images7").append(
      `<img src="${
        imgURL + results[7].poster_path
      } " style="object-fit: cover; width: 184px; height: 262px;">`
    );
    $(".release_date7").append(`출시일: ${results[7].release_date}`);
    $(".vote_average7").append(`평점: ${results[7].vote_average}점`);
  },
  error: function (request, status, error) {
    console.log("code:" + request.status);
    console.log("message:" + request.responseText);
    console.log("error:" + error);
  },
});
