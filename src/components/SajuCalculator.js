import React, { useState } from "react";
import "../styles/SajuCalculator.css";

function SajuCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [birthHour, setBirthHour] = useState("12"); // 기본값: 정오 (오시)
    const [sajuResult, setSajuResult] = useState(null);
    const API_BASE_URL = "https://your-netlify-site.netlify.app/.netlify/functions/saju";

    const fetchSajuData = async () => {
        if (!birthDate) {
            console.error("Error: birthDate is not defined");
            return;
        }
    
        const [year, month, day] = birthDate.split("-");
        if (!year || !month || !day) {
            console.error("Error: Invalid birthDate format", birthDate);
            return;
        }
    
        try {
            const response = await fetch(`${API_BASE_URL}?solYear=${year}&solMonth=${month}&solDay=${day}&ServiceKey=${process.env.REACT_APP_API_KEY}&_type=json`, {
                headers: {
                    "Origin": "https://your-deployed-site.com" // 배포된 도메인
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("✅ API 응답 데이터:", data);
            
            if (!data.solarDate || !data.lunarDate || !data.tiangan || !data.dizhi || !data.element) {
                console.error("❌ API 응답에서 필수 데이터 누락:", data);
                return;
            }
    
            setSajuResult(parseSajuData(data, birthHour));
        } catch (error) {
            console.error("❌ 사주 API 요청 오류:", error);
        }
    };

    const parseSajuData = (data, hour) => {
        console.log("✅ API에서 받은 원본 데이터:", JSON.stringify(data, null, 2));
    
        if (!data.tiangan || !data.dizhi || !data.element) {
            console.error("❌ 필수 데이터 없음:", data);
            return null;
        }
    
        // 🔥 한자 제거 및 천간/지지 분리 함수
        const extractTianganDizhi = (value) => {
            if (!value) return { tiangan: "-", dizhi: "-" };
            const cleanValue = value.replace(/\(.*?\)/g, ""); // 괄호 안 한자 제거
            return { tiangan: cleanValue.charAt(0), dizhi: cleanValue.charAt(1) };
        };
    
        // ✅ 새로운 API 구조에 맞게 데이터 매핑
        const saju = {
            year: extractTianganDizhi(data.tiangan),  // 연주 (경진)
            month: extractTianganDizhi(data.dizhi),  // 월주 (정해)
            day: extractTianganDizhi(data.element),  // 일주 (신유)
        };
    
        console.log("✅ 가공된 사주 데이터:", JSON.stringify(saju, null, 2));
    
        // **🕐 시주 계산 추가**
        const hourToDizhi = [
            "자", "자", "축", "축", "인", "인", "묘", "묘", "진", "진", "사", "사",
            "오", "오", "미", "미", "신", "신", "유", "유", "술", "술", "해", "해"
        ];
        const hourDizhi = hourToDizhi[parseInt(hour, 10)] || "-";
    
        const tianganOrder = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
        const dizhiOrder = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
        const tianganIndex = tianganOrder.indexOf(saju.day.tiangan);
    
        if (tianganIndex === -1) {
            console.error("❌ 일간 오류: 유효하지 않음", saju.day.tiangan);
            return null;
        }
    
        const hourTiangan = tianganOrder[(tianganIndex * 2 + dizhiOrder.indexOf(hourDizhi)) % 10];
    
        console.log(`✅ 시주 계산 결과: 천간=${hourTiangan}, 지지=${hourDizhi}`);
        saju.hour = { tiangan: hourTiangan, dizhi: hourDizhi };
    
        console.log("✅ 최종 가공된 사주 데이터:", JSON.stringify(saju, null, 2));
    
        return {
            saju,
            solarDate: data.solarDate,
            lunarDate: data.lunarDate,
            element: "오행 분석 필요" // 추가할 오행 분석 로직
        };
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

            {sajuResult ? (
                <div className="saju-result">
                    <h3>📝 사주 원국</h3>
                    <p>📅 양력 날짜: {sajuResult.solarDate}</p>
                    <p>🌙 음력 날짜: {sajuResult.lunarDate}</p>

                    <table>
                        <thead>
                            <tr>
                                <th>시주</th>
                                <th>일주</th>
                                <th>월주</th>
                                <th>연주</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="saju-tiangan">
                                <td>{sajuResult.saju.hour?.tiangan || "-"}</td>
                                <td>{sajuResult.saju.day?.tiangan || "-"}</td>
                                <td>{sajuResult.saju.month?.tiangan || "-"}</td>
                                <td>{sajuResult.saju.year?.tiangan || "-"}</td>
                            </tr>
                            <tr className="saju-dizhi">
                                <td>{sajuResult.saju.hour?.dizhi || "-"}</td>
                                <td>{sajuResult.saju.day?.dizhi || "-"}</td>
                                <td>{sajuResult.saju.month?.dizhi || "-"}</td>
                                <td>{sajuResult.saju.year?.dizhi || "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="error-message">❌ 사주 데이터를 불러올 수 없습니다. 콘솔 로그를 확인하세요.</p>
            )}
        </div>
    );
}

export default SajuCalculator;