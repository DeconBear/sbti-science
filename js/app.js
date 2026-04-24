// ============================================================
// SBTI — 应用入口
// ============================================================

const App = (() => {
  let currentVersionId = null;

  function selectVersion(versionId) {
    currentVersionId = versionId;

    // 清除上一轮的数据（如果存在）
    if (window.VERSION) delete window.VERSION;
    if (window.PERSONALITIES) delete window.PERSONALITIES;
    if (window.QUESTIONS) delete window.QUESTIONS;

    const script = document.createElement('script');
    script.src = `js/data-${versionId}.js`;
    script.onload = () => {
      startTest();
    };
    script.onerror = () => {
      alert('题库加载失败，请刷新页面后重试。');
    };
    document.head.appendChild(script);
  }

  function startTest() {
    UI.renderQuestion(0);
  }

  function showResult() {
    const answers = UI.getAnswers();
    if (!Engine.isComplete(answers)) {
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

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restart() {
    // 清除数据
    if (window.VERSION) delete window.VERSION;
    if (window.PERSONALITIES) delete window.PERSONALITIES;
    if (window.QUESTIONS) delete window.QUESTIONS;
    // 回到入口页
    UI.renderHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init() {
    UI.renderHome();
  }

  return { selectVersion, startTest, showResult, restart, init };
})();

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
