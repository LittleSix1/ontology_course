# Ontology Course & Notebooks

本项目包含了关于本体（Ontology）理论与实践的课程资料和相关Jupyter笔记本，适合初学者和进阶者系统学习本体建模、OPERA框架、代码实战及与大模型（LLM）的融合应用。

## 目录结构

- `ontology-course/` 课程HTML页面与静态资源
  - `course1-basics.html` 本体基础
  - `course2-framework.html` OPERA建模框架
  - `course3-cases.html` 多领域案例
  - `course4-llm.html` 本体与大模型融合
  - `index.html` 课程主页
  - `css/` 样式文件
  - `js/` 脚本文件
- `ontology-notebooks/` 相关Jupyter笔记本与示例
  - `01_认识Ontology_从混乱到秩序.ipynb` 本体基础认知
  - `02_OPERA万能建模框架.ipynb` OPERA框架详解
  - `03_代码建模实战.ipynb` 代码建模实操
  - `04_多领域实战案例.ipynb` 多领域案例
  - `05_Ontology与LLM融合.ipynb` 本体与大模型融合
  - `pet_hospital.owl` 示例本体文件

## 使用说明

1. 打开 `ontology-course/index.html` 浏览课程内容。
2. 使用 Jupyter Notebook 打开 `ontology-notebooks/` 下的 `.ipynb` 文件，跟随课程进行实操。
3. `pet_hospital.owl` 为宠物医院领域的本体示例，可用于Protege等本体编辑工具。

## 环境依赖与安装

1. 克隆本项目：
  ```bash
  git clone <your-repo-url>
  cd ontology
  ```
2. 创建并激活虚拟环境（任选其一）：
  - 使用 venv：
    ```bash
    python -m venv .venv
    # Windows
    .venv\Scripts\activate
    # macOS/Linux
    source .venv/bin/activate
    ```
3. 安装依赖：
  ```bash
  pip install -r requirements.txt
  ```

## 依赖列表

主要依赖包如下，详见 `requirements.txt`：

- jupyter
- owlready2
- rdflib

## 使用方法

1. 启动 Jupyter Notebook：
  ```bash
  jupyter notebook
  ```
2. 打开 `ontology-notebooks/` 目录下的 `.ipynb` 文件，跟随课程内容学习与实操。
3. 课程网页可直接用浏览器打开 `ontology-course/index.html`。
4. `pet_hospital.owl` 可用 Protege 等本体编辑工具打开。

