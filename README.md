# 진짜 고양이를 찾아라!
[🐱 게임하기 🐧](https://hhkim0729.github.io/js-find-it-game/)

<img width="600" alt="Screen Shot 2023-02-05 at 8 34 33 PM" src="https://user-images.githubusercontent.com/72433681/216816429-eae11706-b9b5-417d-ae51-f750ac7866d5.png">

- 가짜 고양이들 사이에서 진짜 고양이를 찾는 게임
- 시간 안에 진짜 고양이를 모두 찾으면 WIN!
- 시간이 초과되거나 펭귄 고양이를 클릭한 경우 LOSE...

# 신경쓴 점
- 모듈화
- 클래스 생성자에 전달할 인자가 3개 이상으로 많을 때는 빌더 패턴으로 가독성을 높이기
- 자주 쓰는 문자열 값 등은 `Object.freeze()`를 사용한 객체로 타입을 보장하기
- 요소들을 랜덤 배치할 때 CRP(Critical Rendering Path)를 고려하기 ([CSS Triggers](https://www.lmame-geek.com/css-triggers/))
  - layout 단계부터 진행해야 하는 `top`, `left` 지양
  - composition만 일어나는 `transform` 활용
- 배경 음악과 효과음 넣기 (`Audio` 클래스를 처음 사용해봄)
