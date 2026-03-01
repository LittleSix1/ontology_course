/**
 * Ontology 本体论交互式课程 — 通用脚本
 * 包含：测验、标签页、折叠面板、拖拽练习、导航交互等
 */

/* ==============================
   1. 测验系统 (Quiz)
   ============================== */

/**
 * 选择一个测验选项
 * 同一题目内只能选中一个，点击切换选中状态
 */
function selectOption(el) {
  // 找到所属的 quiz 容器
  var container = el.closest('.quiz-container');
  if (!container) return;
  // 如果题目已经提交过，不再允许切换
  if (container.classList.contains('answered')) return;
  // 取消同一题目的其他选中
  container.querySelectorAll('.quiz-option').forEach(function (opt) {
    opt.classList.remove('selected');
  });
  el.classList.add('selected');
}

/**
 * 检查测验答案
 * @param {HTMLElement} btn - 提交按钮
 * @param {string} correctAnswer - 正确答案 value
 */
function checkAnswer(btn, correctAnswer) {
  var container = btn.closest('.quiz-container');
  if (!container) return;
  // 防止重复提交
  if (container.classList.contains('answered')) return;

  var selected = container.querySelector('.quiz-option.selected');
  if (!selected) {
    alert('请先选择一个选项');
    return;
  }

  var value = selected.getAttribute('data-value');
  var isCorrect = value === correctAnswer;

  // 标记已作答
  container.classList.add('answered');

  // 高亮正确/错误
  if (isCorrect) {
    selected.classList.add('correct');
    container.classList.add('result-correct');
  } else {
    selected.classList.add('incorrect');
    container.classList.add('result-incorrect');
    // 高亮正确答案
    container.querySelectorAll('.quiz-option').forEach(function (opt) {
      if (opt.getAttribute('data-value') === correctAnswer) {
        opt.classList.add('correct');
      }
    });
  }

  // 显示反馈
  var feedbackCorrect = container.querySelector('.quiz-feedback.correct');
  var feedbackIncorrect = container.querySelector('.quiz-feedback.incorrect');
  if (isCorrect && feedbackCorrect) {
    feedbackCorrect.style.display = 'block';
  } else if (!isCorrect && feedbackIncorrect) {
    feedbackIncorrect.style.display = 'block';
  }

  // 禁用按钮
  btn.disabled = true;
  btn.textContent = isCorrect ? '✅ 回答正确' : '❌ 回答错误';

  // 更新进度
  updateProgress();
}

/* ==============================
   2. 标签页 (Tabs)
   ============================== */

/**
 * 切换标签页
 * @param {HTMLElement} btn - 被点击的 tab 按钮
 * @param {string} tabId - 目标面板的 id
 */
function switchTab(btn, tabId) {
  // 找到所属的 tabs 容器
  var tabsContainer = btn.closest('.tabs');
  if (!tabsContainer) return;

  // 切换按钮状态
  tabsContainer.querySelectorAll('.tab-btn').forEach(function (b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // 切换面板
  tabsContainer.querySelectorAll('.tab-panel').forEach(function (panel) {
    panel.classList.remove('active');
  });
  var target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}

/* ==============================
   3. 折叠面板 (Accordion)
   ============================== */

/**
 * 切换折叠面板展开/关闭
 * @param {HTMLElement} header - 被点击的 header
 */
function toggleAccordion(header) {
  var item = header.closest('.accordion-item');
  if (!item) return;
  var isOpen = item.classList.contains('active');

  // 如果在同一个 accordion 容器中，根据需要可以关闭其他项
  // 这里采用"可以同时展开多个"的模式
  if (isOpen) {
    item.classList.remove('active');
  } else {
    item.classList.add('active');
  }
}

/* ==============================
   4. 拖拽分类练习 (Drag & Drop)
   ============================== */

var draggedItem = null;

// 初始化拖拽事件
function initDragAndDrop() {
  // 拖拽项
  document.querySelectorAll('.drag-item').forEach(function (item) {
    item.addEventListener('dragstart', function (e) {
      draggedItem = this;
      this.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', '');
    });
    item.addEventListener('dragend', function () {
      this.classList.remove('dragging');
      draggedItem = null;
    });
  });

  // 放置区域
  document.querySelectorAll('.drag-area').forEach(function (zone) {
    zone.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      this.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', function () {
      this.classList.remove('drag-over');
    });
    zone.addEventListener('drop', function (e) {
      e.preventDefault();
      this.classList.remove('drag-over');
      if (draggedItem) {
        this.appendChild(draggedItem);
      }
    });
  });
}

/**
 * 检查拖拽练习答案
 * 每个 drag-item 有 data-answer，每个 drag-area 有 data-zone
 */
function checkDragExercise() {
  var zones = document.querySelectorAll('.drag-area');
  var total = 0;
  var correct = 0;

  zones.forEach(function (zone) {
    var zoneName = zone.getAttribute('data-zone');
    var items = zone.querySelectorAll('.drag-item');
    items.forEach(function (item) {
      total++;
      var answer = item.getAttribute('data-answer');
      if (answer === zoneName) {
        item.style.borderColor = '#22c55e';
        item.style.background = '#f0fdf4';
        correct++;
      } else {
        item.style.borderColor = '#ef4444';
        item.style.background = '#fef2f2';
      }
    });
  });

  // 检查是否还有未拖拽的项
  var sourceItems = document.querySelectorAll('.drag-source .drag-item');
  if (sourceItems.length > 0) {
    alert('还有 ' + sourceItems.length + ' 个元素未分类，请将所有元素拖入分类区域！');
    return;
  }

  if (total === 0) {
    alert('请先将元素拖入分类区域！');
    return;
  }

  if (correct === total) {
    alert('🎉 全部正确！你已经掌握了本体的基本概念分类。');
  } else {
    alert('你答对了 ' + correct + '/' + total + ' 个。红色边框的项目分类有误，请检查后重试。');
  }
}

/**
 * 重置拖拽练习
 */
function resetDragExercise() {
  var source = document.querySelector('.drag-source');
  if (!source) return;

  // 将所有 drag-item 移回源区域
  document.querySelectorAll('.drag-area .drag-item').forEach(function (item) {
    item.style.borderColor = '';
    item.style.background = '';
    source.appendChild(item);
  });
}

/* ==============================
   5. 导航栏滚动效果
   ============================== */

function initNavbar() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==============================
   6. 侧边栏活跃状态跟踪
   ============================== */

function initSidebarTracking() {
  var sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  if (sidebarLinks.length === 0) return;

  var chapters = [];
  sidebarLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      var target = document.getElementById(href.slice(1));
      if (target) {
        chapters.push({ el: target, link: link });
      }
    }
  });

  if (chapters.length === 0) return;

  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + 120; // offset for navbar

    var currentChapter = chapters[0];
    for (var i = 0; i < chapters.length; i++) {
      if (chapters[i].el.offsetTop <= scrollPos) {
        currentChapter = chapters[i];
      }
    }

    sidebarLinks.forEach(function (link) {
      link.classList.remove('active');
    });
    if (currentChapter) {
      currentChapter.link.classList.add('active');
    }
  });
}

/* ==============================
   7. 学习进度追踪 (localStorage)
   ============================== */

function updateProgress() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var answered = document.querySelectorAll('.quiz-container.answered').length;
  var total = document.querySelectorAll('.quiz-container').length;

  if (total > 0) {
    try {
      var progress = JSON.parse(localStorage.getItem('onto-progress') || '{}');
      progress[page] = { answered: answered, total: total };
      localStorage.setItem('onto-progress', JSON.stringify(progress));
    } catch (e) {
      // localStorage 不可用时忽略
    }
  }
}

/* ==============================
   8. 平滑滚动
   ============================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.getElementById(targetId.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ==============================
   初始化
   ============================== */

document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initSidebarTracking();
  initDragAndDrop();
  initSmoothScroll();
});
