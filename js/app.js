// ============================================================
// SBTI 科研版 — 应用入口
// ============================================================

const App = (() => {
  function startTest() {
    UI.renderQuestion(0);
  }

  function showResult() {
    const answers = UI.getAnswers();
    if (!Engine.isComplete(answers)) {
      // 找到第一个未作答的题目
      for (let i = 0; i < QUESTIONS.length; i++) {
        if (!answers[QUESTIONS[i].id]) {
          UI.goToQuestion(i);
          return;
        }
      }
      return;
    }

    const scores = Engine.calculateScores(answers);
    const result = Engine.determineResult(scores);
    const top3 = Engine.getTopN(scores, 3);
    UI.renderResult(result, top3);

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restart() {
    // 重置状态：通过重新加载 UI 模块的内部状态
    // 这里简单 reload 页面来重置
    window.location.reload();
  }

  function init() {
    UI.renderHome();
  }

  return { startTest, showResult, restart, init };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
