from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# ✅ 모든 도메인에서 요청 허용
CORS(app, resources={r"/saju": {"origins": "*"}}, supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route("/saju", methods=["GET", "OPTIONS"])
def saju():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight request successful"}), 200

    try:
        sol_year = int(request.args.get("solYear"))
        sol_month = int(request.args.get("solMonth"))
        sol_day = int(request.args.get("solDay"))

        # 사주 데이터 생성 로직 (예제)
        saju_data = {
            "solarDate": f"{sol_year}-{sol_month}-{sol_day}",
            "lunarDate": f"{sol_year}-{sol_month}-{sol_day}",  # 실제 변환 필요
            "saju": {
                "year": {"tiangan": "경", "dizhi": "진"},
                "month": {"tiangan": "정", "dizhi": "해"},
                "day": {"tiangan": "신", "dizhi": "유"},
                "hour": {"tiangan": "-", "dizhi": "-"}  # 실제 로직 추가 필요
            }
        }

        return jsonify(saju_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)