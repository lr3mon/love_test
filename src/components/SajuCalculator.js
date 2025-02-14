import React, { useState } from "react";
import "../styles/SajuCalculator.css";

function SajuCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [birthHour, setBirthHour] = useState("0"); // 출생 시간 선택
    const [sajuResult, setSajuResult] = useState(null);
    const API_KEY = "YOUR_API_KEY"; // ✅ 발급받은 API 키 입력

    const fetchSajuData = async () => {
        if (!birthDate) return;

        const [year, month, day] = birthDate.split("-");

        // ✅ API 요청 URL 생성
        const apiUrl = `https://apis.data.go.kr/B090041/openapi/service/LunCalService/getLunCal?solYear=${year}&solMonth=${month}&solDay=${day}&ServiceKey=${'72o0rmgeQ%2BJGGu6qar4ev3yZt6Kt%2Bjb6AQxn1urD%2BQdGNkXupiWs7ZJaGlpGMI%2BjYUSeCOBsTQD5Dw%2FuJgyPqA%3D%3D'}&_type=json`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.response.body.items) {
                const sajuData = data.response.body.items.item;
                const lunarYear = sajuData.lunYear;  // 음력 연도
                const lunarMonth = sajuData.lunMonth; // 음력 월
                const lunarDay = sajuData.lunDay;  // 음력 일

                // ✅ 천간·지지 및 오행 정보 저장
                setSajuResult({
                    solarDate: `${year}-${month}-${day}`, 
                    lunarDate: `${lunarYear}-${lunarMonth}-${lunarDay}`,
                    tiangan: sajuData.tiangan,
                    dizhi: sajuData.dizhi,
                    element: sajuData.element // 오행 정보
                });
            }
        } catch (error) {
            console.error("사주 API 요청 오류:", error);
        }
    };

    return (
        <div className="saju-container">
            <h2>🔮 사주 원국 계산기</h2>
            <div className="saju-inputs">
                <label>생년월일 (양력):</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                
                <label>출생 시간:</label>
                <select value={birthHour} onChange={(e) => setBirthHour(e.target.value)}>
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>{i}시</option>
                    ))}
                </select>

                <button onClick={fetchSajuData}>계산하기</button>
            </div>

            {sajuResult && (
                <div className="saju-result">
                    <h3>📝 사주 원국</h3>
                    <p>📅 양력 날짜: {sajuResult.solarDate}</p>
                    <p>🌙 음력 날짜: {sajuResult.lunarDate}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>연주</th>
                                <th>월주</th>
                                <th>일주</th>
                                <th>시주</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="saju-tiangan">
                                <td>{sajuResult.tiangan.year}</td>
                                <td>{sajuResult.tiangan.month}</td>
                                <td>{sajuResult.tiangan.day}</td>
                                <td>{sajuResult.tiangan.hour}</td>
                            </tr>
                            <tr className="saju-dizhi">
                                <td>{sajuResult.dizhi.year}</td>
                                <td>{sajuResult.dizhi.month}</td>
                                <td>{sajuResult.dizhi.day}</td>
                                <td>{sajuResult.dizhi.hour}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>🌟 오행 분석: {sajuResult.element}</p>
                </div>
            )}
        </div>
    );
}

export default SajuCalculator;