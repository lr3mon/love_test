from korean_lunar_calendar import KoreanLunarCalendar

def convert_solar_to_lunar(year, month, day):
    calendar = KoreanLunarCalendar()
    calendar.setSolar(year, month, day)
    return calendar.LunarIsoFormat()