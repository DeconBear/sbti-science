// ============================================================
// SBTI 科研版 — 计分引擎
// ============================================================

const Engine = (() => {
  /**
   * 根据所有答案计算各人格类型得分
   * @param {Object} answers - { questionId: 'A'|'B'|'C' }
   * @returns {Object} - { personalityId: totalScore }
   */
  function calculateScores(answers) {
    const scores = {};
    PERSONALITIES.forEach(p => { scores[p.id] = 0; });

    for (const [qId, choice] of Object.entries(answers)) {
      const question = QUESTIONS.find(q => q.id === parseInt(qId));
      if (!question || !question.options[choice]) continue;

      const optionScores = question.options[choice].scores;
      for (const [pid, weight] of Object.entries(optionScores)) {
        scores[pid] = (scores[pid] || 0) + weight;
      }
    }
    return scores;
  }

  /**
   * 确定最终人格类型
   * @param {Object} scores - 得分对象
   * @returns {Object} 完整的人格类型信息
   */
  function determineResult(scores) {
    const maxScore = Math.max(...Object.values(scores));
    const topIds = Object.entries(scores)
      .filter(([, v]) => v === maxScore)
      .map(([k]) => k);

    // 平局时随机选
    const winnerId = topIds[Math.floor(Math.random() * topIds.length)];
    return PERSONALITIES.find(p => p.id === winnerId);
  }

  /**
   * 获取得分排名前 N 的人格（用于展示候选）
   */
  function getTopN(scores, n = 3) {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([id, score]) => ({
        personality: PERSONALITIES.find(p => p.id === id),
        score
      }));
  }

  /**
   * 获取答题进度信息
   */
  function getProgress(answers) {
    const answered = Object.keys(answers).length;
    const total = QUESTIONS.length;
    return { answered, total, percent: Math.round((answered / total) * 100) };
  }

  /**
   * 检查是否所有题目都已作答
   */
  function isComplete(answers) {
    return Object.keys(answers).length === QUESTIONS.length;
  }

  return { calculateScores, determineResult, getTopN, getProgress, isComplete };
})();
