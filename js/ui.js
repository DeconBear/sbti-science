// ============================================================
// SBTI 科研版 — UI 渲染模块
// ============================================================

const UI = (() => {
  const app = document.getElementById('app');
  let currentQuestion = 0;
  let answers = {};
  let isTransitioning = false;
  let autoAdvanceTimer = null;

  // ---- 工具函数 ----

  // 基于种子的确定性"随机"排列 — 确保同一道题每次渲染选项顺序一致
  function seededShuffle(arr, seed) {
    const a = [...arr];
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 16807 + 0) % 2147483647;
      const j = s % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function cancelAutoAdvance() {
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
  }

  // ---- 页面渲染 ----

  function renderHome() {
    app.innerHTML = `
      <div class="page home-page fade-in">
        <div class="home-content">
          <div class="logo-area">
            <div class="logo-icon">🔬</div>
            <h1 class="home-title">
              <span class="title-sbti">SBTI</span>
              <span class="title-sub">科研学术版</span>
            </h1>
            <p class="home-subtitle">Science & Bullshit Type Indicator</p>
          </div>

          <div class="home-tagline">
            MBTI 已经过时了。<br>
            用 <strong>31 道题</strong>，测出你的<br>
            <span class="highlight">真实科研人格</span>。
          </div>

          <div class="disclaimers">
            <div class="disclaimer-item">⚠️ 纯属娱乐，无任何科学依据</div>
            <div class="disclaimer-item">⏱ 约 5-8 分钟 · 31 道选择题</div>
            <div class="disclaimer-item">🤝 结果可截图分享至社交媒体</div>
          </div>

          <button class="btn-start" onclick="App.startTest()">
            开始测试
            <span class="btn-arrow">→</span>
          </button>

          <p class="home-footer">
            基于 <span class="strike">大规模数据分析</span> 纯粹主观臆断<br>
            本测试仅供娱乐，禁止商业用途
          </p>
        </div>
      </div>
    `;
  }

  function renderQuestion(index, animClass) {
    if (index < 0 || index >= QUESTIONS.length) return;

    currentQuestion = index;
    const q = QUESTIONS[index];
    const progress = Engine.getProgress(answers);
    const selected = answers[q.id] || null;

    const cls = animClass || 'fade-in';
    const labels = ['A', 'B', 'C'];
    const isStatic = cls === 'page-static';

    app.innerHTML = `
      <div class="page question-page ${cls}">
        <div class="question-container">
          <div class="progress-wrap">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${progress.percent}%"></div>
            </div>
            <span class="progress-text">${progress.answered} / ${progress.total}</span>
          </div>

          <div class="question-counter">
            <span class="q-num">Q${q.id}</span>
          </div>

          <div class="question-text">${q.text}</div>

          <div class="options-list">
            ${labels.map((label, idx) => {
              const opt = q.options[label];
              const isSelected = selected === label;
              return `
                <button class="option-btn ${isSelected ? 'selected' : ''}"
                        data-label="${label}"
                        ${isStatic ? '' : `style="animation: slideRight 0.35s var(--ease) both; animation-delay:${idx * 0.08}s"`}
                        onclick="UI.selectOption(${q.id}, '${label}')">
                  <span class="option-label">${label}</span>
                  <span class="option-text">${opt.text}</span>
                  ${isSelected ? '<span class="option-check">✓</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>

          <div class="question-nav">
            ${index > 0
              ? `<button class="nav-btn nav-prev" onclick="UI.goToQuestion(${index - 1})">← 上一题</button>`
              : `<span></span>`
            }
            ${index < QUESTIONS.length - 1
              ? `<button class="nav-btn nav-next" onclick="UI.goToQuestion(${index + 1})" ${!selected ? 'disabled' : ''}>下一题 →</button>`
              : selected
                ? `<button class="nav-btn nav-finish" onclick="App.showResult()">查看结果 →</button>`
                : `<button class="nav-btn nav-next" disabled>请先选择</button>`
            }
          </div>
        </div>
      </div>
    `;
  }

  // 页面过渡：退出动画 → 替换内容 → 入场动画
  function transitionPage(renderFn, direction) {
    const page = app.querySelector('.page');
    if (!page) { renderFn(); return; }

    const exitClass = direction === 'forward' ? 'page-exit-forward' : 'page-exit-back';
    const enterClass = direction === 'forward' ? 'page-enter-forward' : 'page-enter-back';

    page.classList.add(exitClass);

    setTimeout(() => {
      renderFn(enterClass);
    }, 180);
  }

  function selectOption(qId, label) {
    if (isTransitioning) return;

    answers[qId] = label;
    // 同一道题的选中更新：无动画，即时刷新
    renderQuestion(currentQuestion, 'page-static');

    if (currentQuestion < QUESTIONS.length - 1) {
      cancelAutoAdvance();
      const nextIndex = currentQuestion + 1;
      autoAdvanceTimer = setTimeout(() => {
        autoAdvanceTimer = null;
        isTransitioning = true;
        transitionPage(
          (cls) => {
            renderQuestion(nextIndex, cls);
            setTimeout(() => { isTransitioning = false; }, 320);
          },
          'forward'
        );
      }, 360);
    } else {
      // 最后一题选完，刷新按钮
      cancelAutoAdvance();
      autoAdvanceTimer = setTimeout(() => {
        autoAdvanceTimer = null;
        renderQuestion(currentQuestion, 'page-static');
      }, 200);
    }
  }

  function goToQuestion(index) {
    cancelAutoAdvance();
    if (isTransitioning) return;
    isTransitioning = true;

    const direction = index > currentQuestion ? 'forward' : 'back';

    transitionPage(
      (cls) => {
        renderQuestion(index, cls);
        setTimeout(() => { isTransitioning = false; }, 320);
      },
      direction
    );
  }

  function renderResult(personality, top3) {
    const p = personality;
    const traitsHtml = p.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

    app.innerHTML = `
      <div class="page result-page fade-in">
        <div class="result-card" id="result-card">
          <div class="result-header">
            <div class="result-emoji">${p.emoji}</div>
            <h2 class="result-name">${p.name}</h2>
            <p class="result-tagline">${p.tagline}</p>
          </div>

          <div class="result-body">
            <div class="result-traits">
              ${traitsHtml}
            </div>

            <div class="result-description">
              ${p.description}
            </div>

            <div class="result-dual">
              <div class="result-strength">
                <span class="dual-icon">🦸</span>
                <div class="dual-content">
                  <span class="dual-label">学术超能力</span>
                  <p>${p.strength}</p>
                </div>
              </div>
              <div class="result-weakness">
                <span class="dual-icon">🎭</span>
                <div class="dual-content">
                  <span class="dual-label">学术软肋</span>
                  <p>${p.weakness}</p>
                </div>
              </div>
            </div>

            <div class="result-advice">
              <span class="advice-label">💡 来自 SBTI 的建议：</span>
              ${p.advice}
            </div>
          </div>

          <div class="result-top3">
            <h3>你的科研人格成分</h3>
            ${top3.map((t, i) => `
              <div class="top3-item" style="animation-delay:${i * 0.2}s">
                <span class="top3-rank">#${i + 1}</span>
                <span class="top3-emoji">${t.personality.emoji}</span>
                <span class="top3-name">${t.personality.name}</span>
                <span class="top3-bar-wrap">
                  <span class="top3-bar" style="width:${(t.score / top3[0].score) * 100}%"></span>
                </span>
                <span class="top3-score">${Math.round(t.score * 10) / 10}</span>
              </div>
            `).join('')}
          </div>

          <div class="result-footer">
            <span class="result-watermark">SBTI · 科研学术版</span>
            <span class="result-note">仅供娱乐，请勿当真</span>
          </div>
        </div>

        <div class="result-actions">
          <button class="btn-action btn-share" onclick="UI.shareResult()">
            📸 截图分享
          </button>
          <button class="btn-action btn-retry" onclick="App.restart()">
            🔄 重新测试
          </button>
        </div>

        <p class="result-disclaimer">
          SBTI (Silly Big Type Indicator) 科研学术版<br>
          纯属娱乐恶搞，无任何科学依据<br>
          同一个人测两次可能有不同结果<br>
          祝你科研顺利，paper 多多！
        </p>
      </div>
    `;
  }

  function shareResult() {
    const card = document.getElementById('result-card');
    if (!card) return;

    const result = Engine.determineResult(Engine.calculateScores(answers));

    function doScreenshot() {
      // 优先尝试使用已加载的 html2canvas，否则动态加载
      if (typeof html2canvas !== 'undefined') {
        return Promise.resolve(html2canvas);
      }
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => resolve(window.html2canvas);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    doScreenshot()
      .then(html2canvas => {
        return html2canvas(card, {
          backgroundColor: '#faf8f5',
          scale: 2,
          useCORS: true
        });
      })
      .then(canvas => {
        const url = canvas.toDataURL('image/png');
        if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
          canvas.toBlob(blob => {
            const file = new File([blob], 'sbti-result.png', { type: 'image/png' });
            navigator.share({
              title: '我的 SBTI 科研人格',
              text: `我是「${result.name}」！来测测你的科研人格？`,
              files: [file]
            }).catch(() => showShareModal(url));
          });
        } else {
          showShareModal(url);
        }
      })
      .catch(() => showShareFallback());
  }

  function showShareModal(imageUrl) {
    const overlay = document.createElement('div');
    overlay.className = 'share-overlay fade-in';
    overlay.innerHTML = `
      <div class="share-modal">
        <h3>长按保存图片</h3>
        <img src="${imageUrl}" alt="SBTI Result" class="share-image">
        <button class="btn-action" onclick="this.closest('.share-overlay').remove()">关闭</button>
      </div>
      <div class="share-backdrop" onclick="this.parentElement.remove()"></div>
    `;
    document.body.appendChild(overlay);
  }

  function showShareFallback() {
    alert('截图分享功能需要加载 html2canvas 库，请检查网络后重试。\n或者直接手机截图分享吧！');
  }

  function getAnswers() { return answers; }

  return {
    renderHome, renderQuestion, selectOption, goToQuestion,
    renderResult, shareResult, getAnswers
  };
})();
