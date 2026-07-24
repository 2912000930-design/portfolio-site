export type DemoId =
  | "interview-assistant"
  | "knowledge-base"
  | "recruiting-assistant";

export type DemoSample = {
  label: string;
  primary: string;
  secondary?: string;
};

export type DemoConfig = {
  id: DemoId;
  title: string;
  eyebrow: string;
  description: string;
  problem: string;
  targetUser: string;
  value: string;
  primaryLabel: string;
  primaryPlaceholder: string;
  secondaryLabel?: string;
  secondaryPlaceholder?: string;
  defaultPrimary: string;
  defaultSecondary?: string;
  samples: DemoSample[];
  techNotes: string[];
};

export type DemoResult = {
  score?: string;
  summary: string;
  sections: {
    title: string;
    items: string[];
  }[];
  sources: string[];
  caution?: string;
};

const sampleJd = `岗位：AI 产品经理
职责：负责企业知识库、智能客服和招聘辅助工具的需求分析、原型设计、Prompt 策略、效果评估和跨团队落地。
要求：理解 RAG、Agent、结构化输出、AI 评估指标，能把业务流程拆成可上线的产品模块。`;

const sampleResume = `候选人：AI 产品 / AI 应用方向
经历：设计过个人 AI 面试助手、企业知识库 RAG Demo、招聘筛选助手，关注真实业务场景、可解释输出和人工确认边界。
能力：需求拆解、用户流程、Prompt Engineering、RAG 产品设计、结构化分析、前端 Demo 表达。`;

export const DEMOS: Record<DemoId, DemoConfig> = {
  "interview-assistant": {
    id: "interview-assistant",
    title: "个人 AI 面试助手",
    eyebrow: "Candidate copilot",
    description:
      "让面试官用提问的方式快速了解候选人的项目经历、AI 产品能力和岗位匹配度。",
    problem:
      "面试官通常只有几十秒扫简历，很难快速抓住候选人的真实能力证据。",
    targetUser: "面试官、HR、招聘负责人",
    value:
      "把简历和项目经历转成可追问的问答入口，降低信息查找成本，也让候选人的优势更容易被验证。",
    primaryLabel: "面试官想问的问题",
    primaryPlaceholder: "例如：你最适合什么岗位？哪个项目最能证明你的 AI 能力？",
    defaultPrimary: "你最适合什么岗位？请结合项目证据回答。",
    samples: [
      {
        label: "岗位匹配",
        primary: "你最适合什么岗位？请结合项目证据回答。",
      },
      {
        label: "项目证据",
        primary: "哪个项目最能证明你的 AI 产品能力？",
      },
      {
        label: "入职贡献",
        primary: "如果入职，你能负责哪些 AI 产品模块？",
      },
    ],
    techNotes: ["RAG-ready profile context", "Prompt routing", "Evidence-first answer"],
  },
  "knowledge-base": {
    id: "knowledge-base",
    title: "企业知识库 RAG Demo",
    eyebrow: "Knowledge assistant",
    description:
      "基于企业 FAQ、客服政策和产品手册回答问题，并展示引用来源和人工确认边界。",
    problem:
      "企业资料分散在 FAQ、制度和产品文档里，客服和业务同学查找慢，回答也容易不一致。",
    targetUser: "客服主管、一线客服、新员工、业务支持团队",
    value:
      "把常见问题转成可追溯答案，减少重复查询，并在退换货等敏感场景提示人工确认。",
    primaryLabel: "用户或客服的问题",
    primaryPlaceholder: "例如：已拆封产品还能退吗？会员优惠券可以叠加吗？",
    defaultPrimary: "已拆封产品还能退吗？客服应该怎么回复？",
    samples: [
      {
        label: "退换货",
        primary: "已拆封产品还能退吗？客服应该怎么回复？",
      },
      {
        label: "会员权益",
        primary: "会员优惠券可以和活动价叠加使用吗？",
      },
      {
        label: "配送售后",
        primary: "用户说包裹超时未送达，客服应该先确认什么？",
      },
    ],
    techNotes: ["Retrieval augmented generation", "Source citation", "Escalation guardrail"],
  },
  "recruiting-assistant": {
    id: "recruiting-assistant",
    title: "简历筛选 / 招聘助手",
    eyebrow: "Recruiting assistant",
    description:
      "输入 JD 和候选人简历，辅助生成匹配度、强匹配点、风险点和建议面试问题。",
    problem:
      "HR 和招聘经理初筛简历耗时，且容易只看关键词，忽略项目证据、风险点和追问方向。",
    targetUser: "HR、招聘经理、业务面试官",
    value:
      "把 JD 和简历转成结构化对比，帮助面试官更快准备面试，但不自动淘汰或录用候选人。",
    primaryLabel: "JD 文本",
    primaryPlaceholder: "粘贴岗位职责、要求和加分项",
    secondaryLabel: "候选人简历文本",
    secondaryPlaceholder: "粘贴候选人的项目经历、技能和背景",
    defaultPrimary: sampleJd,
    defaultSecondary: sampleResume,
    samples: [
      {
        label: "AI 产品岗",
        primary: sampleJd,
        secondary: sampleResume,
      },
      {
        label: "RAG 项目岗",
        primary:
          "岗位：AI 应用产品经理\n职责：设计企业知识库、智能问答、引用溯源和效果评估流程。\n要求：有 RAG、Prompt、用户反馈闭环经验。",
        secondary:
          "候选人：做过企业知识库 RAG Demo，关注引用来源、人工确认、客服回复话术和评估指标。",
      },
      {
        label: "招聘场景岗",
        primary:
          "岗位：招聘产品经理\n职责：优化简历初筛、JD 匹配、面试题生成和候选人体验。\n要求：理解招聘流程、AI 辅助决策边界和公平性风险。",
        secondary:
          "候选人：设计过简历筛选助手，输出匹配点、风险点、追问问题，并强调不做自动淘汰。",
      },
    ],
    techNotes: ["Structured output", "Scoring rubric", "Human-in-the-loop decision"],
  },
};

export function getDemo(id: DemoId) {
  return DEMOS[id];
}

export function generateDemoResult(
  demoId: DemoId,
  primaryInput: string,
  secondaryInput = ""
): DemoResult {
  const primary = primaryInput.toLowerCase();
  const secondary = secondaryInput.toLowerCase();

  if (demoId === "interview-assistant") {
    return generateInterviewResult(primary);
  }

  if (demoId === "knowledge-base") {
    return generateKnowledgeResult(primary);
  }

  return generateRecruitingResult(primary, secondary);
}

function generateInterviewResult(input: string): DemoResult {
  if (input.includes("短板") || input.includes("风险")) {
    return {
      summary:
        "候选人的优势是能把 AI 场景拆成可体验 Demo；风险点是仍需要用真实上线数据继续证明规模化效果。",
      sections: [
        {
          title: "优势",
          items: [
            "能把面试、知识库、招聘这些真实工作流程产品化。",
            "关注引用来源、人工确认和结构化输出，不只停留在聊天框。",
          ],
        },
        {
          title: "建议追问",
          items: [
            "如何评估 RAG 答案质量？",
            "如果 Demo 接入真实业务系统，会先做哪些权限和风控设计？",
          ],
        },
      ],
      sources: ["作品集项目区", "AI Demo 页面说明", "技能标签"],
    };
  }

  return {
    summary:
      "更适合 AI 产品经理、AI 应用产品、AIGC 产品助理或需要把 AI Demo 推到业务场景里的岗位。",
    sections: [
      {
        title: "匹配理由",
        items: [
          "作品集覆盖个人面试、企业知识库、招聘筛选三个真实场景。",
          "每个 Demo 都有明确用户、输入输出、价值和边界，而不是泛聊天机器人。",
          "技术表达覆盖 RAG、Prompt、结构化输出和人工确认流程。",
        ],
      },
      {
        title: "可负责模块",
        items: [
          "AI 产品需求分析和 Demo 原型设计。",
          "知识库问答、招聘辅助、客服辅助等场景的流程设计。",
          "AI 输出质量评估、失败兜底和业务复盘。",
        ],
      },
    ],
    sources: ["个人 AI 面试助手", "企业知识库 RAG Demo", "招聘助手 Demo"],
  };
}

function generateKnowledgeResult(input: string): DemoResult {
  const isRefund = input.includes("退") || input.includes("拆封");
  const isMember = input.includes("会员") || input.includes("优惠");

  if (isMember) {
    return {
      summary:
        "会员优惠券通常不能和已经标记为限时活动价的商品叠加，除非活动页明确写明支持叠加。",
      sections: [
        {
          title: "客服回复建议",
          items: [
            "先确认用户使用的是会员券、满减券还是活动专属券。",
            "如果商品已参加限时活动，默认不可叠加普通会员券。",
            "如活动页写明可叠加，以活动页规则为准。",
          ],
        },
      ],
      sources: ["会员权益 FAQ - 优惠券使用规则", "活动政策 - 价格叠加说明"],
      caution: "涉及价格争议时，建议客服保留活动页截图并升级给人工主管确认。",
    };
  }

  if (isRefund) {
    return {
      summary:
        "已拆封商品是否支持退货取决于品类和二次销售状态。普通商品可先检查完整性，个人护理、食品等品类需要人工确认。",
      sections: [
        {
          title: "处理流程",
          items: [
            "确认商品品类、签收时间和拆封原因。",
            "检查是否影响二次销售，要求用户提供照片。",
            "食品、个人护理、定制商品默认进入人工审核。",
          ],
        },
        {
          title: "可复制话术",
          items: [
            "您好，我们先帮您确认商品品类和拆封状态。请提供订单号和商品照片，我们会根据退换货政策为您判断是否支持退货。",
          ],
        },
      ],
      sources: ["售后政策 - 七天无理由范围", "客服 SOP - 退货审核流程"],
      caution: "退货资格会影响用户权益和企业成本，高风险品类需要人工确认。",
    };
  }

  return {
    summary:
      "客服应先确认订单状态、物流节点和用户诉求，再根据配送政策判断补偿或升级处理。",
    sections: [
      {
        title: "优先确认",
        items: [
          "订单号、承运商、最近一次物流更新时间。",
          "是否超过承诺送达时间。",
          "用户诉求是催派、改地址、退款还是补偿。",
        ],
      },
      {
        title: "下一步",
        items: [
          "未超过承诺时间：同步物流状态并提醒预计送达。",
          "已超过承诺时间：创建异常工单并给出补偿规则。",
        ],
      },
    ],
    sources: ["配送政策 - 时效承诺", "客服 SOP - 物流异常处理"],
  };
}

function generateRecruitingResult(jd: string, resume: string): DemoResult {
  const hasRag = jd.includes("rag") || resume.includes("rag");
  const hasProduct = jd.includes("产品") || resume.includes("产品");
  const score = hasRag && hasProduct ? "82/100" : "74/100";

  return {
    score,
    summary:
      "候选人与 AI 产品 / AI 应用岗位匹配度较高，尤其适合需要快速做 Demo、梳理场景和设计评估闭环的团队。",
    sections: [
      {
        title: "强匹配点",
        items: [
          "有 AI 面试助手、企业知识库 RAG、招聘助手等场景型项目。",
          "能把业务问题拆成用户、输入、输出、边界和评估指标。",
          "关注人机协作，不把 AI 输出直接当作最终决策。",
        ],
      },
      {
        title: "风险点",
        items: [
          "简历中仍需要补充真实用户反馈、上线数据或 A/B 测试结果。",
          "如果岗位要求深度模型训练，需要进一步确认算法和工程深度。",
        ],
      },
      {
        title: "建议面试问题",
        items: [
          "你会如何评估 RAG 答案的准确性和可追溯性？",
          "招聘助手如何避免关键词偏见和过度自动化决策？",
          "如果业务方只想要一个聊天机器人，你会如何重新定义需求？",
        ],
      },
    ],
    sources: ["JD 关键要求", "候选人项目经历", "AI 辅助决策边界"],
    caution: "该结果只用于辅助面试准备，不应用于自动淘汰或录用。",
  };
}
