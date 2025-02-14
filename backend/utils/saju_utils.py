TIANGAN = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]
DIZHI = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"]

def get_year_pillar(year):
    return TIANGAN[(year - 4) % 10] + DIZHI[(year - 4) % 12]

def get_month_pillar(year_tiangan, month):
    month_table = ["인", "묘", "진", "사", "오", "미", "신", "유", "술", "해", "자", "축"]
    dizhi = month_table[month - 1]
    tiangan_index = (TIANGAN.index(year_tiangan) * 2 + [2, 4, 6, 8, 0, 2, 4, 6, 8, 0][month - 1]) % 10
    return TIANGAN[tiangan_index] + dizhi

def get_saju_pillars(year, month, day):
    year_pillar = get_year_pillar(year)
    month_pillar = get_month_pillar(year_pillar[0], month)

    return {
        "year": year_pillar,
        "month": month_pillar
    }