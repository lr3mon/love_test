const axios = require("axios"); // axios 모듈 불러오기

exports.handler = async (event, context) => {
    console.log("Received Query Params:", event.queryStringParameters);

    const { solYear, solMonth, solDay } = event.queryStringParameters;
    if (!solYear || !solMonth || !solDay) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing query parameters" })
        };
    }

    const API_KEY = process.env.REACT_APP_API_KEY || "72o0rmgeQ%2BJGGu6qar4ev3yZt6Kt%2Bjb6AQxn1urD%2BQdGNkXupiWs7ZJaGlpGMI%2BjYUSeCOBsTQD5Dw%2FuJgyPqA%3D%3D";
    const apiUrl = `https://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getLunCalInfo?solYear=${solYear}&solMonth=${solMonth}&solDay=${solDay}&ServiceKey=${API_KEY}&_type=json`;

    try {
        const response = await axios.get(apiUrl);
        console.log("API Response:", response.data);

        const responseData = response.data.response;
        if (!responseData || responseData.header.resultCode !== "00") {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Invalid API Response" })
            };
        }

        // ✅ API 응답 데이터 확인
        console.log("API Response Items:", responseData.body.items);

        // ✅ items가 객체인지 배열인지 확인 후 접근 방식 결정
        const items = responseData.body.items?.item;
        const sajuData = Array.isArray(items) ? items[0] : items; // 객체라면 그대로 사용, 배열이면 첫 번째 요소 사용

        if (!sajuData || !sajuData.lunYear || !sajuData.lunMonth || !sajuData.lunDay) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Missing necessary data from API response" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                solarDate: `${solYear}-${solMonth}-${solDay}`, // 양력 날짜
                lunarDate: `${sajuData.lunYear}-${sajuData.lunMonth}-${sajuData.lunDay}`, // 음력 날짜
                tiangan: sajuData.lunSecha || "Unknown", // 천간 (기본값 추가)
                dizhi: sajuData.lunWolgeon || "Unknown", // 지지 (기본값 추가)
                element: sajuData.lunIljin || "Unknown" // 오행 (기본값 추가)
            })
        };
    } catch (error) {
        console.error("사주 API 요청 실패:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "사주 API 요청 실패" })
        };
    }
};