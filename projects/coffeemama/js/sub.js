AOS.init({
  duration: 2000,
  once: true,
});

document.querySelectorAll('.lnb a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // 현재 페이지가 brand 또는 franchise인 경우만 스크롤 이동
    if (location.pathname.includes('brand') || location.pathname.includes('franchise')) {
      // 내부 링크(#id 또는 .class)만 스크롤
      if (href.startsWith('#') || href.startsWith('.')) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          const headerOffset = 100; // 헤더 높이
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
    // brand/franchise 외 페이지는 기본 링크 이동 유지
  });
});


//brand
document.querySelectorAll('.story_img li').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 650) { // 모바일 기준
    document.querySelectorAll('.scroll-custom [data-aos]').forEach(el => {
      el.setAttribute('data-aos', 'fade-up'); // 모든 애니메이션 fade-up으로 변경
    });

    // 기존 AOS 초기화 제거 후 재초기화
    if (AOS) {
      AOS.refreshHard(); // DOM 변화 감지 후 애니메이션 재적용
    }
  }
});

$(".story .story_img > li").click(function () {
  $(this).addClass("active").siblings().removeClass("active")
});

//menu


//store
$(document).ready(function () {
  // 초기 설정: 첫 번째 탭 활성화, 나머지 콘텐츠 숨기기
  $(".store_tab .lnb li a").removeClass("on");
  $(".store_tab .lnb li:first-child a").addClass("on");
  $(".store_tab .search").show();
  $(".store_tab .district, .store_tab .option").hide();

  // 탭 클릭 이벤트
  $(".store_tab .lnb li a").click(function (e) {
    e.preventDefault(); // 링크 기본 이동 막기

    // 클릭한 탭에 'on' 클래스 추가, 나머지 제거
    $(this).addClass("on").parent().siblings().find("a").removeClass("on");

    // 콘텐츠 전환
    var index = $(this).parent().index(); // 클릭한 li의 인덱스

    // 모든 콘텐츠 숨기기
    $(".store_tab .search, .store_tab .district, .store_tab .option").hide();

    // 클릭한 탭에 맞는 콘텐츠만 보여주기
    if (index === 0) {
      $(".store_tab .search").show();        // 지점명
    } else if (index === 1) {
      $(".store_tab .district").show();      // 지역
    } else if (index === 2) {
      $(".store_tab .option").show();        // 옵션선택
    }
  });
});

const tdList = document.querySelectorAll(".option table td a");

tdList.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault(); // 🔹 페이지 상단 이동 방지
    const td = a.closest("td");
    td.classList.toggle("active"); // 🔹 클릭 시 on/off
  });
});

//franchise

/*  */
const districtData = {
  "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
  "부산광역시": ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
  "대구광역시": ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
  "인천광역시": ["강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "옹진군", "중구"],
  "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
  "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
  "울산광역시": ["남구", "동구", "북구", "울주군", "중구"],
  "세종특별자치시": ["세종시"],
  "경기도": ["수원시", "고양시", "용인시", "성남시", "부천시", "안산시", "화성시", "남양주시", "안양시", "평택시", "의정부시", "시흥시", "파주시", "김포시", "광명시", "광주시", "군포시", "이천시", "오산시", "하남시", "양주시", "구리시", "안성시", "포천시", "의왕시", "여주시", "동두천시", "과천시"],
  "강원특별자치도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
  "충청북도": ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군", "증평군"],
  "충청남도": ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
  "전라북도": ["전주시", "익산시", "군산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
  "전라남도": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
  "경상북도": ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
  "경상남도": ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
  "제주특별자치도": ["제주시", "서귀포시"]
};

const sidoSelect = document.getElementById("sido");
const sigunguSelect = document.getElementById("sigungu");

sidoSelect.addEventListener("change", function () {
  const selectedSido = this.value;
  const sigunguList = districtData[selectedSido] || [];

  // 기존 옵션 제거
  sigunguSelect.innerHTML = '<option disabled selected value="">구/군 선택</option>';

  // 새 옵션 추가
  sigunguList.forEach(sigungu => {
    const option = document.createElement("option");
    option.value = sigungu;
    option.textContent = sigungu;
    sigunguSelect.appendChild(option);
  });
});

/* faq */
$(function () {
  $(".a").hide(); // 답변 전부 숨김

  $(".faq .q").click(function (e) {
    e.preventDefault();

    const $this = $(this);
    const $answer = $this.next(".a");

    // 이미 열려있으면 닫기
    if ($answer.is(":visible")) {
      $answer.slideUp(300);
      $this.removeClass("active");
    } else {
      // 다른 열린 답변들 모두 닫기
      $(".a:visible").slideUp(300);
      $(".faq .q.active").removeClass("active");

      // 현재 Q → A 열기
      $answer.slideDown(300);
      $this.addClass("active");
    }
  });
});


//community
const selects = document.querySelectorAll('.cs .form_09 .date select');

selects.forEach(sel => {
  sel.addEventListener('click', () => {
    sel.classList.toggle('open');
  });
});
