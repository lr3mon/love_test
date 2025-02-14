const axios = require("axios");

exports.handler = async (event, context) => {
  // URL 쿼리 파라미터에서 값을 추출합니다.
  const { solYear, solMonth, solDay } = event.queryStringParameters;
  
  // 환경 변수 또는 Netlify 대시보드에 등록된 API 키를 사용합니다.
  const API_KEY = process.env.DATA_GO_API_KEY;
  
  // data.go.kr API URL 구성
  const apiUrl = `https://apis.data.go.kr/B090041/openapi/service/LunCalService/getLunCal?solYear=${solYear}&solMonth=${solMonth}&solDay=${solDay}&ServiceKey=${API_KEY}&_type=json`;
  
  try {
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error("사주 API 요청 실패:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "사주 API 요청 실패" })
    };
  }
};