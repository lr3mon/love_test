import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/Biorhythm.css"; // 스타일 추가

// ✅ 바이오리듬 계산 함수
const calculateBiorhythm = (birthDate, targetDate, range = 3) => {
  const birthTime = new Date(birthDate).getTime();
  const targetTime = new Date(targetDate).getTime();
  const diffDays = Math.floor((targetTime - birthTime) / (1000 * 60 * 60 * 24));

  const days = Array.from({ length: range * 2 + 1 }, (_, i) => new Date(targetTime + (i - range) * 86400000));
  
  return {
    days: days.map((d) => `${d.getMonth() + 1}월 ${d.getDate()}일`), // ✅ X축을 "M월 D일" 형식으로 변환
    physical: days.map((d, i) => Math.sin((2 * Math.PI * (diffDays + i - range)) / 23) * 100), // ✅ Y축 % 변환
    emotional: days.map((d, i) => Math.sin((2 * Math.PI * (diffDays + i - range)) / 28) * 100),
    intellectual: days.map((d, i) => Math.sin((2 * Math.PI * (diffDays + i - range)) / 33) * 100),
  };
};

function Biorhythm() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [biorhythmData, setBiorhythmData] = useState(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    setBiorhythmData(calculateBiorhythm(birthDate, targetDate));
  };

  return (
    <div className="biorhythm-container">
      <h2>📊 바이오리듬 계산기</h2>
      <div className="biorhythm-inputs">
        <label>출생일:</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        <label>분석 날짜:</label>
        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        <button onClick={handleCalculate}>계산하기</button>
      </div>

      {biorhythmData && (
        <div className="biorhythm-result">
          <h3>📅 {targetDate} 바이오리듬</h3>
          <Line
            data={{
              labels: biorhythmData.days,
              datasets: [
                {
                  label: "🦾 신체 리듬",
                  data: biorhythmData.physical,
                  borderColor: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                  fill: false,
                  pointStyle: "circle", // ✅ 범례 아이콘을 원(circle)으로 변경
                },
                {
                  label: "💖 감정 리듬",
                  data: biorhythmData.emotional,
                  borderColor: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.2)",
                  fill: false,
                  pointStyle: "circle", // ✅ 범례 아이콘을 원(circle)으로 변경
                },
                {
                  label: "🧠 지적 리듬",
                  data: biorhythmData.intellectual,
                  borderColor: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.2)",
                  fill: false,
                  pointStyle: "circle", // ✅ 범례 아이콘을 원(circle)으로 변경
                },
              ],
            }}
            options={{
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true, // ✅ 범례를 원(circle)으로 변경
                            boxWidth: 10, // ✅ 아이콘 크기 조정 (더 작은 원)
                        },
                    },
                }, 
              scales: {
                y: {
                  min: -100,
                  max: 100,
                  ticks: {
                    callback: (value) => `${value}%`,
                  },
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Biorhythm;