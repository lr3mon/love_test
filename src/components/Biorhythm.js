import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/Biorhythm.css"; // 스타일 추가

const calculateBiorhythm = (birthDate, targetDate, range = 3) => {
  const birthTime = new Date(birthDate).getTime();
  const targetTime = new Date(targetDate).getTime();
  const diffDays = Math.floor((targetTime - birthTime) / (1000 * 60 * 60 * 24));

  const days = Array.from({ length: range * 2 + 1 }, (_, i) => new Date(targetTime + (i - range) * 86400000));
  
  return {
    days: days.map((d) => `${d.getMonth() + 1}월 ${d.getDate()}일`), 
    physical: days.map((d, i) => Math.sin((2 * Math.PI * (diffDays + i - range)) / 23) * 100),
    emotional: days.map((d, i) => Math.sin((2 * Math.PI * (diffDays + i - range)) / 28) * 100),
    intellectual: days.map((d, i) => Math.sin((2 * Math.PI * (diffDays + i - range)) / 33) * 100),
  };
};

function Biorhythm() {
  const [birthDate, setBirthDate] = useState(localStorage.getItem("birthDate") || "");
  const [targetDate, setTargetDate] = useState(localStorage.getItem("targetDate") || new Date().toISOString().split("T")[0]);
  const [biorhythmData, setBiorhythmData] = useState(null);

  useEffect(() => {
    if (birthDate) {
      setBiorhythmData(calculateBiorhythm(birthDate, targetDate));
    }
  }, [birthDate, targetDate]);

  const handleCalculate = () => {
    if (!birthDate) return;
    setBiorhythmData(calculateBiorhythm(birthDate, targetDate));
    
    // ✅ 입력한 값 LocalStorage에 저장
    localStorage.setItem("birthDate", birthDate);
    localStorage.setItem("targetDate", targetDate);
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
                },
                {
                  label: "💖 감정 리듬",
                  data: biorhythmData.emotional,
                  borderColor: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.2)",
                  fill: false,
                },
                {
                  label: "🧠 지적 리듬",
                  data: biorhythmData.intellectual,
                  borderColor: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.2)",
                  fill: false,
                },
              ],
            }}
            options={{
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