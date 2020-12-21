const normalize_text = (value: string) => {
  value = value.replace(/\s+/, '') //왼쪽 공백제거
  value = value.replace(/\s+$/g, '') //오른쪽 공백제거
  value = value.replace(/\n/g, '') //행바꿈제거
  value = value.replace(/\r/g, '') //엔터제거

  return value
}

export default normalize_text
