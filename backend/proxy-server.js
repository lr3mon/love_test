const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors()); // 모든 요청 허용
app.use(express.json());

// ✅ 프록시 서버에서 `data.go.kr` API 요청 처리
app.get("/api/saju", async (req, res) => {
    const { solYear, solMonth, solDay } = req.query;
    const API_KEY = process.env.DATA_GO_API_KEY; // 환경 변수에서 API 키 가져오기

    const apiUrl = `https://apis.data.go.kr/B090041/openapi/service/LunCalService/getLunCal?solYear=${solYear}&solMonth=${solMonth}&solDay=${solDay}&ServiceKey=${API_KEY}&_type=json`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data); // ✅ React에 응답 전달
    } catch (error) {
        console.error("사주 API 요청 실패:", error);
        res.status(500).json({ error: "사주 API 요청 실패" });
    }
});

app.get("/", (req, res) => {
    res.send("Proxy server is running.");
});

app.listen(PORT, () => {
    console.log(`🚀 프록시 서버 실행 중: http://localhost:${PORT}`);
});