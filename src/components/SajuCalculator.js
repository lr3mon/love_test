import React, { useState } from "react";
import "../styles/SajuCalculator.css"; // ✅ 스타일 유지

// 시주(시간 기둥) 계산을 위한 데이터
const hourZodiac = [
    { range: [23, 1], dizhi: "자" },
    { range: [1, 3], dizhi: "축" },
    { range: [3, 5], dizhi: "인" },
    { range: [5, 7], dizhi: "묘" },
    { range: [7, 9], dizhi: "진" },
    { range: [9, 11], dizhi: "사" },
    { range: [11, 13], dizhi: "오" },
    { range: [13, 15], dizhi: "미" },
    { range: [15, 17], dizhi: "신" },
    { range: [17, 19], dizhi: "유" },
    { range: [19, 21], dizhi: "술" },
    { range: [21, 23], dizhi: "해" },
];

// 천간 리스트 (한글 적용)
const tianganCycle = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];

// 시주의 천간을 정확히 계산하는 함수
const calculateHourPillar = (yearTiangan, birthHour) => {
    if (birthHour === "") return { tiangan: "-", dizhi: "-" };

    // 시지(시간의 지지) 찾기
    const dizhiData = hourZodiac.find(({ range }) => 
        (birthHour >= range[0] && birthHour < range[1]) || (range[0] === 23 && birthHour === 0)
    );
    const dizhi = dizhiData?.dizhi || "-";

    // 연간을 기반으로 시주의 천간 계산
    const yearTianganIndex = tianganCycle.indexOf(yearTiangan);
    if (yearTianganIndex === -1) return { tiangan: "-", dizhi }; // 연간 정보가 없으면 "-" 반환

    // 시주의 천간 공식: (연간 인덱스 * 2 + 시지 인덱스) % 10
    const dizhiIndex = hourZodiac.findIndex(({ dizhi: d }) => d === dizhi);
    const tiangan = tianganCycle[(yearTianganIndex * 2 + dizhiIndex) % 10];

    return { tiangan, dizhi };
};

function SajuCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [birthHour, setBirthHour] = useState(""); // ✅ 출생 시간 추가
    const [sajuResult, setSajuResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_URL || "https://saju-4asx6qoih-park-sangjoons-projects.vercel.app/api/saju";

    const fetchSajuData = async () => {
        console.log("✅ [DEBUG] API 요청 URL:", API_BASE_URL);    
        console.log("✅ [DEBUG] 현재 birthDate 값:", birthDate);
        console.log("✅ [DEBUG] 현재 birthHour 값:", birthHour);

        if (!birthDate) {
            setError("생년월일을 입력하세요.");
            return;
        }

        const [year, month, day] = birthDate.split("-");
        console.log(`✅ [DEBUG] Parsed Date: ${year}-${month}-${day}`);

        if (!year || !month || !day) {
            setError("유효한 날짜를 입력하세요.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const apiUrl = `${API_BASE_URL}?solYear=${year}&solMonth=${month}&solDay=${day}&birthHour=${birthHour || 0}`;
            console.log(`🔍 API 요청 URL: ${apiUrl}`);

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`❌ HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ [DEBUG] API 응답 데이터:", data);

            if (!data.solarDate || !data.lunarDate || !data.saju) {
                setError("사주 데이터를 불러올 수 없습니다.");
                return;
            }

            console.log("✅ [DEBUG] 사주 데이터 설정 완료");
            setSajuResult(data);
        } catch (error) {
            console.error("❌ 사주 API 요청 오류:", error);
            setError("API 요청에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    // 시주 계산 (연간 정보가 있을 경우만)
    const calculatedHourPillar = sajuResult ? calculateHourPillar(sajuResult.saju.year.tiangan, birthHour || 0) : { tiangan: "-", dizhi: "-" };

    return (
        <div className="saju-container">
            <h2>🔮 사주 원국 계산기</h2>

            <div className="saju-inputs">
                <label>생년월일 (양력):</label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />

                <label>출생 시간:</label>
                <select value={birthHour} onChange={(e) => setBirthHour(e.target.value)}>
                    <option value="">모름 (자동 계산)</option>
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i}>{i}시</option>
                    ))}
                </select>

                <button onClick={fetchSajuData} disabled={loading}>
                    {loading ? "계산 중..." : "계산하기"}
                </button>
            </div>

            {error && <p className="error-message">❌ {error}</p>}

            {sajuResult && (
                <div className="saju-result">
                    <h3>📝 사주 원국</h3>
                    <p>📅 양력 날짜: {sajuResult.solarDate}</p>
                    <p>🌙 음력 날짜: {sajuResult.lunarDate}</p>
                    

                    <table className="saju-table">
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
                                <td>{calculatedHourPillar.tiangan || "-"}</td>
                                <td>{sajuResult.saju.day?.tiangan || "-"}</td>
                                <td>{sajuResult.saju.month?.tiangan || "-"}</td>
                                <td>{sajuResult.saju.year?.tiangan || "-"}</td>
                            </tr>
                            <tr className="saju-dizhi">
                                <td>{calculatedHourPillar.dizhi || "-"}</td>
                                <td>{sajuResult.saju.day?.dizhi || "-"}</td>
                                <td>{sajuResult.saju.month?.dizhi || "-"}</td>
                                <td>{sajuResult.saju.year?.dizhi || "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default SajuCalculator;