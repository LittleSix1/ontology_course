# Ontology Course & Notebooks

> 系统学习本体（Ontology）理论与实践的开源课程——涵盖本体基础、OPERA 建模框架、代码实战，以及与大模型（LLM）的融合应用，适合初学者到进阶者。

## 📚 课程学习路径

按照以下顺序学习效果最佳：

| 序号 | 笔记本 | 对应网页课程 | 内容简介 |
|------|--------|-------------|----------|
| 01 | `01_认识Ontology_从混乱到秩序.ipynb` | `course1-basics.html` | 本体基础认知 |
| 02 | `02_OPERA万能建模框架.ipynb` | `course2-framework.html` | OPERA 框架详解 |
| 03 | `03_代码建模实战.ipynb` | — | 代码建模实操 |
| 04 | `04_多领域实战案例.ipynb` | `course3-cases.html` | 多领域案例 |
| 05 | `05_Ontology与LLM融合.ipynb` | `course4-llm.html` | 本体与大模型融合 |

## 📁 目录结构

```
ontology_course/
├── ontology-course/          # 课程网页（可直接用浏览器打开）
│   ├── index.html            # 课程主页
│   ├── course1-basics.html   # 本体基础
│   ├── course2-framework.html# OPERA 建模框架
│   ├── course3-cases.html    # 多领域案例
│   ├── course4-llm.html      # 本体与大模型融合
│   ├── css/                  # 样式文件
│   └── js/                   # 脚本文件
├── ontology-notebooks/       # Jupyter 笔记本与示例
│   ├── 01_认识Ontology_从混乱到秩序.ipynb
│   ├── 02_OPERA万能建模框架.ipynb
│   ├── 03_代码建模实战.ipynb
│   ├── 04_多领域实战案例.ipynb
│   ├── 05_Ontology与LLM融合.ipynb
│   └── pet_hospital.owl      # 宠物医院领域示例本体
└── requirements.txt
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/LittleSix1/ontology_course.git
cd ontology_course
```

### 2. 创建并激活虚拟环境

```bash
python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

### 3. 安装依赖

```bash
pip install -r requirements.txt
```

主要依赖：`jupyter` · `owlready2` · `rdflib`

### 4. 启动 Jupyter Notebook

```bash
jupyter notebook
```

浏览器打开后，进入 `ontology-notebooks/` 目录，按序号顺序打开对应 `.ipynb` 文件即可开始学习。

## 🌐 浏览网页课程

无需安装任何依赖，直接用浏览器打开：

```
ontology-course/index.html
```

## 🔬 本体示例文件

`ontology-notebooks/pet_hospital.owl` 是一个宠物医院领域的本体示例，可使用 [Protégé](https://protege.stanford.edu/) 等本体编辑工具打开和探索。

