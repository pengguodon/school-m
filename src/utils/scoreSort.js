function ScoreSort(arr) {
  if (arr.length <= 0) return []

  return arr.map(v => {
    if (v.length === 1) return v
    return v.split("").sort().join("")
  })
}

export default ScoreSort