// ============================================================
// SBTI — UI 渲染模块
// ============================================================

const UI = (() => {
  const app = document.getElementById('app');
  let currentQuestion = 0;
  let answers = {};
  let isTransitioning = false;
  let autoAdvanceTimer = null;

  // 所有可用版本（入口页展示用）
  const VERSIONS = [
    {
      id: 'research', name: '科研学术版', icon: '🔬',
      desc: '测出你的真实科研人格——是文献综述机器、DDL战士还是实验室卷王？',
      accent: '#1e3a4c'
    },
    {
      id: 'work', name: '职场牛马版', icon: '💼',
      desc: '你是被OKR支配的PPT纺织工，还是带薪摸鱼的时间管理大师？',
      accent: '#2d5f6e'
    },
    {
      id: 'parent', name: '年轻家长版', icon: '👶',
      desc: '鸡娃还是躺平？早教班排队还是散养自由？测测你的育儿人格。',
      accent: '#7b4b8a'
    },
    {
      id: 'liberalarts', name: '当代文科生版', icon: '📖',
      desc: '在AI写作时代，文科生的出路在哪里？批判理论还是 prompt engineering？',
      accent: '#8b5e3c'
    },
    {
      id: 'art', name: '当代艺术生版', icon: '🎨',
      desc: '当 Stable Diffusion 比你画得快——艺术生的创作焦虑与灵魂坚守。',
      accent: '#c0573a'
    }
  ];

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
      <div class="page entry-page fade-in">
        <div class="entry-content">
          <div class="entry-header">
            <h1 class="entry-title">
              <span class="title-sbti">SBTI</span>
            </h1>
            <p class="entry-subtitle">Science & Bullshit Type Indicator</p>
            <p class="entry-desc">选一个版本，用 <strong>31 道题</strong>测出你的隐藏人格</p>
          </div>

          <div class="version-list">
            ${VERSIONS.map((v, i) => `
              <button class="version-card" style="--accent: ${v.accent}; animation: fadeUp 0.5s var(--ease) both; animation-delay: ${i * 0.08}s"
                      onclick="App.selectVersion('${v.id}')">
                <span class="version-icon">${v.icon}</span>
                <div class="version-info">
                  <span class="version-name">${v.name}</span>
                  <span class="version-desc">${v.desc}</span>
                </div>
                <span class="version-arrow">→</span>
              </button>
            `).join('')}
          </div>

          <div class="entry-notice">
            <p class="notice-title">⚠️ 郑重声明</p>
            <p>本测试<strong>纯属娱乐，无任何科学依据</strong>，不具有任何真实的指导意义。<br>同一个人两次测试可能有不同结果。仅供消遣，请勿当真。</p>
          </div>

          <p class="entry-footer">
            本项目为测试 <strong>DeepSeek V4</strong> 模型编程能力而构建<br>
            AI 辅助生成 · 内容仅供参考
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
                  <span class="dual-label">${VERSION.strengthLabel}</span>
                  <p>${p.strength}</p>
                </div>
              </div>
              <div class="result-weakness">
                <span class="dual-icon">🎭</span>
                <div class="dual-content">
                  <span class="dual-label">${VERSION.weaknessLabel}</span>
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
            <h3>${VERSION.resultHeading}</h3>
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
            <span class="result-watermark">${VERSION.watermark}</span>
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
          ${VERSION.resultDisclaimer}
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
              title: VERSION.shareTitle,
              text: VERSION.shareText.replace('{name}', result.name),
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
