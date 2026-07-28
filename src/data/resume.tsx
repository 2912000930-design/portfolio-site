import { Icons } from "@/components/icons";
import {
  HomeIcon,
  NotebookIcon,
  Table,
  BrainCircuit,
  Sigma,
  Database,
  BarChart3,
  FileSpreadsheet,
  Bot,
  GitBranch,
  Languages,
  Sparkles,
} from "lucide-react";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";

// 时间轴项目条目里的外链类型（保持 links: [] 在 as const 下不被窄化成 never[]）
type HackathonLink = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

export const DATA = {
  name: "许广桓 Daniel",
  initials: "XG",
  url: "https://portfolio-site-seven-mocha.vercel.app",
  location: "中国 · 珠海 / 香港",
  locationLink: "https://www.google.com/maps/place/Hong+Kong",
  description:
    "数据科学与 AI 算法方向实习生 · 计算机科学与技术本科 · 专注数据分析、量化研究与大模型应用落地。",
  summary:
    "北师香港浸会大学计算机科学与技术专业本科（2026 届），即将入读香港科技大学信息与网络安全管理硕士。求职方向为数据分析 / 数据开发 / AI 算法实习生。\n\n[本科期间系统学习算法、数据结构与机器学习](/#education)，并在证券、食品、文化科技三段实习中分别承担金融工程建模、业务数据分析与设备运营工作；课外围绕大模型微调、RAG 检索增强、教育数据分析与博弈机制设计完成多个独立项目，均可在本站 [AI 作品集](/#projects) 中直接体验。雅思 7.5，熟悉 ChatGPT / DeepSeek / Codex 等 AI 工具在生产与研究流程中的落地。",
  avatarUrl: "/me.png",
  skills: [
    { name: "Python", icon: Python },
    { name: "NumPy / Pandas", icon: Table },
    { name: "TensorFlow / PyTorch", icon: BrainCircuit },
    { name: "R", icon: Sigma },
    { name: "SQL / MySQL", icon: Database },
    { name: "MATLAB", icon: BarChart3 },
    { name: "SPSS", icon: FileSpreadsheet },
    { name: "Prompt / LLM", icon: Bot },
    { name: "Git", icon: GitBranch },
    { name: "React / Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "雅思 7.5 / 英语", icon: Languages },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "首页" },
    { href: "/blog", icon: NotebookIcon, label: "博客" },
  ],
  contact: {
    email: "s230026182@mail.uic.edu.cn",
    tel: "+86 15901899818",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/2912000930-design",
        icon: Icons.github,
        navbar: true,
      },
      // 未提供 LinkedIn / X / Youtube，仅保留 GitHub 避免展示失效链接
      email: {
        name: "发送邮件",
        url: "mailto:s230026182@mail.uic.edu.cn",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "白象食品集团",
      href: "https://www.baixiangfood.com",
      badges: [],
      location: "上海",
      title: "数据分析实习生",
      logoUrl: "/logos/baixiang.svg",
      start: "2026.01",
      end: "2026.03",
      description:
        "负责销售与渠道数据的采集、清洗与可视化看板搭建，使用 Python（pandas / matplotlib）与 SQL 完成日常经营分析与品类销量同比环比监测，输出周报与月度复盘，支持渠道经理调整铺货策略。",
    },
    {
      company: "上海国盛证券",
      href: "https://www.shgszc.com",
      badges: [],
      location: "上海",
      title: "金融工程实习生",
      logoUrl: "/logos/guosheng.svg",
      start: "2025.07",
      end: "2025.09",
      description:
        "参与量化因子库构建与回测流程，使用 Python 与 MATLAB 实现多因子选股模型、风险敞口分解与组合权重优化；整理研报数据并协助撰写行业景气度分析，产出内部周报与因子有效性报告。",
    },
    {
      company: "上海九菁文化科技有限公司",
      href: "https://www.jiujing.com",
      badges: [],
      location: "上海",
      title: "设备运营实习生",
      logoUrl: "/logos/jiujing.svg",
      start: "2024.07",
      end: "2024.08",
      description:
        "负责线下智能终端设备的部署、巡检与异常处理，协助梳理设备运行数据并建立故障排查 SOP；通过远程监控与现场支持将单点平均故障恢复时间缩短约 30%，积累了一线硬件运营与数据驱动优化的实战经验。",
    },
  ],
  education: [
    {
      school: "香港科技大学",
      href: "https://www.ust.hk",
      degree: "信息与网络安全管理 硕士",
      logoUrl: "/logos/hkust.svg",
      start: "2026.09",
      end: "2027.06",
    },
    {
      school: "北师香港浸会大学",
      href: "https://www.uic.edu.cn",
      degree: "计算机科学与技术 本科",
      logoUrl: "/logos/uic.svg",
      start: "2022.09",
      end: "2026.06",
    },
  ],
  projects: [
    {
      title: "个人 AI 面试助手",
      href: "/demos/interview-assistant",
      dates: "AI Portfolio Demo",
      active: true,
      description:
        "面试官可以直接询问候选人的项目经历、岗位匹配度、优势短板和可负责的 AI 产品模块，快速完成第一轮了解。",
      technologies: [
        "Next.js",
        "Typescript",
        "RAG",
        "Prompt Design",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Live Demo",
          href: "/demos/interview-assistant",
          icon: <Sparkles className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "企业知识库 RAG Demo",
      href: "/demos/knowledge-base",
      dates: "AI Portfolio Demo",
      active: true,
      description:
        "基于企业 FAQ、产品手册和客服政策回答问题，输出带来源引用的答案，并在高风险问题上提示人工确认。",
      technologies: [
        "Next.js",
        "Typescript",
        "RAG",
        "Retrieval",
        "Citations",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Live Demo",
          href: "/demos/knowledge-base",
          icon: <Sparkles className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "简历筛选 / 招聘助手",
      href: "/demos/recruiting-assistant",
      dates: "AI Portfolio Demo",
      active: true,
      description:
        "输入 JD 和候选人简历后，辅助 HR 生成匹配度、强匹配点、风险点和建议面试问题，不做自动录用或淘汰。",
      technologies: [
        "Next.js",
        "Typescript",
        "Structured Output",
        "Scoring Rubric",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Live Demo",
          href: "/demos/recruiting-assistant",
          icon: <Sparkles className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  // 复用 HackathonsSection 的时间轴样式，作为“项目经历”展示
  hackathons: [
    {
      title: "医疗问答大模型 · Qwen3-4B LoRA 微调",
      dates: "2025 · 个人项目",
      location: "大模型应用 / NLP",
      description:
        "基于 Qwen3-4B 基座模型，使用医疗问答数据集进行 LoRA 参数高效微调，构建可回答常见医学问题的中文医疗问答模型。完成数据清洗、指令格式对齐、训练超参调优与效果评估，输出可部署的 LoRA 权重与推理脚本。",
      image: "/logos/medical-llm.svg",
      links: [] as HackathonLink[],
    },
    {
      title: "E-DBA 教育数据平台",
      dates: "2024 · 个人项目",
      location: "数据分析 / Web 平台",
      description:
        "面向高校教学场景的端到端教育数据分析平台：采集学生成绩、行为与课程数据，构建数据仓库与可视化看板，支持学习预警、学生画像与课程对比分析。后端 Python + SQL，前端 React 可视化，覆盖从原始数据到教学决策的完整链路。",
      image: "/logos/edba.svg",
      links: [] as HackathonLink[],
    },
    {
      title: "RSA-4096 加解密系统",
      dates: "2024 · 课程 / 个人项目",
      location: "信息安全 / 密码学",
      description:
        "完整实现 RSA-4096 密钥生成、大数模幂运算、PKCS#1 v1.5 填充与签名验证流程，对比不同实现（素数检测、蒙哥马利约减、中国剩余定理加速）的性能差异，并通过自测用例验证加解密正确性与防篡改能力。",
      image: "/logos/rsa.svg",
      links: [] as HackathonLink[],
    },
    {
      title: "美赛 MCM · 网球 Momentum 建模",
      dates: "2025 · 美国大学生数学建模竞赛",
      location: "数学建模 / 时序分析",
      description:
        "针对网球比赛中的 momentum（势头）问题建立时序模型，量化选手在连续得分阶段的动量波动，使用 Python（NumPy / pandas / matplotlib）进行数据拟合与可视化，输出完整的 MCM 论文与可复现实验脚本。",
      image: "/logos/mcm.svg",
      links: [] as HackathonLink[],
    },
    {
      title: "房屋选址机制设计",
      dates: "2024 · 课程项目",
      location: "博弈论 / 机制设计",
      description:
        "基于机制设计与博弈论，构建一组激励相容的房屋选址规则，在信息不对称下最大化整体社会福利并抑制策略性行为；使用 Python 进行多智能体仿真，对比不同分配规则在效率、公平与策略稳定性上的表现。",
      image: "/logos/mechanism.svg",
      links: [] as HackathonLink[],
    },
  ],
} as const;
