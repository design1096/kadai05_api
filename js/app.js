const API_KEY = "******************";
const url_NASA = "https://api.nasa.gov/planetary/apod?api_key=" + API_KEY;
const url_NASA_DEMO = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
const url_trans = "https://script.google.com/macros/s/******************/exec?text=";

// 取得ボタン押下時処理
function LoadDailyPhoto(){
    $.ajax({
        url: url_NASA_DEMO,
        success: function(result){
            // 画面表示
            $("#photo_display").css("display", "block");
            $("#apodImage").attr("src", result.url); // 画像
            $("#apodTitle").text(result.title); // タイトル
            $("#apodExplanation").text(result.explanation); // 解説
            $("#apodDate").text('Date: ' + result.date); // 日付
            $("#apodCopy").text('Copyright: ' + result.copyright); // コピーライト
            // ローカルストレージに格納
            localStorage.setItem('url', result.url);
            localStorage.setItem('title', result.title);
            localStorage.setItem('explanation', result.explanation);
            localStorage.setItem('date', result.date);
            localStorage.setItem('copyright', result.copyright);
        }
    });
}

// 日本語ボタン押下時処理
function ClickJapaneseBtn(){
    // 翻訳文設定
    let title_st_jp = localStorage.getItem('title_jp');
    let explanation_st_jp = localStorage.getItem('explanation_jp');
    if (title_st_jp == null) {
        Translate('title_jp', localStorage.getItem('title'));
    }
    if (explanation_st_jp == null) {
        Translate('explanation_jp', localStorage.getItem('explanation'));
    }
    // ローカルストレージから取得
    let url_st =localStorage.getItem('url');
    let date_st = localStorage.getItem('date');
    let copyright_st = localStorage.getItem('copyright');
    title_st_jp = localStorage.getItem('title_jp');
    explanation_st_jp = localStorage.getItem('explanation_jp');
    // 画面表示
    $("#photo_display").css("display", "block");
    $("#apodImage").attr("src", url_st); // 画像
    $("#apodTitle").text(title_st_jp); // タイトル
    $("#apodExplanation").text(explanation_st_jp); // 解説
    $("#apodDate").text('日付: ' + date_st); // 日付
    $("#apodCopy").text('コピーライト: ' + copyright_st); // コピーライト
    // ボタン表示の変更
    $("#jp_btn").css("display", "none");
    $("#en_btn").css("display", "block");
}

// Englishボタン押下時処理
function ClickEnglishBtn() {
    // ローカルストレージから取得
    let url_st =localStorage.getItem('url');
    let date_st = localStorage.getItem('date');
    let copyright_st = localStorage.getItem('copyright');
    let title_st = localStorage.getItem('title');
    let explanation_st = localStorage.getItem('explanation');
    // 画面表示
    $("#photo_display").css("display", "block");
    $("#apodImage").attr("src", url_st); // 画像
    $("#apodTitle").text(title_st); // タイトル
    $("#apodExplanation").text(explanation_st); // 解説
    $("#apodDate").text('Date: ' + date_st); // 日付
    $("#apodCopy").text('Copyright: ' + copyright_st); // コピーライト
    // ボタン表示の変更
    $("#jp_btn").css("display", "block");
    $("#en_btn").css("display", "none");
}

// 翻訳処理（ローカルストレージ格納）
function Translate(key, value){
    $.ajax({
        type: 'GET',
        url: url_trans + value,
        success: function(result){
            localStorage.setItem(key, result);
        }
    });
}

// Search Photosボタン押下時処理
function SearchPhoto(){
    var search = document.getElementById("search");
    var searchUrl = "https://images-api.nasa.gov/search?q=" + search.value + "&media_type=image";
    const tag1 = '<div style="padding: 1%;"><a href="';
    const tag2 = '" data-lightbox="group"><img  width="218px" src="';
    const tag3 = '"></a><p style="font-size: 12px;">';
    const tag4 = '</p></div>';

    $.ajax({
        url: searchUrl,
        success: function(result){
            // 画面表示
            $('#library').html('');
            $("#search_diaplay").css("display", "block");
            for (var i = 0; i < result.collection.items.length; i++) {
                if(result.collection.items[i].data[0].media_type == "image") {
                    $('#library').append(tag1 + result.collection.items[i].links[0].href + tag2 + result.collection.items[i].links[0].href + tag3 + result.collection.items[i].data[0].title + tag4);
                }
            }
        }
    });
}

// Closeボタン（Daily Photo）押下時処理
function CloseDailyPhoto(){
    $("#photo_display").css("display", "none");
}

// Closeボタン（Search Photos）押下時処理
function CloseSearchPhoto(){
    $("#search_diaplay").css("display", "none");
}

// Search Mars Rover Photosボタン押下時処理
// function SearchMarsPhoto(){
//     var search = document.getElementById("search_sol");
//     var searchUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=" + search.value + "&api_key=" + API_KEY;
//     const tag1 = '<div style="padding: 1%;"><a href="';
//     const tag2 = '" data-lightbox="group"><img  width="218px" src="';
//     const tag3 = '"></a></div>';

//     $.ajax({
//         url: searchUrl,
//         success: function(result){
//             // 画面表示
//             console.log(result);
//             console.log(result.photos);
//             console.log(result.photos.length);
//             console.log(result.photos[0]);
//             $('#library').html('');
//             $("#search_diaplay").css("display", "block");
//             for (var i = 0; i < result.photos.length; i++) {
//                 $('#library').append(tag1 + result.photos[0].img_src + tag2 + result.photos[0].img_src + tag3);
//             }
//         }
//     });
// }