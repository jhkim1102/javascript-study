(function () {
  // 접속자의 위치정보 가져오기.

  // 현재 위치 가져오기.
  //   navigator.geolocation.getCurrentPosition(
  //     위치 정보 가져오기 성공했을때 function () {},
  //     위치 정보 가져오기 실패했을때 function () {}
  //   );

  navigator.geolocation.getCurrentPosition(getSuccess, getError);

  var cityList = ["seoul", "incheon", "busan", "daegu", "daejeon", "jeju", "gangneung", "bucheon", "gimhae", "gyeongju", "iksan", "yeosu"];

  FOR (const city of cityList){
    let temp = getweatherwithCity(city)
    console.log(city, temp)
    $(".seoul > .celsius").text('$(temp.celsius)℃')

 
// 날씨 아이콘바꾸기
  var iconurl =
  "https://openweathermap.org/img/wn/" + temp.icon + "png";

  $().attr("src", iconurl);
   

  }

  //가져오기 성공(허옹)
  function getSuccess(position) {
    //position : 사용자의 위치 정보가 들어있다.

    //위경도를 가져오는 법
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
    loadMap(lat, lon);
  }

  //가져오기 실패(거부)
  function getError() {
    console.error("사용자의 위치정보를 가져오는데 실패했습니다.");
  }
  //카카오맵 실행해주는 함수
  function loadMap(lat, lon) {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 2.마커 표시

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(lat, lon);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 3.좌표(위경도)=>주소 변환

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      // coords: 접속한 중심좌표의 위경도 정보가 있음
      // callback: displayCenterInfo(result,status) 함수가 있다.

      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            let juso = result[i];

            $(".region1-depth").text(juso.region_1depth_name);
            $(".region3-depth").text(juso.region_3depth_name);

            // 온도구하기
            let temp = getweather(lat, lon);
            $(".region-weather").text("$(temp.celsius℃");

            // 날씨 아이콘바꾸기
            var iconurl =
              "https://openweathermap.org/img/wn/" + temp.icon + "png";

            $(".region-icon").attr("src", iconurl);

            break;
          }
        }
      }
    }

    // 오픈웨더에서 현재온도 가져오기
    function getweather(lat, lon) {
      var urlAPI =
        "https://api.openweathermap.org/data/2.5/weather?appid=eb7a504f7cc0e32c0dd3404d0df70fc7&units=metric&lang=kr&lat=37.44957&lon=126.71542";

      urlAPI += "&lat" + lat;
      urlAPI += "&lon" + lon;

      var temp = {};

      $.ajax({
        type: "GET",
        url: urlAPI,
        dataType: "json",
        async: false,
        // 동기상태=>AJAX는 기본적으로 비동기
        success: function (data) {
          const icon = data.weather[0].icon;
          const celsius = data.main.temp;

          temp.celsius = celsius.toFixed(0);
          temp.icon = icon;

          $(".region-weather").text(`${celsius.toFixed(0)}℃`);
        },

        error: function (request, status, error) {
          console.log("code:" + request.status);
          console.log("message:" + request.responseText);
          console.log("error:" + error);
        },
      });

      return temp;
    }
  }

  function getweatherwithCity(city){
    var temp ={}
    var urlAPI = "https://api.openweathermap.org/data/2.5/weather?appid=eb7a504f7cc0e32c0dd3404d0df70fc7&units=metric&lang=kr"
    urlAPI += "&q"=city

    $.ajax({
      type: "GET",
      url: urlAPI,
      dataType: "json",
      async: false,
      // 동기상태=>AJAX는 기본적으로 비동기
      success: function (data) {
        const icon = data.weather[0].icon;
        const celsius = data.main.temp;

        temp.celsius = celsius.toFixed(0);
        temp.icon = icon;

        $(".region-weather").text(`${celsius.toFixed(0)}℃`);
      },

      error: function (request, status, error) {
        console.log("code:" + request.status);
        console.log("message:" + request.responseText);
        console.log("error:" + error);
      },
    });    
  }
})();
