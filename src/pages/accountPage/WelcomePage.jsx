//랜딩페이지,웰컴페이지 담당자: 이동건
import * as S from "./WelcomePage.styled";
import welcomeLogo from "@assets/icons/welcomeLogo.svg";
import kakao from "@assets/icons/kakao.svg";
import { useCustomNavigate } from "@hooks/useCustomNavigate";
import { useEffect } from "react";
import axiosInstance from "@apis/axiosInstance";

export const WelcomePage = () => {
  //useCustomNavigate훅을 이용해서 버튼클릭시 이동
  const { goTo } = useCustomNavigate();

  //계속 스크롤이 생기니까 강제로 body태그에서도 스크롤비활성화해보기
  useEffect(() => {
    // `WelcomePage`에서 스크롤 비활성화
    document.body.style.overflow = "hidden";
    return () => {
      // 페이지를 벗어나면 스크롤 다시 활성화
      document.body.style.overflow = "";
    };
  }, []);

  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 URL로 직접 이동
    window.location.href = `${
      import.meta.env.VITE_BASE_URL
    }/signup/login/kakao/`;
  };
  const handleNormalLogin = async () => {
    try {
      // 로그인 상태 확인 API 호출
      const response = await axiosInstance.get("/signup/login/home/");
      if (response.data.is_authenticated) {
        // 이미 로그인된 상태라면 메인 페이지로 이동
        goTo("/main");
      } else {
        // 로그인되지 않은 상태라면 로그인 페이지로 이동
        goTo("/login");
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류:", error);
      // 에러 발생 시 로그인 페이지로 이동
      goTo("/login");
    }
  };
  return (
    <S.Wrapper>
      <S.Content>
        <S.LogoWrapper>
          <img src={welcomeLogo} alt="Welcome Logo" />
          <S.LogoTextWrapper>
            <S.LogoText>출석부터 네트워킹까지 한번에!</S.LogoText>
            <S.LogoText className="Title">EVERION</S.LogoText>
          </S.LogoTextWrapper>
        </S.LogoWrapper>
        <S.BtnWrapper>
          <S.Btn onClick={handleKakaoLogin}>
            <img
              src={kakao}
              alt="kakao Logo"
              style={{ width: "auto", height: "4vh" }}
            />
            <span className="kakao">카카오 로그인</span>
          </S.Btn>
          <S.Btn
            onClick={handleNormalLogin}
            color="rgba(255, 255, 255, 0.80)"
          >
            로그인
          </S.Btn>
        </S.BtnWrapper>
        <S.SignUp>
          <span>아직 회원이 아니신가요?</span>
          <span className="underline" onClick={() => goTo("/signup")}>
            회원가입
          </span>
        </S.SignUp>
      </S.Content>
    </S.Wrapper>
  );
};
